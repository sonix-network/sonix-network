function job(m) {
  return m.labels.job
}

function interface(m) {
  return m.labels.interface
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
        query: '(rate(sai_port_in_packet_size_bytes_sum[10m]) + rate(sai_port_out_packet_size_bytes_sum[10m]))*8 and topk(5, rate(sai_port_out_packet_size_bytes_sum[1h]) + rate(sai_port_in_packet_size_bytes_sum[1h])) > 0',
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
