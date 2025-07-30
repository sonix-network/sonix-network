// Initialize Swiper carousels
window.addEventListener('load', function() {
  var homepageEl = document.querySelector('.homepage-swiper');
  if (homepageEl) {
    var homeSwiper = new Swiper(homepageEl, {
      loop: true,
      autoplay: homepageEl.dataset.autoplay === 'true' ? { delay: parseInt(homepageEl.dataset.slideSpeed || 2000) } : false,
      speed: parseInt(homepageEl.dataset.paginationSpeed || 1000),
      pagination: { el: homepageEl.querySelector('.swiper-pagination'), clickable: true },
    });
  }

  var clientsEl = document.querySelector('.customers-swiper');
  if (clientsEl) {
    var slidesPerView = parseInt(clientsEl.dataset.items || 6);
    var speed = parseInt(clientsEl.dataset.slideSpeed || 2000);
    var autoplay = clientsEl.dataset.autoplay === 'true' ? { delay: speed } : false;
    var paginationSpeed = parseInt(clientsEl.dataset.paginationSpeed || 1000);
    var rows = 4;

    function bpVal(val) {
      return Math.min(slidesPerView, val);
    }

    var clientSwiper = new Swiper(clientsEl, {
      loop: false,
      speed: paginationSpeed,
      autoplay: autoplay,
      slidesPerView: slidesPerView,
      slidesPerGroup: slidesPerView,
      grid: { rows: rows, fill: 'row' },
      spaceBetween: 30,
      breakpoints: {
        '@0.00': {                            // phones (portrait-ish)
          slidesPerView: bpVal(3),
          slidesPerGroup: bpVal(3),
          grid: { rows: 4, fill: 'row' }
        },
        '@0.75': {                            // phones (portrait-ish)
          slidesPerView: bpVal(3),
          slidesPerGroup: bpVal(3),
          grid: { rows: 4, fill: 'row' }
        },
        '@1.00': {                            // phones (portrait-ish)
          slidesPerView: bpVal(4),
          slidesPerGroup: bpVal(4),
          grid: { rows: 4, fill: 'row' }
        },

        '@1.70': {                            // tablets landscape & desktops
          slidesPerView: bpVal(6),
          slidesPerGroup: bpVal(6),
          grid: { rows: 4, fill: 'row' }
        }
      },
      pagination: { el: clientsEl.querySelector('.swiper-pagination'), clickable: true },
    });
  }
});
