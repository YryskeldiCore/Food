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

export default calc;