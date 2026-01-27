(() => {
  const container = document.querySelector('[data-traffic-stats]');
  if (!container) {
    return;
  }

  const valueNodes = {
    stockholm: document.querySelector('[data-traffic-value="stockholm"]'),
    gothenburg: document.querySelector('[data-traffic-value="gothenburg"]'),
    malmo: document.querySelector('[data-traffic-value="malmo"]'),
  };
  const updatedNode = document.querySelector('[data-traffic-updated]');

  const citySites = {
    stockholm: ['ixn', 'kn7', 'sk1', 'sk2', 'kg', 'ch'],
    gothenburg: ['shg5'],
    malmo: ['vg4'],
  };

  const query =
    'sum by (site) (label_replace(rate(sai_port_in_packet_size_bytes_sum{interface=~"Ethernet.*"}[15m]),"site","$1","instance","ixp-([^.]+)-sw.*")) * 8';

  const apiUrl = new URL('https://metric.sonix.network/api/v1/query');
  apiUrl.searchParams.set('query', query);

  const formatBps = (value) => {
    if (!Number.isFinite(value)) {
      return '—';
    }
    const units = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'];
    let idx = 0;
    let num = value;
    while (num >= 1000 && idx < units.length - 1) {
      num /= 1000;
      idx += 1;
    }
    return `${num.toFixed(num >= 10 || idx === 0 ? 0 : 1)} ${units[idx]}`;
  };

  const resolveSite = (metric) => {
    if (metric.site) {
      return metric.site;
    }
    if (!metric.instance) {
      return null;
    }
    const match = metric.instance.match(/ixp-([^.]+)-sw/i);
    return match ? match[1] : null;
  };

  const updateDisplay = (totals) => {
    Object.entries(valueNodes).forEach(([city, node]) => {
      if (!node) {
        return;
      }
      node.textContent = formatBps(totals[city] || 0);
    });

    if (updatedNode) {
      const now = new Date();
      updatedNode.textContent = `Updated ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  const fetchStats = () => {
    fetch(apiUrl.toString(), { cache: 'no-store' })
      .then((response) => response.json())
      .then((payload) => {
        if (!payload || payload.status !== 'success') {
          throw new Error('Invalid payload');
        }

        const totals = {
          stockholm: 0,
          gothenburg: 0,
          malmo: 0,
        };

        payload.data.result.forEach((series) => {
          const site = resolveSite(series.metric);
          if (!site) {
            return;
          }
          const value = parseFloat(series.value[1]);
          Object.entries(citySites).forEach(([city, sites]) => {
            if (sites.includes(site)) {
              totals[city] += value;
            }
          });
        });

        updateDisplay(totals);
      })
      .catch(() => {
        Object.values(valueNodes).forEach((node) => {
          if (node) {
            node.textContent = 'Unavailable';
          }
        });
      });
  };

  fetchStats();
  setInterval(fetchStats, 300000);
})();
