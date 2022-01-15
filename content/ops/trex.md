+++
title = "TRex Packet Generator"
id = "trex"
+++

# TRex

SONIX has a Cisco TRex running in Kista Gate. It can be accessed by SSH at `speedtest.sonix.network`
for SONIX OPS.

## Introduction

TRex can run in a handful of modes, we run it in stateless mode. What this means to us is that
TRex is a fast packet emitter that expects the packets it sends to return to the interface
where it was sent. It does not care about anything related to sessions and not even
neighbor discovery.

The current setup uses a 1x ConnectX-5 100Gbps card (currently connected at 40 Gbps)
attached to a VM using SR-IOV. It is connected straight to the SONIX IX subnet.

Since TRex requires the traffic it sends to be returned to it in order to measure any
packet drops, a common setup is to send traffic consisting of IPv4 or IPv6 packets
with both destination and source set to `${IX_NET}::ff` but setting the MAC address
to one of the routers to be used as a traffic mirror. This causes the traffic to bounce
back when it reaches the router, assuming it accepts such traffic.

## Usage

When logged into the machine you control TRex using the `trex-console` command.
Once executed it will give you access to a prompt where you can change how
TRex should behave.

You will need to set up two major things:

 * Destination MAC address
 * A Stateless (STL) TRex Python script
 
For the destination MAC you can pick one of your routers connected to SONIX,
e.g. MAINFRAME-NET is `76:c0:f8:4b:c8:5d` and you are most welcome to use it
for reasonable testing. You also need to configure static ARP or neighbor
on the remote side, like this:

```
ip -6 neigh add 2a0a:d984::ff lladdr 00:50:56:85:e6:a4 dev Ethernet124
```

The STL script is where you define what kind of traffic to send.
The trex-core repository [has a number of examples](https://github.com/cisco-system-traffic-generator/trex-core/tree/master/scripts/stl)
that you can use.

An example script is presented here for your convenience:

```python3
# Example STL
from trex_stl_lib.api import *

class STLImix(object):
    def __init__ (self):
        # This is the 32 final bits in the IPv6 address (::ff).
        self.ip_range = {'src': {'start': "0.0.0.255", 'end': "0.0.0.255"},
                         'dst': {'start': "0.0.0.255", 'end': "0.0.0.255"}}
        self.imix_table = []
        self.imix_table.append({'size': 1400, 'pps': 4,   'isg':0 })

    def create_stream (self, size, pps, isg, vm ):
        base_pkt  = Ether()
        base_pkt /= IPv6(src="2a0a:d984::", dst="2a0a:d984::")
        base_pkt /= UDP(sport=12345, dport=12345)
        pad = max(0, size - len(base_pkt)) * 'x'

        pkt = STLPktBuilder(pkt = base_pkt/pad,
                            vm = vm)

        return STLStream(isg = isg,
                         packet = pkt,
                         mode = STLTXCont(pps = pps))

    def get_streams (self, direction, tunables, **kwargs):
        if direction == 0:
            src = self.ip_range['src']
            dst = self.ip_range['dst']
        else:
            src = self.ip_range['dst']
            dst = self.ip_range['src']

        vm = STLVM()
        vm.var(name="src",min_value=src['start'],max_value=src['end'],size=4,op="inc")
        vm.var(name="dst",min_value=dst['start'],max_value=dst['end'],size=4,op="inc")
        vm.write(fv_name="src",pkt_offset= "IPv6.src", offset_fixup=12)
        vm.write(fv_name="dst",pkt_offset= "IPv6.dst", offset_fixup=12)
        vm.fix_chksum_hw(l3_offset='IPv6', l4_offset = 'UDP', l4_type=CTRexVmInsFixHwCs.L4_TYPE_UDP)
        return [self.create_stream(x['size'], x['pps'],x['isg'] , vm) for x in self.imix_table]

def register():
    return STLImix()
```

When you have the script you can start it from `trex-console` like this:

```
trex>service
trex(service)>l2 -p 0 --dst 76:c0:f8:4b:c8:5d
trex(service)>service --off
# Start a run with the goal of sending 10 Mbit/s and run for 10 seconds
trex>start -f /home/bluecmd/sonix_ipv6.py -m 10mbps -d 10
```

You can switch to an interactive ncurse-like mode by using the command `tui`. You can
exit back to the normal mode with the command `exit` however to stop the run you
need to use the command `stop`.

![TUI from a speed run](https://user-images.githubusercontent.com/149442/129776669-93a80f7f-732b-4cec-981f-932fdc53aa3a.png)

## Drop rate

The field `drop_rate` in TUI shows the difference on how many packets
are sent vs how many are received back. If the `drop_rate` is
as high as the `total_tx` then it is likely the packets are simply
not reflected back to the TRex machine.

If `drop_rate` is lower than `total_tx` then it is likely it is actual
drops you are seeing.
