const categoriesData = () => {
   
    //вывод категории жанров в меню
    const renderGanreList = (ganres) => {
        const dropdownMenu = document.querySelector('.header__menu .dropdown')
        ganres.forEach((ganre) => {
            dropdownMenu.insertAdjacentHTML("beforeend", `<li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>`)
        })
    }

    // отрисовка карточек, принадлежащих определенному жанру в блоке с жанром
    const renderAnimeList = (array, ganres) => {
        let preloader = document.querySelector(".preloder");
        const wrapperGanreAnime = document.querySelector(".product-page .col-lg-8");
        if (wrapperGanreAnime) {

            ganres.forEach((ganre) => {
                const productBlock = document.createElement('div')
                const listBlock = document.createElement('div')
                //выводим в категорию все карточки аниме, у которых в теге присутствует выбранный жанр из меню "Categories"
                const list = array.filter(item => item.tags.includes(ganre))

                productBlock.classList.add('mb-5')
                listBlock.classList.add('row')
                productBlock.insertAdjacentHTML('beforeend', ` <div class="product__page__title">
                            <div class="row">
                                <div class="col-lg-8 col-md-8 col-sm-6">
                                    <div class="section-title">
                                        <h4>${ganre}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>`)
                list.forEach((item) => {
                    const listTags = document.createElement('ul')
                    item.tags.forEach(tag => {
                        listTags.insertAdjacentHTML('beforeend', `<li class="mr-1">${tag}</li>`)
                    })
                    listBlock.insertAdjacentHTML("beforeend", ` <div class="col-lg-4 col-md-6 col-sm-6">
                                <div class="product__item">
                                    <div class="product__item__pic set-bg" data-setbg="${item.image}">
                                        <div class="ep">${item.rating} / 10</div>
                                        <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                                    </div>
                                    <div class="product__item__text">
                                        ${listTags.outerHTML}
                                        <h5><a href="./anime-details.html?itemId=${item.id}">${item.title}</a>
                                        </h5>
                                    </div>
                                </div>
                            </div>`)
                })

                productBlock.append(listBlock)
                wrapperGanreAnime.append(productBlock)
            })
            wrapperGanreAnime.querySelectorAll(".set-bg").forEach((elem) => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
            });
        }
        setTimeout(() => { preloader.classList.remove("active"); }, 500);
    }

    // вывод 5 самых просматриваемых аниме по кол-ву просмотров 
    const renderTopAnime = (array) => {
        const wrapperTopAnime = document.querySelector(".filter__gallery");
        array.forEach((e) => {
            wrapperTopAnime.insertAdjacentHTML(
                "beforeend",
                `<div class="product__sidebar__view__item set-bg mix day years" data-setbg="${e.image
                }">
                                    <div class="ep">${e.rating} / 10</div>
                                    <div class="view"><i class="fa fa-eye"></i> ${e.views
                }</div>
                                    <h5><a href="/anime-details.html">${e.title}</a></h5>
                                </div>`
            );

            wrapperTopAnime.querySelectorAll(".set-bg").forEach((elem) => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
            });

        })

    }

    //получение данных из базы
    //../db.json
    fetch("https://anime-46e96-default-rtdb.firebaseio.com/anime.json")
        .then((response) => response.json())
        .then((dbData) => {
            //создание коллекции по жанрам
            const ganres = new Set()
            //получение параметра  выбранного жанра аниме из url строки
            const ganreParams = new URLSearchParams(window.location.search).get('ganre')

            dbData.forEach((item) => {
                ganres.add(item.ganre)
            })

            //вывод 5 популярных по кол-ву просмотра фильмов-анимэ от большего к меньшему
            renderTopAnime(dbData.sort((a, b) => b.views - a.views).slice(0, 5));
            if (ganreParams != null) {
                renderAnimeList(dbData, [ganreParams])
            } else {
                renderAnimeList(dbData, ganres)
            }
            renderGanreList(ganres)
        });


}
categoriesData()