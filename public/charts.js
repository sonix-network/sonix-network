var aliasMap = {
  'kn7-sw1/Ethernet124': 'KN7<->KG',
  'kg-sw1/Ethernet128': 'KG<->KN7',
};

function job(m) {
  return m.labels.job;
}

function iface(m) {
  let re = /ixp-(.*)\.sonix\.network/;
  let sw = (m.labels.instance.match(re)[1]);
  let key = sw + '/' + m.labels.interface;
  let alias = aliasMap[key];
  if (alias == undefined) {
    return key
  }
  return alias
}

function site(m) {
  let re = /ixp-(.*)\.sonix\.network/;
  let sw = (m.labels.instance.match(re)[1]);
  return sw
}

function bitsLabelCallback(context) {
  var label = context.dataset.label || '';
  if (label) {
    label += ': ';
  }
  label += formatSI(context.parsed.y) + 'bit/s';
  return label;
}

new Chart(ctx1, {
  type: 'line',
  plugins: [ChartDatasourcePrometheusPlugin],
  options: {
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    scales: {
      y: {
        ticks: {
          callback: function(value, index, values) {
            return formatSI(value) + 'bit/s';
          }
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: bitsLabelCallback
        }
      },
      'datasource-prometheus': {
        prometheus: {
          endpoint: "https://metric.sonix.network",
          baseURL: "/api/v1",   // default value
        },
        findInLabelMap: iface,
        query: `
(
  rate(sai_port_in_packet_size_bytes_sum[10m]) +
  rate(sai_port_out_packet_size_bytes_sum[10m])
) * 8
and
topk(20,
  max_over_time(rate(sai_port_in_packet_size_bytes_sum[1h])[30m:1m]) +
  max_over_time(rate(sai_port_out_packet_size_bytes_sum[1h])[30m:1m])
  > 1*1000*1000
)
`,
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm'
          }
        },
        timeRange: {
          type: 'relative',

          // from 12 hours ago to now
          start: -12 * 60 * 60 * 1000,
          end: 0,
        },
      },
    },
  },
});

new Chart(ctx2, {
  type: 'bar',
  plugins: [ChartDatasourcePrometheusPlugin],
  options: {
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    scales: {
      y: {
        ticks: {
          callback: function(value, index, values) {
            return formatSI(value) + 'bit/s';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: bitsLabelCallback
        }
      },
      'datasource-prometheus': {
        prometheus: {
          endpoint: "https://metric.sonix.network",
          baseURL: "/api/v1",   // default value
        },
        findInLabelMap: site,
        query: `
sum(
  rate(sai_port_in_packet_size_bytes_sum[10m]) +
  rate(sai_port_out_packet_size_bytes_sum[10m])
) by (instance) * 8
`,
        fill: true,
        stacked: true,
        timeRange: {
          type: 'relative',
          start: -1,
          end: 0,
        },
      },
    },
  },
});
