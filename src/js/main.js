const ifDefined = (el) => {
	if (typeof el === "undefined" || el === null) {
		return false;
	}
	return true;
};

import { initSlider, swiperFriends } from "./slider.js";
import { initPagination, swiperPagination } from "./pagination.js";
import { initMobileMenu } from "./menu.js";
import { initModal } from "./modal.js";

initMobileMenu();
if (ifDefined(swiperPagination)) {
	initPagination();
}
initModal();
if (ifDefined(swiperFriends)) {
	initSlider();
}
