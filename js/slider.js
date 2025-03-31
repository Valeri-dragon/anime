const slider = () => {
  //подключение библиотеки на странице через cdn и инициализация слайдера на главной
  const swiper = new Swiper(".swiper", {
    speed: 400,
    effect: "fade",
    autoplay: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
slider()