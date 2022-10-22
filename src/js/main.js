const containerCards = document.querySelector(".container_cards");

const ifDefined = (el) => {
	if (typeof el === "undefined" || el === null) {
		return false;
	}
	return true;
};

import { changeScreenWidth } from "./pagination.js";

import { btnMenu, mobileMenu } from "./menu.js";

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

if (ifDefined(containerCards)) {
	changeScreenWidth(containerCards);
	window.addEventListener("resize", () => {
		changeScreenWidth(containerCards);
	});
}

btnMenu.addEventListener("click", mobileMenu);
