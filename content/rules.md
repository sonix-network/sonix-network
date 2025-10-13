+++
title = "Rules"
description = "Member rules for access to the IX"
keywords = ["rules"]
+++

Version: 1.4

This version of the rules are effective from 2025-11-01

The following rules are applicable to the following SONIX IXPs:

 - SONIX Stockholm
 - SONIX Gothenburg
 - SONIX Malmo

By connecting to an IXP part of SONIX you acknowledge the following

# General requirements

 * At least one physical on-net link with SONIX equipment
 * ASN assigned by RIR
 * Settlement‑free peering only; exchanging paid services between members that depends on SONIX is not allowed
 * Members are not allowed to use the IX to exchange intra‑organization traffic
 * Members are only allowed to exchange traffic targeting the [Default-free zone](https://en.wikipedia.org/wiki/Default-free_zone) (DFZ)
 * Members must avoid actions that significantly risk overloading the IX service or other members
 * Members must avoid actions that can cause mis-direction of traffic
 * Traffic may only be forwarded towards a member if permission is given by that member
 * SONIX reserves the right to suspend any member port temporarily from the service as part of its incident response if so deemed necessary by SONIX NOC
 * If a member shows a willful disregard for the IX service rules they will be disconnected from the service, provided that SONIX has informed the member of any alleged violation and a reasonable opportunity (not less than 30 days) to resolve such violation prior to disconnection from the service

# Technical requirements

 * Only unicast frames with defined source MAC‑address are allowed (except neighbour‑discovery mechanisms)
 * Frame sizes up to MTU 9000 allowed
 * Only Ethernet types IPv4 (0x0800), IPv6 (0x86dd) and ARP (0x0806) allowed
 * For intra‑IX[1] traffic, packets destined to the IX subnet must be sourced from the IX subnet
 * The following ICMP/ICMPv6 packets are forbidden:
    * ICMP Redirect (Type 5)
    * ICMPv6 Router Solicitation (Type 133)
    * ICMPv6 Router Advertisement (Type 134)
    * ICMPv6 Redirect (Type 137)
 * Members are not allowed to advertise the IX subnet toward other AS networks
 * Only one MAC‑address per link (assigned by member)
 * Only one IPv4 and one IPv6 address per link (assigned by SONIX)

[1] “Intra‑IX” is traffic sourced from or destined to the IX network subnet.

# Data privacy

 * SONIX implements data inspection[2] to calculate usage statistics
 * Non-aggregated data is purged after maximum 90 days. Note: SONIX **aims** to
     purge such data within 14 days.  
 * SONIX will provide access to all recorded data from a member's port upon request by that member
 * SONIX publishes all time‑series data publicly on [metric.sonix.network](https://metric.sonix.network/); anyone may query and retain it
   * Time-series data includes only anonymized, aggregated metrics and never any contents of the packets themselves nor raw metadata about individual packets
   * The time-series data is commonly used to present port utilization statistics as well as light level for debugging purposes
   * SONIX publishes time-series data to anyone that wishes to consume the data
   * SONIX may retain time‑series data indefinitely
 * The member's [Autonomous System Number](https://en.wikipedia.org/wiki/Autonomous_system_%28Internet%29) (ASN) and associated organization name may be exported as part of these time-series in order to identify which time-series belongs to which member
 * SONIX commits to reasonably protect member traffic privacy and confidentiality to the extent that is compatible with providing the IXP service

[2] e.g. sFlow and selective traffic mirroring
