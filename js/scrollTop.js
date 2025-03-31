const scrollTop = () => {
  //слушаем на всём документ клик по кнопке "Вверх" и поднимаем пользователя к началу страницы
  document.addEventListener("click", (e) => {
    if (
      e.target == document.querySelector("#scrollToTopButton") ||
      e.target == document.querySelector(".arrow_carrot-up")
    ) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}
scrollTop()