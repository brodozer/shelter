import { overlay, lockScroll, unlockScroll, modalClose } from "./modal.js";

const btnMenu = document.querySelector(".btn_menu");
const links = document.querySelectorAll(".menu_link");
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

const getQueryParam = (url) => {
	if (url.indexOf("?") !== -1) {
		const id = url.slice(url.indexOf("?") + 1).split("=")[1];
		smoothScroll(id);
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
	document
		.getElementById(id.substring(1))
		.scrollIntoView({ behavior: "smooth" });
};

links.forEach((link) => {
	link.addEventListener("click", function (e) {
		e.preventDefault();
		smoothScroll(link.getAttribute("href"));
	});
});

getQueryParam(window.location.href);

export { btnMenu, mobileMenu };
