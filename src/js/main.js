const containerCards = document.querySelector(".container_cards");

const ifDefined = (el) => {
	if (typeof el === "undefined" || el === null) {
		return false;
	}
	return true;
};

import { initSlider, swiperWrapper } from "./slider.js";
import { changeScreenWidth } from "./pagination.js";
import { btnMenu, mobileMenu } from "./menu.js";
import { initModal } from "./modal.js";

if (ifDefined(containerCards)) {
	// не нужно отслеживать ширину, проверка только после перезагрузки страницы!!!
	changeScreenWidth(containerCards);
	window.addEventListener("resize", () => {
		changeScreenWidth(containerCards);
	});
}

btnMenu.addEventListener("click", mobileMenu);

// initMobileMenu();
initModal();
if (ifDefined(swiperWrapper)) {
	initSlider();
}
