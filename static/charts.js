var aliasMap = {
  'kn7-sw1/Ethernet124': 'KN7<->KG',
  'kg-sw1/Ethernet128': 'KG<->KN7',
};

function job(m) {
  return m.labels.job;
}

function interface(m) {
  let re = /ixp-(.*)\.sonix\.network/;
  let sw = (m.labels.instance.match(re)[1]);
  let key = sw + '/' + m.labels.interface;
  let alias = aliasMap[key];
  if (alias == undefined) {
    return key
  }
  return alias
}

function bitsLabelCallback(tooltipItem, data) {
  var label = data.datasets[tooltipItem.datasetIndex].label || '';
  if (label) {
    label += ': ';
  }
  label += formatSI(tooltipItem.yLabel) + 'ib/s';
  return label;
}

new Chart(ctx1, {
  type: 'line',
  plugins: [ChartDatasourcePrometheusPlugin],
  options: {
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: bitsLabelCallback
      }
    },
    animation: {
      duration: 0,
    },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [{
        ticks: {
          callback: function(value, index, values) {
            return formatSI(value) + 'ib/s';
          }
        }
      }],
      xAxes: [{
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm'
          }
        }
      }]
    },
    plugins: {
      'datasource-prometheus': {
        prometheus: {
          endpoint: "https://metric.sonix.network",
          baseURL: "/api/v1",   // default value
        },
        findInLabelMap: interface,
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
