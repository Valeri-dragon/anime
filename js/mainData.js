const getDb=()=>{
  const l = (log) => {
    console.log(log);
  };
  const renderAnimeList=(array, ganres)=>{
l(array)
l(ganres)
  }
  
  const renderTopAnime = (array)=>{
    const wrapperTopAnime = document.querySelector(".filter__gallery");
    l(array);
array.forEach((e)=>{
  l(e)
// ['original-title', 'views',]
 wrapperTopAnime.insertAdjacentHTML(
   "afterbegin",
   `<div class="product__sidebar__view__item set-bg mix day years" data-setbg="${
     e.image
   }">
                                    <div class="ep">${e.rating} / 10</div>
                                    <div class="view"><i class="fa fa-eye"></i> ${
                                      e.views
                                    }</div>
                                    <h5><a href="/anime-details.html">${
                                      e.title}</a></h5>
                                </div>`
 );

 wrapperTopAnime.querySelectorAll(".set-bg").forEach((elem) => {
  elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
});

})
   
  }
  
  //../db.json
  fetch("https://anime-46e96-default-rtdb.firebaseio.com/anime.json")
    .then((response) => {
      return response.json();
    })
    .then((dbData) => {
      //создание коллекции по жанрам
      const ganres = new Set ()
      //вывод 5 популярных по кол-ву просмотра фильмов-анимэ от большего к меньшему
   renderTopAnime(dbData.sort((a, b) => b.views - a.views).slice(0, 5));

dbData.forEach((item)=>{
   ganres.add(item.ganre)
   
})
renderAnimeList(dbData, ganres)

    });


  //https://anime-46e96-default-rtdb.firebaseio.com/
}
getDb()