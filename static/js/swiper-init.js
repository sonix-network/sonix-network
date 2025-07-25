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

    var clientSwiper = new Swiper(clientsEl, {
      loop: true,
      speed: paginationSpeed,
      autoplay: autoplay,
      slidesPerView: slidesPerView,
      grid: { rows: 4, fill: 'row' },
      spaceBetween: 30,
      breakpoints: {
        1200: { slidesPerView: Math.min(slidesPerView, 6) },
        990: { slidesPerView: Math.min(slidesPerView, 4) },
        768: { slidesPerView: Math.min(slidesPerView, 2) },
        480: { slidesPerView: 1 },
      },
      pagination: { el: clientsEl.querySelector('.swiper-pagination'), clickable: true },
    });
  }
});
