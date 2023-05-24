+++
title = "FAQ"
description = "Frequently asked questions"
keywords = ["FAQ","How do I","questions","what if"]
+++

#### Do you have any Route Servers?

Not yet, we're rolling out a new RS architecture that requires some more testing before it's ready

#### What best practices do you recommend?

We recommend:

  - Ensure you are compliant with our [rules](/rules/)
  - Setting the BGP timers to 3 second Keepalive and 9 second Hold. This helps in the event of a forwarding failure.

#### What MTU is used?

MTU 9000

#### Do you allow Transit peering over the IX?

As long as it's settlement-free peering. E.g. free IPv6 transit is OK

#### What media do you support?

We are prepared to quickly connect the following medias:

**400G:** QSFP-DD, e.g. 400GBASE-FR4 (at extra cost, **available for closed beta testers only**)
**100G:** 100GBASE-CWDM4, 100GBASE-LR4 (at extra cost)
**50G:** 50GBASE-ER (at extra cost)
**40G:** 40GBASE-LR
**25G:** 25GBASE-LR
**10G:** 10GBASE-LR

Require something else? As long as it is between 10G-400G chances
are that we can find a solution that fits. Contact us!

#### Bring your own transceiver (BYOT) allowed?

Yes! If it's QSFP28 or QSFP+ compatible. For 400G we support QSFP-DD.

#### Got any transceivers I can use?

Yes! We have transceivers at cost price
