+++
title = "Prometheus Datasource"
description = "Prometheus Datasource API"
keywords = ["Prometheus","Grafana"]
+++

# Prometheus Datasource

Sonix Network provides an open API to access various metrics related to their
Internet Exchange service. This API can be used as a Prometheus datasource for
monitoring and visualizing port statistics, network performance, and other key
metrics in a Prometheus/Grafana setup.

By integrating this datasource, users can gain real-time insights into their
network infrastructure, enabling improved management and troubleshooting.

## Why Use the Sonix Network API?

Sonix Network's open API offers valuable metrics for
Internet Exchange (IX) monitoring, which can be used to:

 * **Monitor Port Utilization**: Track bandwidth usage, link status, and traffic flow across ports in the IX.
 * **Improve Troubleshooting**: Quickly diagnose network issues by accessing detailed port and traffic data.
 * **Visualize Metrics**: Integrate with Grafana to build custom dashboards that visualize traffic patterns, port health, and overall network performance.
 * **Real-Time Monitoring**: Get live updates from the Sonix Network API, providing up-to-date information for proactive network management.

## How to Use the API with Grafana

 * Log into your Grafana instance.
 *  Navigate to Configuration → Data Sources.
 *  Click Add data source and select Prometheus from the list.
 *  In the URL field, enter `https://metric.sonix.network/`.

    Click Save & Test to verify the connection.

### Create Grafana Dashboards

 *  Go to Create → Dashboard.
 *  Add a Panel and select the appropriate metric queries to display data from Sonix Network (e.g., port utilization, traffic flow). We hope to add examples for this later.
 *  Customize the panels with graphs, tables, and other visualizations.

Let us know if this service can be improved or if you end up liking it!

