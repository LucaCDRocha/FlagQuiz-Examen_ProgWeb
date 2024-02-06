import Country from "./Country";

class Game {
	#score;
	#dataCountries;
	#index;
	currentCountry;

	constructor(data) {
		this.#score = 0;
		this.#dataCountries = data;
		this.#index = 0;
		this.currentCountry = new Country(this.#dataCountries[this.#index]);
		this.currentCountry.renderFlag();
	}

	addPoint() {
		this.#score++;
	}

	isGameOver() {
		return this.#dataCountries.length - 1 <= this.#index;
	}

	nextCountry() {
		if (this.isGameOver()) {
			return;
		} else {
			this.#index++;
			this.currentCountry = new Country(this.#dataCountries[this.#index]);
			this.currentCountry.renderFlag();
		}
	}

	get score() {
		return this.#score;
	}
}

export default Game;
