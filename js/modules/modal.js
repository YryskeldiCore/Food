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

export default modal;
export {openModal};
export {closeModal};