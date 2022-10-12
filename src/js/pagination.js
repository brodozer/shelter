const renderCards = (elem, qty) => {
	if (elem.childElementCount !== qty) {
		let html = "";
		let template = `
			<div class="swiper_card">
				<div class="img-wrapper responsive square">
					<img src="img/pets-katrine.jpg" alt="cat" />
				</div>
				<h4>Katrine</h4>
				<div class="btn_center">
					<button class="btn btn_white">Learn more</button>
				</div>
			</div>
		`;
		for (let i = 0; i < qty; i += 1) {
			html += template;
		}

		elem.innerHTML = html;
		console.log("render cards");
	}
};

const changeScreenWidth = (container) => {
	let qty;
	let screenWidth = window.innerWidth;
	if (screenWidth >= 1280) {
		qty = 8;
	} else if (screenWidth >= 768) {
		qty = 6;
	} else {
		qty = 3;
	}
	renderCards(container, qty);
};

// windows.location.pathname

export { changeScreenWidth };
