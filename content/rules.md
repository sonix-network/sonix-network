+++
title = "IX Rules"
description = "Member rules for access to the IX"
keywords = ["rules"]
+++

# SONIX Rules

**Version: 1.3**

The following rules are applicable to the following SONIX IXPs:

- **SONIX Stockholm**
- **SONIX Gothenburg**
- **SONIX Malmö**

By connecting to an IXP that is part of SONIX, you acknowledge and agree to the following:

---

## General Requirements

- At least one physical on-net link with SONIX equipment.
- ASN assigned by RIR.
- **Settlement-free peering only:** The exchange of paid services between members that depends on SONIX is not allowed.
- Members are not allowed to use the IX to exchange intra-organization traffic.
- Members are only allowed to exchange traffic targeting the [Default-free zone](https://en.wikipedia.org/wiki/Default-free_zone) (DFZ).
- Members must avoid actions that significantly risk overloading the IX service or other members.
- Members must avoid actions that can cause the misdirection of traffic.
- Traffic may only be forwarded toward a member if permission is explicitly given by the member.

> **Note:** If a member shows a willful disregard for the IX service rules, they will be disconnected from the service.

---

## Technical Requirements

- Only **unicast frames** with defined source MAC addresses are allowed, with the exception of neighbor discovery mechanisms.
- For all traffic, the following rules apply:
  - Frame sizes up to **MTU 9000** are allowed.
  - Only the following Ethernet frame types are allowed:
    - IPv4 (0x0800)
    - IPv6 (0x86dd)
    - ARP (0x0806)
- For **intra-IX[1] traffic**, the following additional rules apply:
  - Traffic destined to the IX subnet must be sourced from the IX subnet.
  - The following ICMP and ICMPv6 packets are forbidden:
    - ICMP Redirect Message (Type 5)
    - ICMPv6 Router Solicitation (Type 133)
    - ICMPv6 Router Advertisement (Type 134)
    - ICMPv6 Redirect (Type 137)
- Members are not allowed to advertise the IX subnet toward other AS networks.
- Only one MAC address is allowed per link, and it is assigned by the member.
- Only one IPv4 address and one IPv6 address are allowed per link, and they are assigned by SONIX.

> [1] **Intra-IX** is defined as traffic sourced from or destined to the IX network subnet.

---

## Data Privacy

- SONIX implements **data inspection[2]** to calculate statistics on how the IX is being used.
  - Non-aggregated data is purged after a maximum of **90 days**.  
    > **Note:** SONIX aims to purge such data within **14 days**.
- SONIX will provide access to data collected from a member port to that member upon request.
- SONIX publishes all time series data collected and computed publicly on [metric.sonix.network](https://metric.sonix.network/):
  - Anyone is free to use the public **Prometheus API** to query these time series and retain them for as long as they want.
  - The member's AS name and number will be exported as part of these metrics.
  - SONIX may retain time series data indefinitely.

> [2] Using technologies such as **sFlow** and selective traffic mirroring.

---