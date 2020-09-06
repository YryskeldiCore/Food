import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import form from './modules/form';
import slider from './modules/slider';
import calc from './modules/calc';
import {openModal, timerIdSelector} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const timerModal = setInterval(() => openModal('.modal', timerModal), 50000);

    tabs();
    timer(timerModal);
    modal('[data-modal]', '.modal');
    cards();
    form('form', timerModal);
    slider();
    calc();
});


