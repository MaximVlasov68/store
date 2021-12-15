var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    autoplay: {
        delay: 7000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    loop: true,
    mousewheel: true,
    keyboard: true,
  });