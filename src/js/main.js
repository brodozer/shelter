const body = document.body;
const counter = 25;
const btn = body.querySelector(".btn_disable");
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
	console.log("scroll lock");
};

const disabled = () => {
	btn.disabled = true;
};

import { unlockScroll } from "./menu.js";

// lockScroll();
// disabled();

// const myTimeout = setTimeout(unlockScroll(body), 5000);

import Swiper, { Navigation, Pagination } from "swiper";

const swiper = new Swiper(".swiper_friends", {
	modules: [Navigation],
	// Optional parameters

	// loop: true,

	// Default parameters
	slidesPerView: 1,
	// spaceBetween: 10,
	// Responsive breakpoints
	breakpoints: {
		// when window width is >= 768px
		768: {
			slidesPerView: 2,
			spaceBetween: 40,
		},
		// when window width is >= 1280px
		1280: {
			slidesPerView: 3,
			spaceBetween: 90,
		},
	},
	navigation: {
		disabledClass: "btn_disabled",
		nextEl: ".btn_arrow-right",
		prevEl: ".btn_arrow-left",
	},
});
