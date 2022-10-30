import { pets } from "./pets.js";
import { modalOpen } from "./modal.js";
import anime from "animejs/lib/anime.es.js";
// import Swiper, { Navigation, Pagination } from "swiper"; .. подключить на странице pets!

const swiperWrapper = document.querySelector(".swiper-wrapper");
const btnPrevSlide = document.querySelector(".btn_arrow-left");
const btnNextSlide = document.querySelector(".btn_arrow-right");
let countCards = null; // count cards per slide
let currSlide = []; // []

const slides = {
	// elements;
	current: null,
	next: null,
	prev: null,
};

const randomNumber = () => Math.round(Math.random() * (pets.length - 1));

const searchCard = (slide, id) => {
	if (
		slide.length === 0 ||
		slide.findIndex((card) => card.name === pets[id].name) === -1
	) {
		return true;
	} else return false;
};

const getCard = (slide) => {
	let id = randomNumber();
	if (searchCard(slide, id) && searchCard(currSlide, id)) {
		slide.push(pets[id]);
	} else {
		getCard(slide);
	}
};

const renderCards = (cards, elem) => {
	let html = "";
	cards.forEach((card) => {
		html += `
			<div class="swiper_card">
				<div class="img-wrapper responsive square">
					<img src="${card.img}" alt="${card.type}" />
				</div>
				<h4>${card.name}</h4>
				<div class="btn_center">
					<button
						class="btn btn_white learn_more"
						data-path="${card.id}"
					>
						Learn more
					</button>
				</div>
			</div>
		`;
	});
	console.log("cards html ", html);
	elem.innerHTML = html;
};

const renderCurrentSlide = (slide) => {
	const swiperSlide = document.createElement("div");
	swiperSlide.className = "swiper-slide";
	console.log("swiper slide ", swiperSlide);
	renderCards(slide, swiperSlide);
	// может здесь инжектить слайд
	return swiperSlide;
};

const getCountCards = (page) => {
	// @page => pets or main
	const count = {
		main: [1, 2, 3],
		pets: [3, 6, 8],
	};
	// использовать эту ф-ю для определения кол-ва карточек на странице pets.html
	const windowWidth = window.innerWidth;
	let countCards;
	if (windowWidth <= 768) {
		countCards = count[page][0];
	} else if (windowWidth > 768 && windowWidth < 1268) {
		countCards = count[page][1];
	} else {
		countCards = count[page][2];
	}
	return countCards;
};

const getCurrentSlide = (slide) => {
	// чтобы была возможность генерировать слайды из готовых данных
	if (!slide) {
		slide = [];
	}
	for (let i = 0; i < countCards; i += 1) {
		getCard(slide);
	}
	currSlide = slide;
	console.log("slide ", currSlide);
	return renderCurrentSlide(slide);
};

const modalPets = (event) => {
	console.log("event ", event.target);
	const target = event.target;
	if (target.classList.contains("learn_more")) {
		modalOpen(target);
	}
};

const rebindSlide = (slide, position) => {
	// @slide -> string
	if (slides[slide]) {
		// debugger;
		slides.current = slides[slide];
		slides[slide] = null;
		slides.current.style.cssText = "";
	} else {
		slides.current = getCurrentSlide();
	}
	slides.current.style[position.direction] = position.point;
	slides.current.style.zIndex = "2";
	swiperWrapper.appendChild(slides.current);
};

const moveSlide = (translateX) => {
	anime({
		targets: slides.current,
		translateX: translateX,
		duration: 500,
		easing: "linear",
		complete: function (anim) {
			swiperWrapper.removeChild(swiperWrapper.firstElementChild);
		},
	});
};

const slideLeft = () => {
	slides.next = slides.current;
	slides.next.style.zIndex = "1";
	rebindSlide("prev", { direction: "left", point: "-100%" });
	moveSlide("100%");
};

const slideRight = () => {
	slides.prev = slides.current;
	slides.prev.style.zIndex = "1";
	rebindSlide("next", { direction: "right", point: "-100%" });
	moveSlide("-100%");
};

const initSlider = () => {
	countCards = getCountCards("main");
	slides.current = getCurrentSlide();
	swiperWrapper.appendChild(slides.current);
	btnNextSlide.addEventListener("click", slideRight);
	btnPrevSlide.addEventListener("click", slideLeft);
	swiperWrapper.addEventListener("click", modalPets);
	console.log("init slider----");
};

export { swiperWrapper, randomNumber, getCountCards, initSlider };
