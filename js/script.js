window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Tabs

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabParent = document.querySelector('.tabheader__items');

    function hideTabContent(){

        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show','fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    
    }
    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (e) => {
        let target = e.target;
        if(target && target.matches('div.tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2020-08-23';

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t/(1000 * 60 * 60 * 24)),
            hours = Math.floor((t/(1000 * 60 * 60)) % 24),
            minutes = Math.floor((t/(1000 * 60)) % 60),
            seconds = Math.floor((t/1000)% 60);

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        }; 
    }

    function addZero(num){
        if(num > 0 && num <=9){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (selector , endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerId = setInterval(updateClock, 1000);

        function updateClock(){
            let t = getTimeRemaining(endtime);
                days.textContent = addZero(t.days);
                hours.textContent = addZero(t.hours);
                minutes.textContent = addZero(t.minutes);
                seconds.textContent = addZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timerId);
            }
        }

    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
        // modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach((item) => {
        item.addEventListener('click', openModal);
    });

    function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('hide');
        document.body.style.overflow = '';
    }


    modal.addEventListener('click', (e) => {
        const target = e.target;
        if(target === modal || target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.matches('div.modal')){
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll (){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
            }
        }

    window.addEventListener('scroll', showModalByScroll);

    // using Class syntax sugar , Rest operator, default parameters.

    class MenuFood {
        constructor(foodImgSrc, alt, subtitle, descr, price, parentSelector, ...classes){
            this.foodImgSrc = foodImgSrc;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
            this.usd = 77;
            this.convertKGZ();
        }

        convertKGZ(){
            this.price = this.price * this.usd;
        }

        render(){
            const element = document.createElement('div');

            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className)); 
            }
            

            element.innerHTML= `
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

    // new MenuFood(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     2,
    //     '.menu .container',
    //     'menu__item',
    //     'big'
    // ).render();

    // new MenuFood(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     5,
    //     '.menu .container'
    // ).render();

    // new MenuFood(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     8,
    //     '.menu .container'
    // ).render();

    // Forms

    const forms = document.querySelectorAll('form');
    const messages = {
        loading: 'img/forms/spinner.svg',
        success: 'Все успешно , Бро!',
        failure: 'Провал'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch (url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(formData.fromEntries(formData.entries()));

            postData('server.php', json)
            .then(data => {
                console.log(data);
                showThanksModal(messages.success);
            }).catch(() => {
                showThanksModal(messages.failure); 
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal (message){
        let previousModal = document.querySelector('.modal__dialog');

        previousModal.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        previousModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div className="modal__content">
                    <div className="modal__close" data-close>×</div>
                    <div className="modalTitle">${message}</div>
                </div>
        `;

        document.querySelector('form').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            previousModal.classList.add('show');
            previousModal.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

    //Slider

    const slides = document.querySelectorAll('.offer__slide'),
          arrowNext = document.querySelector('.offer__slider-next'),
          arrowPrev = document.querySelector('.offer__slider-prev'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slider = document.querySelector('.offer__slider'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
        offset = 0,
        dots = [];


    function hideDotActive(){
        dots.forEach(dot => {
            dot.classList.add('dot');
            dot.classList.remove('dot_active');
        });
    }

    function showDotActive(){
        dots[slideIndex - 1].classList.add('dot_active');
    }

    function currentSlide(){
        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    if (slides.length < 10){
        current.textContent = `0${slideIndex}`;
        total.textContent = `0${slides.length}`;
    } else {
        current.textContent = slideIndex;
        total.textContent = slides.length;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '1s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    slider.style.position = 'relative';
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-close-to', i + 1);
        if(i == 0){
            dot.classList.add('dot_active');
        }
        indicators.append(dot);
        dots.push(dot);
    }

    arrowPrev.addEventListener('click', () => {
        if(offset == 0){
            offset = +width.slice(0 , width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0 , width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentSlide();
        hideDotActive();
        showDotActive();
    });

    arrowNext.addEventListener('click', () => {
        if(offset == +width.slice(0 , width.length - 2) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += +width.slice(0 , width.length - 2);
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlide();
        hideDotActive();
        showDotActive();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            let dataSlideTo = e.target.getAttribute('data-close-to');
            slideIndex = dataSlideTo;

            offset = +width.slice(0 , width.length - 2) * (dataSlideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            currentSlide();
            hideDotActive();
            showDotActive();
        }); 
    });

    // let slideIndex = 1,
    //     offset = 0,
    //     dots = [];

    // const slides = document.querySelectorAll('.offer__slide'),
    //       arrowPrev = document.querySelector('.offer__slider-prev'),
    //       arrowNext = document.querySelector('.offer__slider-next'),
    //       current = document.querySelector('#current'),
    //       total = document.querySelector('#total'),
    //       slider = document.querySelector('.offer__slider'),
    //       slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    //       slidesField = document.querySelector('.offer__slider-inner'),
    //       width = window.getComputedStyle(slidesWrapper).width;

    // function addZerotoSlider(){
    //     if (slides.length < 10){
    //         current.textContent = `0${slideIndex}`;
    //         total.textContent = `0${slides.length}`;
    //     } else {
    //         current.textContent = slideIndex;
    //         total.textContent = slides.length;
    //     }
    // }
    // addZerotoSlider();

    // slidesField.style.width = 100 * slides.length + '%';
    // slidesField.style.display = 'flex';
    // slidesField.style.transition = '1s all';
    // slidesWrapper.style.overflow = 'hidden';

    // slides.forEach(slide => {
    //     slide.style.width = width;
    // });

    // const indicators = document.createElement('ol');
    // indicators.classList.add('carousel-indicators');
    // slider.style.position = 'relative';
    // slider.append(indicators);

    // for (let i = 0; i < slides.length; i++){
    //     const dot = document.createElement('li');
    //     dot.setAttribute('data-slide-to', i + 1);
    //     dot.classList.add('dot');
    //     if(i == 0){
    //         dot.classList.add('dot_active');
    //     }
    //     indicators.append(dot);
    //     dots.push(dot);
    // }

    // function showDotActive(){
    //     dots.forEach(dot => dot.classList.add('dot'));
    //     dots[slideIndex - 1].classList.add('dot_active');
    // }

    // function hideDotActive (){
    //     dots.forEach(dot => dot.classList.remove('dot_active'));
    // }

    // arrowNext.addEventListener('click', () => {
    //     if(offset == +width.slice(0 , width.length - 2) * (slides.length - 1)){
    //         offset = 0;
    //     } else {
    //         offset += +width.slice(0 , width.length - 2); // width.length - 2 , because '500px' we are cutting the 'px' and add + to width cause we need a num;
    //     }

    //     slidesField.style.transform = `translateX(-${offset}px)`;

    //     if(slideIndex == slides.length){
    //         slideIndex = 1;
    //     } else {
    //         slideIndex++;
    //     }

    //     if(slides.length < 10){
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    //     hideDotActive();
    //     showDotActive();
    // });

    // arrowPrev.addEventListener('click', () => {
    //     if(offset == 0){
    //         offset = +width.slice(0 , width.length - 2) * (slides.length - 1);
    //     } else {
    //         offset -= +width.slice(0 , width.length - 2); 
    //     }

    //     slidesField.style.transform = `translateX(-${offset}px)`;

    //     if(slideIndex == 1){
    //         slideIndex = slides.length;
    //     } else {
    //         slideIndex--;
    //     }

    //     if(slides.length < 10){
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    //     hideDotActive();
    //     showDotActive();
    // });

    // dots.forEach(dot => {
    //     dot.addEventListener('click', (e) => {
    //        const dataSlideTo = e.target.getAttribute('data-slide-to');

    //        slideIndex = dataSlideTo;
    //        offset = +width.slice(0 , width.length - 2) * (dataSlideTo - 1);
    //        slidesField.style.transform = `translateX(-${offset}px)`;

    //         if(slides.length < 10){
    //             current.textContent = `0${slideIndex}`;
    //         } else {
    //             current.textContent = slideIndex;
    //         }

    //         hideDotActive();
    //         showDotActive();
           
    //     });
    // });

    // Slider 1st variant

    // showSlides(slideIndex);

    // if(slides.length < 10){
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function hideSlides(){
    //     slides.forEach(slide => {
    //         slide.classList.add('hide');
    //         slide.classList.remove('show');
    //     });
    // }

    // function showSlides(n){
    //     if(n > slides.length){
    //         slideIndex = 1;
    //     }
    //     if(n < 1){
    //         slideIndex = slides.length;
    //     }

    //     hideSlides();
        
    //     slides[slideIndex - 1].classList.add('show', 'fade');
    //     slides[slideIndex - 1].classList.remove('hide');

    //     if(slides.length < 10){
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n){
    //     showSlides(slideIndex +=n);
    // }

    // arrowPrev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // arrowNext.addEventListener('click', () => {
    //     plusSlides(1);
    // });

});