import {openModal, closeModal} from './modal';

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
        openModal('.modal', timerModal);

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
                closeModal('.modal');  
            }, 4000);
        }

        fetch('http://localhost:3000/menu')
            .then(data => data.json())
            .then(res => console.log(res));

}

export default forms;