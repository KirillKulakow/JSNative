import modals from './modules/modals.js';
import sliders from './modules/slider';
import forms from './modules/forms.js';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyle from './modules/showMoreStyle';
import calc from './modules/calc';
import filter from './modules/filter';
import pictureResize from './modules/pictureResize';
import collapse from './modules/collapse.js';
import burger from './modules/burger';
import scrolling from './modules/scrolling';
import drop from './modules/drop';

window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    modals();
    sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms();
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    showMoreStyle('.button-styles', '#styles .row');
    calc('#size', '#material', '#options', '.promocode', '.calc-price');
    filter();
    pictureResize('.sizes-block');
    collapse('.accordion-heading');
    burger('.burger-menu', '.burger');
    scrolling('.pageup');
    drop();
})