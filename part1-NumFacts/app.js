const URL = "http://numbersapi.com/";
const favNumbers = [2, 13, 18, 25];
const facts = {};
const parentDiv = document.querySelector(".all-nums");

function addFactsToPage(fact) {
  const numDiv = document.createElement("div");
  parentDiv.appendChild(numDiv);
  numDiv.innerHTML = fact;
  numDiv.className = "child-div";
}

async function getFacts() {
  for (const num of favNumbers) {
    let res = await axios.get(`${URL}${num}?json`);
    facts[num] = res.data.text;
  }
  for (const fact in facts) {
    addFactsToPage(facts[fact]);
  }
}

getFacts();