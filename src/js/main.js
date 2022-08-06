const body = document.body;
const counter = 25;
const lockScroll = () => {
    const scrollWidth = window.innerWidth - body.clientWidth;
    const scrollPosition = window.pageYOffset;
    body.dataset.positionY = scrollPosition;
    body.style.cssText = `
        position: fixed;
        top: -${scrollPosition}px;
        left: 0;
        overflow: hidden;
        width: 100%;
        height: 100vh;
        padding-right: ${scrollWidth}px;
    `;
    console.log('scroll lock');
};

import {unlockScroll} from './menu.js';

lockScroll();

const myTimeout = setTimeout(unlockScroll(body), 5000);