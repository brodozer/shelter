import Swiper, { Navigation } from "swiper";
import { pets } from "./pets.js";
import {
	getRandomNumber,
	getCountCards,
	renderCurrentSlide,
	isUniqCard,
	modalPets,
} from "./slider.js";

const swiperPagination = document.querySelector(".swiper-pagination");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const currentPageNumber = document.querySelector(".current_page");
const firstPageBtn = document.querySelector(".first_page");
const lastPageBtn = document.querySelector(".last_page");
const slides = [];
const countCardsPerSlide = getCountCards("pets");
const countCards = 48;
const maxCountReplayPet = 8; // если поставить 6, то код падает, getCards возвращает undefined
let countSlides = countCards / countCardsPerSlide;

const checkReplayPet = (index, slide) => {
	if (slides.length === 0) {
		return isUniqCard(slide, index);
	}
	return (
		slides.filter((s) => s.some((card) => card.id === pets[index].id))
			.length < maxCountReplayPet && isUniqCard(slide, index)
	);
};

const getCard = (slide) => {
	let index = getRandomNumber();
	if (checkReplayPet(index, slide)) {
		slide.push(pets[index]);
		return pets[index].name;
	} else {
		getCard(slide, pets);
	}
};

const getSlide = () => {
	const slide = [];
	for (let i = 0; i < countCardsPerSlide; i += 1) {
		getCard(slide);
	}
	slides.push(slide);
};

const initPagination = () => {
	while (countSlides > 0) {
		getSlide();
		countSlides -= 1;
	}
	console.log("slides ", slides);
	for (let i = 0; i < slides.length; i += 1) {
		swiperWrapper.appendChild(
			renderCurrentSlide(slides[i], "swiper-slide container_cards")
		);
	}
	console.log(swiperWrapper);
	const swiper = new Swiper(".swiper-pagination", {
		modules: [Navigation],
		speed: 400,
		slidesPerView: 1,
		navigation: {
			nextEl: ".swiper-btn-next",
			prevEl: ".swiper-btn-prev",
			disabledClass: "btn_disabled",
		},
		on: {
			init: function () {
				firstPageBtn.addEventListener("click", () => {
					this.slideTo(0, 300);
				});
				lastPageBtn.addEventListener("click", () => {
					this.slideTo(slides.length - 1, 300);
				});
				firstPageBtn.classList.add("btn_disabled");
				console.log("init pagination -----");
				swiperWrapper.addEventListener("click", modalPets);
			},
			slideChange: function () {
				let activeIndex = this.activeIndex;
				currentPageNumber.innerHTML = activeIndex + 1;
				if (activeIndex > 0) {
					firstPageBtn.classList.remove("btn_disabled");
				}
				if (activeIndex === 0) {
					firstPageBtn.classList.add("btn_disabled");
				}
				if (activeIndex === slides.length - 1) {
					lastPageBtn.classList.add("btn_disabled");
				}
				if (activeIndex < slides.length - 1) {
					lastPageBtn.classList.remove("btn_disabled");
				}
			},
		},
	});
};

export { initPagination, swiperPagination };
