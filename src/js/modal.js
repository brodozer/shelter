const overlay = document.querySelector(".overlay");

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

const modalOpen = (event) => {
	const target = event.target;
	const path = target.dataset.path;
	const modal = document.querySelector(`data-target=${path}`);
	lockScroll();
	overlay.classList.add("show_modal");
	console.log("modal open");
};

const modalClose = (event) => {
	const target = event.target;
	const path = target.dataset.path;
	const modal = document.querySelector(`data-target=${path}`);
	unlockScroll();
	overlay.classList.remove("show_modal");
	console.log("modal close");
};

export { overlay, lockScroll, unlockScroll };
