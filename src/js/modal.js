import { pets } from "./pets.js";

const overlay = document.querySelector(".overlay");
const modalContainer = overlay.querySelector(".modal_container");
console.log("modal_container ", modalContainer);
const btnsLearnMore = document.querySelectorAll(".learn_more");
const btnCloseModal = document.querySelector(".btn_close");
const body = document.body;

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

const unlockScroll = () => {
	body.style.cssText = "";
	window.scroll(0, body.dataset.positionY);
	console.log("scroll unlock");
};

// data-path button
// data-target modal block

const renderModal = (id) => {
	const pet = pets[id];
	const list = (arr) => arr.join(", ");
	return `
		<div class="img_container">
			<img src="${pet.img}" alt="pets ${pet.name}" />
		</div>
		<div class="descriptions">
			<h3>${pet.name}</h3>
			<h4>${pet.type} - ${pet.breed}</h4>
			<p class="georgia">
				${pet.description}
			</p>
			<ul>
				<li><b>Age:</b> ${pet.age}</li>
				<li><b>Inoculations:</b> ${list(pet.inoculations)}</li>
				<li><b>Diseases:</b> ${list(pet.diseases)}</li>
				<li><b>Parasites:</b> ${list(pet.parasites)}</li>
			</ul>
		</div>
	`;
};

const modalOpen = (event) => {
	const target = event.target;
	const path = target.dataset.path;
	modalContainer.innerHTML = renderModal(path);
	lockScroll();
	overlay.classList.add("show_modal");
	console.log("modal open");
};

const modalClose = () => {
	unlockScroll();
	overlay.classList.remove("show_modal");
	console.log("modal close");
};

export {
	overlay,
	lockScroll,
	unlockScroll,
	btnsLearnMore,
	btnCloseModal,
	modalClose,
	modalOpen,
};
