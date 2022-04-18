var swiperHome = new Swiper('.mySwiperHome', {
  autoplay: {
    delay: 4000,
  },
  /* navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }, */
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  loop: true,
  /* mousewheel: true, */ /* колёсико мыши */ keyboard: true /* клавиатура */,
  allowTouchMove: true /* перетягивание мышью */,
  autoHeight: true /* обновление высоты под картинку */,
});

var swiperDetail = new Swiper('.mySwiperDetail', {
  autoplay: {
    delay: 4000,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true /* спрятать ползунок */,
    /* hide: true */
  },
  /* loop: true, */
  allowTouchMove: true,
  autoHeight: true,
  grabCursor: true /* курсор захвата слайда */,
});
