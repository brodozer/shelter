import { overlay, lockScroll, unlockScroll } from "./modal.js";

const btnMenu = document.querySelector(".btn_menu");
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

const smoothScroll = () => {
	const links = document.querySelectorAll(".menu_link");

	links.forEach((link) => {
		link.addEventListener("click", (e) => {
			const id = link.getAttribute("href");
			console.log("id ", id);
			if (id.indexOf("#") !== -1) {
				e.preventDefault();
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
			}
		});
	});
};

overlay.addEventListener("click", (event) => {
	const target = event.target;
	console.log("target ", target);
	if (
		target.classList.contains("mobile_menu") &&
		overlay.classList.contains("show_menu")
	) {
		mobileMenu();
	}
});

smoothScroll();

export { btnMenu, mobileMenu };
