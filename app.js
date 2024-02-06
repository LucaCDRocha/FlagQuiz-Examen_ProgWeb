import { shuffle } from "lodash";
import Country from "./Country";
import Game from "./Game";

async function getCountryData() {
	const respond = await fetch("https://restcountries.com/v3.1/all");
	const data = await respond.json();
	return shuffle(data);
}

async function init() {
	const game = new Game(await getCountryData());
	const form = document.querySelector("form");
	const highscoreElement = document.querySelector("#highscore h1");
	let highscore = 0;

	if (localStorage.getItem("highscore")) {
		highscore = localStorage.getItem("highscore");
		highscoreElement.textContent = `Highscore: ${highscore}`;
	}

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const value = document.querySelector("input").value;
		if (!game.isGameOver()) {
			if (game.currentCountry.hasPossibleRespond(value)) {
				game.addPoint();
				if (game.score > highscore) {
                    highscore = game.score
					localStorage.setItem("highscore", highscore);
                    highscoreElement.textContent = `Highscore: ${highscore}`;
				}
			}
			game.nextCountry();
			document.querySelector("#score h1").textContent = `Score: ${game.score}`;
			form.reset();
		} else {
			alert(`Game Over! Your score is ${game.score}`);
			form.reset();
		}
	});
}

init();
