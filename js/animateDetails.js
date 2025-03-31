const animateDetails =()=>{
    let preloader = document.querySelector(".preloder");
    //вывод категории жанров в меню
    const renderGanreList = (ganres) => {
        const dropdownMenu = document.querySelector('.header__menu .dropdown')
        ganres.forEach((ganre) => {
            dropdownMenu.insertAdjacentHTML("beforeend", `<li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>`)
        })
    }
    // отрисовка карточки, принадлежащей параметру id выбранного аниме из url строки
    const renderAnimeDetails = (array, itemId) => {
        
        const breadcamLinkks = document.querySelector('.breadcrumb-option')
        const wrapperAnimeContent = document.querySelector(".anime__details__content");
     
        const animeObj= array.find(item => item.id == itemId)
        
        if (animeObj){
        breadcamLinkks.insertAdjacentHTML('beforeend', `<div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb__links">
                        <a href="./index.html"><i class="fa fa-home"></i> Home</a>
                        <a href="./categories.html">Categories</a>
                        <span><a href="./categories.html?ganre=${animeObj.ganre}">${animeObj.ganre}</a></span>
                        <span>${animeObj.title}</span>
                    </div>
                </div>
            </div>
        </div>`)
            wrapperAnimeContent.insertAdjacentHTML('beforeend', `<div class="row">
                    <div class="col-lg-3">
                        <div class="anime__details__pic set-bg" data-setbg="${animeObj.image}">
                            <div class="view"><i class="fa fa-eye"></i> ${animeObj.views}</div>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="anime__details__text">
                            <div class="anime__details__title">
                                <h3>${animeObj.title}</h3>
                                <span>${animeObj['original-title']}</span>
                            </div>

                            <p>${animeObj.description}</p>
                            <div class="anime__details__widget">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <ul>
                                            <li><span>Date aired:</span> ${animeObj.date}</li>
                                            <li><span>Rating:</span> ${animeObj.rating} / 10</li>
                                            <li><span>Genre:</span> ${animeObj.tags.join(', ') }</li>
                                        </ul>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`)

            wrapperAnimeContent.querySelectorAll(".set-bg").forEach((elem) => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
            });
        }else{
            wrapperAnimeContent.insertAdjacentHTML('beforeend', `<div class="row justify-content-center anime__details__title"><h3>Аниме отсутсвует</h3></div>`)
        }
        setTimeout(() => { preloader.classList.remove("active"); }, 500);
    }
    //получение данных из базы
    //../db.json
    fetch("https://anime-46e96-default-rtdb.firebaseio.com/anime.json")
        .then((response) => response.json())
        .then((dbData) => {
            //создание коллекции по жанрам
            const ganres = new Set()
            //получение параметра id выбранного аниме из url строки
            const ganreParams = new URLSearchParams(window.location.search).get('itemId')

            dbData.forEach((item) => {
                ganres.add(item.ganre)
            })

       
          
            if (ganreParams != null) {
                renderAnimeDetails(dbData, ganreParams)
            } else {
               // renderAnimeDetails(dbData, ganres)
                wrapperAnimeContent.insertAdjacentHTML('beforeend', `<div class="row justify-content-center anime__details__title"><h3>Аниме отсутсвует</h3></div>`)
            }
            renderGanreList(ganres)
        });
}
animateDetails()