+++
title = "FAQ"
description = "Frequently asked questions"
keywords = ["FAQ","How do I","questions","what if"]
+++

# Frequently Asked Questions

### How much does a port cost?

Nothing! All ports are currently for free. No setup cost, no monthly recurring cost.

{{< notice note >}}
Think of the **port price** as the price to allocate a port in our equipment
to you as a user. Usually this cost is quite high on many Internet Exchanges,
but not on SONIX.
{{< /notice >}}

### Wow, is everything really free?

Compared to a conventional Internet Exchange, then yes.

However, as you may know, extra costs to connect to your port may occur
outside of our control. For example, certain locations requires a one-time fee
to cover our sponsors ODF cost, and as usual you need to check with your
datacenter sales contact what they charge to provide you with the fiber
connection to our port.

Finally, if you require specific optics that we do not have in stock
you need to pay our procurement price. Don't worry, we have plenty of 100G and
10G modules to go around - and even if your specific optic is not in stock,
we have excellent and cost effective suppliers, or you can simply mail
a suitable module to us and we will be happy to use it.

#### What sites require a one-time cross-connect setup fee?

We try hard to find solutions that make everything free, but at some sites we
cannot currently reach all the way. At these sites the sponsor will charge a
per-port fee that we have to pass down to the user.

 - Digital Realty Stockholm - 5740 SEK (~€500)

### Do you have Route Servers?

Yes, we do and encourage all peers to connect.

Our current route servers are:

<div style="margin-left: 10px">

| Location           | ASN     | IPv4              | IPv6                        |
|--------------------|---------|-------------------|-----------------------------|
| SONIX Stockholm #1 | AS61229 | `185.1.215.1`     | `2001:7f8:117::6:1229:1`    |
| SONIX Malmö #1     | AS61229 | `193.201.148.129` | `2001:7f8:117:2:0:6:1229:1` |

</div>

We are currently working on deploying route servers to other sites as well
as adding redundancy in the Stockholm location.

### What best practices do you recommend?

We recommend:

- Ensure you are compliant with our [rules](/rules/).
- Setting the BGP timers to 3 second Keepalive and 9 second Hold. This helps in the event of a forwarding failure.

### What MTU is used?

We use MTU 9000.

### Do you allow Transit peering over the IX?

As long as it's settlement-free peering. E.g. free IPv6 transit is OK.

### Which media do you support?

Media support differs by site. The table below shows our standard supported
options.

<div style="margin-left: 10px">

| Optic            | <abbr title="Obenet Riverlake">RL</abbr> | <abbr title="Obenet Kista Gate">KG</abbr> | <abbr title="Digital Realty STO1">IXN</abbr> | <abbr title="Equinix SK1">SK1</abbr> | <abbr title="Stokab KN7">KN7</abbr> | <abbr title="Equinix SK2">SK2</abbr> | <abbr title="City Hosting">CH</abbr> | <abbr title="Gothenburg: Gothnet DC Marieholm, Gothnet DC Backa">SHG5</abbr> | <abbr title="Malmö Vastergatan 4">VG4</abbr> |
|------------------|----|----|-----|-----|-----|-----|----|------|-----|
| **400GBASE-LR4** | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> |
| **400GBASE-FR4** | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> |
| **200GBASE-LR4** | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> |
| **200GBASE-FR4** | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> |
| **100GBASE-CWDM4** | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> |
| **100GBASE-LR4** | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> |
| **100GBASE-LR1** | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> |
| **50GBASE-LR** | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> |
| **50GBASE-ER** | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> |
| **40GBASE-LR4** | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #dc3545;">&#10007;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> |
| **25GBASE-LR** | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> |
| **10GBASE-LR** | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> | <span style="color: #198754;">&#10003;</span> |

</div>

<div style="margin: 10px 0 0 10px; font-size: 0.95em;">
<strong>Site legend:</strong> RL = Obenet Riverlake, KG = Obenet Kista Gate,
IXN = Digital Realty STO1, SK1 = Equinix SK1, KN7 = Stokab KN7, SK2 = Equinix
SK2, CH = City Hosting, SHG5 = Gothenburg (Gothnet DC Marieholm, Gothnet DC
Backa), VG4 = Malmö Vastergatan 4.
</div>

Having trouble choosing? 100GBASE-CWDM4 is a good choice as 100G equipment is easy
to come by and we have plent of modules in stock. So many modules in fact that
we are offering them free of charge.

Require something else? As long as it is between 10G-400G chances
are that we can find a solution that fits. [Contact us](/contact/)!

### Bring your own transceiver (BYOT) allowed?

Yes! If it's QSFP28 or QSFP+ compatible. For 400G we support QSFP-DD.

### Got any transceivers I can use in my own equipment to connect to SONIX?

Yes! We have 100GBASE-CWDM4 we can give you free of charge, and we are happy to
provide other transceivers at cost price.

### Why do you have sites that are invite only?

It boils down to what connectivity we can manage to secure from our sponsors.
If a site is known to have large networks, we need to be selective on which
networks we on-board.

Want to help? Have a lookt at our [donation](/donate/) page to see what kind
of equipment we need to make the site better.

### Can I use your metrics for my own monitoring?

Absolutely! We expose a Prometheus-compatible API at `https://metric.sonix.network/api/v1/`.

Let us know if you end up using it, we would love to learn if people find it useful.
