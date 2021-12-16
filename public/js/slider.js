var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    autoplay: {
        delay: 4000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop: true,
    mousewheel: true,
    keyboard: true,
    
  });

 