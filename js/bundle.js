/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc(){
    const res = document.querySelector('.calculating__result span');
    let sex , ratio, height, weight, age;
 
    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
 
    if(localStorage.getItem('ratio')){
         ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }
 
    function calcRes(){
        if(!sex || !ratio || !height || !weight || !age){ // !sex && !ratio 
            res.textContent = '---';
            return;
        } 
 
        if(sex === 'female'){
             res.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
             res.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
 
    calcRes();
 
    function initLocalStorageSetting(selector, activeClass){
        const elems = document.querySelectorAll(selector);
 
         elems.forEach(elem => {
             elem.classList.remove(activeClass);
             if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                 elem.classList.add(activeClass);
             } 
             if(elem.getAttribute('id') === localStorage.getItem('sex')){
                 elem.classList.add(activeClass);
             }
         });
    }
 
    initLocalStorageSetting('#gender div', 'calculating__choose-item_active');
    initLocalStorageSetting('.calculating__choose_big div', 'calculating__choose-item_active');
 
    function getStaticInfo(selector, activeClass){
        const elems = document.querySelectorAll(selector);
 
        elems.forEach(elem => {
            elem.addEventListener('click', (e) => {
             if(e.target.getAttribute('data-ratio')){
                 ratio = +e.target.getAttribute('data-ratio');
                 localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
             } else {
                 sex = e.target.getAttribute('id');
                 localStorage.setItem('sex', e.target.getAttribute('id'));
             }
 
             elems.forEach(elem => {
                 elem.classList.remove(activeClass);
             });
 
             e.target.classList.add(activeClass);
 
             calcRes();
         });
        });
    }
 
    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
 
    function getDynamicInfo(selector){
        const input = document.querySelector(selector);
 
        input.addEventListener('input', () => {
            
             if(input.value.match(/\D/g)){
                 input.style.border = '2px solid red';
             } else {
                 input.style.border = 'none';
             }
 
             switch(input.getAttribute('id')){
                 case 'height':
                     height = +input.value;
                     break;
                 case 'weight':
                     weight = +input.value;
                     break;
                 case 'age':
                     age = +input.value;
                     break; 
             }
             calcRes();
        });
    }
 
    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms(formsSelector, timerModal){
    const forms = document.querySelectorAll(formsSelector);

    const messages = {
        loading: 'img/forms/spinner.svg',
        success: 'success',
        failure: 'fail!'
    };

    forms.forEach(form => {
        PostBindData(form);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: data
        });
        return await res.json();
    };


    function PostBindData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText= `
                    display: block,
                    margin: 0 auto,
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('server.php', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(messages.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(messages.failure);
                })
                .finally(() => {
                    form.reset();
                });

            });
    }

    function showThanksModal(message){
        const prevModal = document.querySelector('.modal__dialog');

        prevModal.classList.add('hide');
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', timerModal);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div className="modal__content">
                    <div className="modal__close" data-close>×</div>
                    <div className="modalTitle">${message}</div>
                </div>
        `;

        document.querySelector('.modal').append(thanksModal);

            setTimeout(() => {
                thanksModal.remove();
                prevModal.classList.add('show');
                prevModal.classList.remove('hide');
                Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');  
            }, 4000);
        }

        fetch('http://localhost:3000/menu')
            .then(data => data.json())
            .then(res => console.log(res));

}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, openModal, closeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
function closeModal(modalSelector){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    modal.style.overflow = 'hidden';
}

function openModal(modalSelector, timerModal){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    modal.style.overflow = '';
    
    if(timerModal){
        clearInterval(timerModal);
    }
}

function modal(modalBtnSelector, modalSelector, timerModal){
    
    const modal = document.querySelector(modalSelector),
          modalBtn = document.querySelectorAll(modalBtnSelector);

    modalBtn.forEach(btn => {
        btn.addEventListener('click', (e)=> {
            const target = e.target;
            if(target && target.matches('[data-modal]')){
                console.log(timerModal);
                openModal('.modal', timerModal);
            }
        });
    });

    modal.addEventListener('click', (e)=> {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal('.modal');
        }
    });


    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.matches('div.modal')){
            closeModal('.modal');
        }
    });

    window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal('.modal', timerModal);
        }
        window.removeEventListener('scroll', showModalByScroll);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider(){
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

    // Functions
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

    function deleteNoDigits(str){
        return +str.replace(/\D/g, '');
    }
    // End F-s

    if (slides.length < 10){
        current.textContent = `0${slideIndex}`;
        total.textContent = `0${slides.length}`;
    } else {
        current.textContent = slideIndex;
        total.textContent = slides.length;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
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
            offset = deleteNoDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNoDigits(width);
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
        if(offset == deleteNoDigits(width) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += deleteNoDigits(width);
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

            offset = deleteNoDigits(width) * (dataSlideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            currentSlide();
            hideDotActive();
            showDotActive();
        }); 
    });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(){

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items');

    hideTabContent();      
    showTabContent();

    function hideTabContent(){
        tabContent.forEach(content => {
            content.classList.add('hide');
            content.classList.remove('show');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabContent[i].classList.add('show','fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabParent.addEventListener('click', (e)=> {
        const target = e.target;
        if(target && target.matches('div.tabheader__item')){
            tabs.forEach((tab, i) => {
                if(target == tab){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(){
    
    const deadline = '2020-08-23';

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t/(1000 * 60 * 60 * 24)),
            hours = Math.floor((t/(1000 * 60 * 60) % 24)),
            minutes = Math.floor((t/(1000 * 60) % 60)),
            seconds = Math.floor((t/1000) % 60);

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function addZerotoTimer(num){
        if(num > 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime){
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerId = setInterval(updateClock, 1000);
        
        updateClock();
        
        function updateClock(){
            let time = getTimeRemaining(endtime);
            days.textContent = addZerotoTimer(time.days);
            hours.textContent = addZerotoTimer(time.hours);
            minutes.textContent = addZerotoTimer(time.minutes);
            seconds.textContent = addZerotoTimer(time.seconds);
            if(time.total <= 0){
                clearInterval(timerId);
            }
        }
    }

    setClock('.timer', deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {

    const timerModal = setInterval(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_2__["openModal"])('.modal', timerModal), 50000);

    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])(timerModal);
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal');
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    Object(_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])('form', timerModal);
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map