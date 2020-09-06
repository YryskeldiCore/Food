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

export default tabs;