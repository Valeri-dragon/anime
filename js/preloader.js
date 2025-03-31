const preloader = () => {
  let preloader = document.querySelector(".preloder");
  //показ прелоудера
  preloader.classList.add('active')
  setTimeout(() => { preloader.classList.remove("active"); }, 500);
}
preloader()