
const cards = document.querySelectorAll(".card");

let matchCard = 0; //match counter 
let cardOne, cardTwo;
let disableDeck = false; // prevent users to click

function flipCard(e) {
	let clickedCard = e.target; // click card

	if(clickedCard !== cardOne && !disableDeck) {
		clickedCard.classList.add("flip");
		if(!cardOne) {
			return cardOne = clickedCard;
		}
		cardTwo = clickedCard;
		disableDeck = true;

		//match card using data-emoji
		let CardOneEmoji = cardOne.dataset.emoji;
		let CardTwoEmoji = cardTwo.dataset.emoji;
		matchCards(CardOneEmoji, CardTwoEmoji);
	}
}

function matchCards(emoji1, emoji2) {
	if (emoji1 === emoji2) {
		matchCard++; //increment by one
		if(matchCard == 6) {
			setTimeout(() => {
				return restartCard();
			}, 1000);
		}
		cardOne.removeEventListener("click", flipCard);
		cardTwo.removeEventListener("click", flipCard);
		cardOne = cardTwo = "";
		return disableDeck = false;
	}

	setTimeout(() => {
		cardOne.classList.add("shake");
		cardTwo.classList.add("shake");
	}, 600);

	setTimeout(() => {
		cardOne.classList.remove("shake", "flip");
		cardTwo.classList.remove("shake", "flip");
		cardOne = cardTwo = "";
		disableDeck = false;
	}, 1200);
}

function restartCard() {
	let matchCard = 0;
	cardOne = cardTwo = "";
	cards.forEach(card => {
		card.classList.remove("flip");
		card.addEventListener("click", flipCard)
	})
}

cards.forEach(card => {
	card.addEventListener("click", flipCard);
})

$(".btn").click(function() {
	$("#card").toggleClass("flipped");
  });