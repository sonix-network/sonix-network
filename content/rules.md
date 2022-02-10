+++
title = "Rules"
description = "Member rules for access to the IX"
keywords = ["rules"]
+++

Version: 1.2

The following rules are applicable to the following SONIX IXPs:

 - SONIX Stockholm
 - SONIX Gothenburg

By connecting to an IXP part of SONIX you acknowledge the following.

# General requirements

 * At least one physical on-net link with SONIX equipment
 * ASN assigned by RIR
 * Settlement-free peering only; to exchange paid services between members that depends on SONIX is not allowed
 * Members are not allowed to use the IX to exchange intra-organization traffic.
 * Members are only allowed to exchange traffic targeting the [Default-free zone](https://en.wikipedia.org/wiki/Default-free_zone) (DFZ)
 * Members must avoid actions that significantly risk overloading the IX service or other members.
 * Members must avoid actions that can cause mis-direction of traffic
 * Traffic may only be forwarded towards a member if permission is given by the member

If a member shows a willful disregard for the IX service rules they will be disconnected from the service.

# Technical requirements

 * Only unicast frames with defined source MAC-address are allowed, with the exception of neighbor discovery mechanisms
 * For all traffic, the following rules apply:
   * Frame sizes upto (MTU) 9000 is allowed
   * Only Ethernet frame types IPv4 (0x0800), IPv6 (0x86dd) and ARP (0x0806) are allowed
 * For intra-IX[1] traffic, the following rules apply in addition to the above:
   * Traffic destined to the IX subnet must be sourced from the IX subnet
   * The following ICMP and ICMPv6 packets are forbidden:
     * ICMP Redirect Message (Type 5)
     * ICMPv6 Router Solicitation (Type 133)
     * ICMPv6 Router Advertisement (Type 134)
     * ICMPv6 Redirect (Type 137)
 * Members are not allowed to advertise the IX subnet towards other AS networks
 * Only one MAC-address is allowed per link and is assigned by member
 * Only one IPv4-address and IPv6-address is allowed per link and is assigned by SONIX

[1] Intra-IX is defined as traffic sourced from or destined to the IX network subnet.

# Data privacy

 * SONIX implements data inspection[2] in order to calculate statistics of how the IX is
   being used.
   * Non-aggregated data is purged after maximum 90 days. Note: SONIX **aims** to
     purge such data within 14 days.
 * SONIX will provide access to data collected from a member port to that member if requested.
 * SONIX publishes all time series data collected and computed publicly on [metric.sonix.network](https://metric.sonix.network/)
   * Anyone is free to use the public Prometheus API to query these time series and
     retain them for as long as they want.
   * The member's AS name and number will be exported as part of these metrics.
   * SONIX may retain time series data indefinitely.
   
[2] Using e.g. sFlow and selective traffic mirroring
