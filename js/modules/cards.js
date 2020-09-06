function cards(){
    class MenuFood {
        constructor(foodImgSrc, alt, subtitle, descr, price , parentSelector, ...classes){
            this.foodImgSrc = foodImgSrc;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.convertKGZ();
            this.classes = classes;
        }

        convertKGZ(){
            this.price = this.price * 78;
        }

        render(){
            const element = document.createElement('div');
            if(this.classes == 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                     <img src=${this.foodImgSrc} alt=${this.alt}>
                     <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                     <div class="menu__item-descr">${this.descr}</div>
                     <div class="menu__item-divider"></div>
                     <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> сом/день</div>
                     </div>
                    `;
            this.parentSelector.append(element);
        }        
    }
    // new MenuFood(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     2,
    //     '.menu .container',
    // ).render();

    // new MenuFood(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     5,
    //     '.menu .container',
    // ).render();

    // new MenuFood(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     8,
    //     '.menu .container'
    // ).render();


    const getResource = async (url) => {
        const res = await fetch (url);

        if(!res.ok){
            throw new Error(`Coudn't fetch: ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price }) => {
                new MenuFood(img, altimg, title, descr, price,'.menu .container').render();
            });
        });
}

export default cards;