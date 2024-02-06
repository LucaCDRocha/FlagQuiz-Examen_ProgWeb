class Country {
	#data;
	#possibleResponds;
	#flag;
	constructor(data) {
		this.#data = data;
		this.#possibleResponds = this.#setPossibleResponds();
		this.#flag = this.#generateFlag();
		console.log(data);
	}

	#setPossibleResponds() {
		const responses = [];
		for (const name of Object.values(this.#data.translations)) {
			responses.push(name.common.toLowerCase());
		}
		return new Set(responses);
	}

	#generateFlag() {
		const element = document.createElement("h1");
		const image = document.createElement("img");
		image.src = this.#data.flags.png;
		element.appendChild(image);
		return element;
	}

	hasPossibleRespond(answer) {
		return this.#possibleResponds.has(answer.toLowerCase());
	}

	renderFlag() {
		const div = document.querySelector("#flag");
		div.innerHTML = "";
		div.insertAdjacentElement("afterbegin", this.#flag);
	}
}

export default Country;
