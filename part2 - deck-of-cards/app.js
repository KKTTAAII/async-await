const URL = `http://deckofcardsapi.com/api/deck/new/draw/?deck_count=1`;
let cards = [];

//1st question
async function drawCard() {
  let res = await axios.get(URL);
  console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
}

drawCard();

//2nd question
async function getBothCards() {
  let res1 = await axios.get(URL);
  let deckID = res1.data.deck_id;
  cards.push(`${res1.data.cards[0].value} of ${res1.data.cards[0].suit}`);
  let res2 = await axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?deck_count=1`);
  cards.push(`${res2.data.cards[0].value} of ${res2.data.cards[0].suit}`);
  cards.forEach((card) => console.log(card));
}

getBothCards();

//3rd question
const drawCardBtn = document.querySelector(".draw-btn");
let allCardsDiv = document.querySelector(".all-cards");
let deckID;

window.onload = async function getDeckID() {
  let res = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle");
  deckID = res.data.deck_id;
};

function createImg(imgURL) {
  let cardImg = document.createElement("img");
  cardImg.src = imgURL;
  allCardsDiv.appendChild(cardImg);
  for (let i = 1; i < allCardsDiv.children.length; i++) {
    allCardsDiv.children[i].className = "card";
  }
}

drawCardBtn.addEventListener("click", async function () {
  try {
    let res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?deck_count=1`);
    let imageURL = res.data.cards[0].image;
    createImg(imageURL);
  } catch (e) {
    console.log("Out of cards");
    alert("Out of cards");
  }
});
