import { overlay, lockScroll, unlockScroll } from "./modal.js";
import * as timingFunction from "./timingfunction.js";

const btnMenu = document.querySelector(".btn_menu");
const links = document.querySelectorAll(".menu_link, .btn_make-friend");
console.log("links ", links);
let isMenuOpen = false;
const spinAnimation = {
	keyframes: [{ transform: "rotate(0)" }, { transform: "rotate(90deg)" }],
	opt: {
		normal: {
			duration: 300,
			easing: "linear",
			fill: "forwards",
		},
		reverse: {
			duration: 300,
			easing: "linear",
			fill: "forwards",
			direction: "reverse",
		},
	},
};

const scroll = (element, timingFunction, duration = 600) => {
	let start = null;
	let requestID = null;
	const target = element ? element.getBoundingClientRect().top : 0;
	const firstPos = window.pageYOffset;
	let pos = 0;

	const showAnimation = (timestamp) => {
		if (!start) {
			start = timestamp;
		} //get id of animation
		let elapsed = timestamp - start;
		let progress = elapsed / duration; // default animation duration 600ms
		let easeInPercentage = +timingFunction(progress).toFixed(2);

		// if target is 0 (back to top), the position is: current pos + (current pos * percentage of duration)
		// if target > 0 (not back to top), the positon is current pos + (target pos * percentage of duration)
		pos =
			target === 0
				? firstPos - firstPos * easeInPercentage
				: firstPos + target * easeInPercentage;

		window.scrollTo(0, pos);
		// console.log(pos, target, firstPos, progress);
		// ... if(progress < 1) window.requestAnimationFrame(showAnimation);
		if (elapsed < duration) {
			window.requestAnimationFrame(showAnimation);
		} else {
			cancelAnimationFrame(requestID);
			if (element) {
				// do something ...
				//element.setAttribute("tabindex", -1);
				//element.focus();
			}
			pos = 0;
			console.log("end animation");
		}
	};
	requestID = window.requestAnimationFrame(showAnimation);
};

const mobileMenu = () => {
	overlay.classList.toggle("show_menu");
	if (overlay.classList.contains("show_menu")) {
		btnMenu.animate(spinAnimation.keyframes, spinAnimation.opt.normal);
		lockScroll();
		isMenuOpen = true;
		console.log("menu open");
	} else {
		btnMenu.animate(spinAnimation.keyframes, spinAnimation.opt.reverse);
		unlockScroll();
		isMenuOpen = false;
		console.log("menu close");
	}
};

const smoothScroll = (id) => {
	console.log("id ", id);

	if (window.location.pathname === "/pets.html" && id !== "#contacts") {
		window.location.href = `${window.location.origin}/index.html?id=${id}`;
	}
	if (isMenuOpen) {
		mobileMenu();
	}
	links.forEach((link) => {
		if (link.classList.contains("active")) {
			link.classList.remove("active");
		}
	});
	let currentLinks = document.querySelectorAll(`a[href="${id}"]`);
	console.log("currentLinks ", currentLinks);
	currentLinks.forEach((l) => {
		l.classList.add("active");
	});
	scroll(
		document.getElementById(id.substring(1)),
		timingFunction.outQuad,
		800
	);
};

const getQueryParam = (url) => {
	if (url.indexOf("?") !== -1) {
		const id = url.slice(url.indexOf("?") + 1).split("=")[1];
		smoothScroll(id, timingFunction.inOutQuint);
	}
};

const initMobileMenu = () => {
	links.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			smoothScroll(link.getAttribute("href"));
		});
	});
	getQueryParam(window.location.href);
	btnMenu.addEventListener("click", mobileMenu);
	document.querySelector(".btn_up").addEventListener("click", () => {
		scroll(false, timingFunction.outQuad, 1000);
	});
};

export { initMobileMenu, mobileMenu };
