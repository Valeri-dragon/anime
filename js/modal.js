const modal = () => {
  const modal = document.querySelector(".search-model");

  //открытие модального окна с поиском
  document.addEventListener("click", (e) => {
    e.target.classList.contains("icon_search") &&
      (modal.style.display = "block");
    e.target == modal.querySelector(".search-close-switch") ||
      (e.target == modal.querySelector(".icon_close") &&
        (modal.style.display = ""));
  });
}
modal()