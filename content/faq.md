+++
title = "FAQ"
description = "Frequently asked questions"
keywords = ["FAQ", "How do I", "questions", "what if"]
+++

# Frequently Asked Questions (FAQ)

We've compiled answers to some of the most common questions about SONIX. If you can't find what you're looking for, please don't hesitate to [contact us](/contact/) or join our [Matrix community](https://matrix.to/#/#sonix:kamel.network).

---

## General Questions

### ➔ What is SONIX?

{{% faq-box %}}
SONIX is a non-profit Internet Exchange Point (IXP) dedicated to providing free and low-cost internet exchange services in Sweden.  
Our mission is to create a faster, more affordable, and sustainable internet connectivity for everyone.
{{% /faq-box %}}

### ➔ What is an Internet Exchange Point (IXP)?

{{% faq-box %}}
An Internet Exchange Point (IXP) is a physical and virtual infrastructure where different networks, such as Internet Service Providers (ISPs), content providers, and businesses, interconnect to exchange internet traffic directly. 

Instead of routing traffic through multiple intermediary networks, an IXP enables direct interconnection, which offers several key benefits:
- **Improved Performance:** By reducing the distance and number of hops traffic must travel, IXPs lower latency and improve data transfer speeds.
- **Cost Efficiency:** Direct peering between networks reduces reliance on expensive transit providers, significantly lowering costs.
- **Enhanced Reliability:** IXPs often provide a more stable connection, minimizing the risk of outages due to intermediate network failures.
- **Scalability:** IXPs support high-volume traffic exchanges, essential for growing businesses and service providers.

SONIX provides these benefits across multiple locations in Sweden, empowering members with efficient, sustainable, and community-driven connectivity.
{{% /faq-box %}}

### ➔ How do I connect to SONIX?

{{% faq-box %}}
To get started, visit our [Join Page](/join/) or reach out via our [Contact Page](/contact/). Our team is here to guide you through the process of connecting your network to SONIX.
{{% /faq-box %}}

### ➔ What does being an "Open IX" mean?

{{% faq-box %}}
At SONIX, being an "Open IX" means:
- **Transparency:** We operate with full transparency, providing open access to our metrics and processes.
- **Community-Driven:** SONIX is supported by a community of peers, sponsors, and volunteers working together to enhance internet connectivity in Sweden.
- **Accessibility:** Our infrastructure is open and inclusive, welcoming networks of all sizes without membership fees or exclusive requirements.
- **Open Source:** We rely on open-source technologies to innovate, collaborate, and contribute back to the global networking community.

We believe in creating a collaborative environment where everyone benefits from a more connected and sustainable internet.
{{% /faq-box %}}

### ➔ How can it be free?

{{% faq-box %}}
SONIX operates as a non-profit organization supported by:
- **Donations:** Contributions from sponsors, partners, and community members help fund infrastructure maintenance and upgrades.
- **Volunteering:** Dedicated volunteers and partners provide expertise, time, and resources to ensure SONIX remains operational.
- **Reused Hardware:** We minimize costs by leveraging refurbished hardware and contributing to a greener internet.

This community-driven approach allows us to offer free ports while maintaining a high-performance and reliable IXP.
{{% /faq-box %}}

### ➔ Who is behind SONIX?

{{% faq-box %}}
SONIX is operated by a Swedish non-profit organization committed to improving internet connectivity. It's a community-driven initiative supported by partners and volunteers.
{{% /faq-box %}}

### ➔ What are SONIX's contributions to the SONiC NOS project?

{{% faq-box %}}
SONIX actively contributes to the open-source SONiC Network Operating System (NOS) project, which powers our infrastructure. SONiC is a robust, modular NOS designed for large-scale networks, and our contributions help:
- Improve SONiC’s compatibility with a broader range of hardware.
- Develop features tailored for IXPs and community-driven networks.
- Strengthen the open-source community by sharing innovations and technical improvements.

You can learn more about SONiC at [sonicfoundation.dev](https://sonicfoundation.dev).
{{% /faq-box %}}

### ➔ What equipment is required to connect to SONIX?

{{% faq-box %}}
Participants need compatible networking equipment capable of handling our supported media and port speeds (10G to 400G). Specific requirements depend on your use case, but our team is happy to assist. Contact us for more details.
{{% /faq-box %}}

### ➔ Are there any guidelines for using SONIX?

{{% faq-box %}}
Yes, all participants must adhere to our [Rules](/rules/). These rules ensure fair and efficient usage of our services while maintaining technical integrity across the network.
{{% /faq-box %}}

---

## Cost & Connectivity

### ➔ How much does a port cost?

{{% faq-box %}}
Nothing! All ports are free, with no setup or monthly fees.
{{% /faq-box %}}

### ➔ Are there any third-party costs?

{{% faq-box %}}
Although SONIX does not charge for ports, connecting to them might involve third-party costs. These include cross-connect fees and data center charges, which vary depending on your location and provider. Known current external costs include:

| **Location**              | **Recurring Fee**   | **Setup Fee** |
|----------------------------|---------------------|---------------|
| [Digital Realty Stockholm](https://peeringdb.com/fac/208) | N/A                 | 5740 SEK (~€500) |
| [Malmö Västergatan 4](https://peeringdb.com/fac/484)       | 50 SEK/month        | 0 SEK            |

Please confirm costs with your data center or provider to ensure accurate budgeting.
{{% /faq-box %}}

---

## Technical Questions

### ➔ Where are your locations?

{{% faq-box %}}
SONIX operates in these locations across Sweden:

| **City**     | **Locations**                                                                                           |
|--------------|---------------------------------------------------------------------------------------------------------|
| **Stockholm** | [Obe Kista Gate](https://peeringdb.com/fac/5544), [Stokab KN7](https://peeringdb.com/fac/1053), [Digital Realty Stockholm](https://peeringdb.com/fac/208), [Equinix SK1](https://peeringdb.com/fac/156), [City Hosting](https://peeringdb.com/fac/14462) |
| **Gothenburg** | [Gothnet DC Marieholm](https://peeringdb.com/fac/434), [Gothnet DC Backa](https://peeringdb.com/fac/9308) |
| **Malmö**      | [Västergatan 4](https://peeringdb.com/fac/484) |
{{% /faq-box %}}

### ➔ Do you have Route Servers?

{{% faq-box %}}
Yes, we encourage all peers to connect:

| **Location**         | **ASN**  | **IPv4**          | **IPv6**                  |
|-----------------------|----------|-------------------|---------------------------|
| SONIX Stockholm #1    | AS61229  | `185.1.215.1`     | `2001:7f8:117::6:1229:1`  |
| SONIX Malmö #1        | AS61229  | `193.201.148.129` | `2001:7f8:117:2:0:6:1229:1` |

We are working on deploying additional route servers and redundancy.
{{% /faq-box %}}

### ➔ What best practices do you recommend?

{{% faq-box %}}
- Follow our [rules](/rules/).
- Configure BGP timers: **3s Keepalive** and **9s Hold**.
{{% /faq-box %}}

### ➔ What MTU is used?

{{% faq-box %}}
We use **MTU 9000**.
{{% /faq-box %}}

### ➔ Do you allow Transit Peering over the IX?

{{% faq-box %}}
Yes, settlement-free peering is allowed, including free IPv6 transit.
{{% /faq-box %}}

### ➔ What media do you support?

{{% faq-box %}}
We support the following transceivers:

| **Speed** | **Transceivers**                       |
|-----------|----------------------------------------|
| 400G      | 400GBASE-LR4, 400GBASE-FR4            |
| 200G      | 200GBASE-LR4, 200GBASE-FR4            |
| 100G      | 100GBASE-CWDM4, 100GBASE-LR4, LR1     |
| 50G       | 50GBASE-LR, 50GBASE-ER                |
| 40G       | 40GBASE-LR4                           |
| 25G       | 25GBASE-LR                            |
| 10G       | 10GBASE-LR                            |

We recommend **100GBASE-CWDM4** (available for free).
{{% /faq-box %}}

### ➔ Is BYOT (Bring Your Own Transceiver) allowed?

{{% faq-box %}}
Yes! We support QSFP28, QSFP+, and QSFP-DD (400G) compatible transceivers.
{{% /faq-box %}}

### ➔ Why are some IXP invite-only?

{{% faq-box %}}
Limited sponsor-provided connectivity at some sites makes selective onboarding necessary. [Learn how to support us.](/contribute/)
{{% /faq-box %}}

### ➔ Can I use your metrics for my monitoring?

{{% faq-box %}}
Yes! Use our [Prometheus-compatible API](https://metric.sonix.network/api/v1/) for integration. Let us know if you find it useful!
{{% /faq-box %}}