let selectedLi;
let target = "";
let levelClick = document.querySelector(".face__level");
let button = document.querySelector(".face__start");
let pageFace = document.querySelector(".face");
let pageGame = document.querySelector(".game");
let flipCards;
let flipCardInners;
let active = document.querySelector(".active");



levelClick.onclick = function(event) {
  target = event.target;
  hightLight(target);
}


function hightLight(element) {
  if (selectedLi) selectedLi.classList.remove("face__level_elemet-active");
  selectedLi = element;
  selectedLi.classList.add("face__level_elemet-active");
}


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomPick = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomPick]] = [array[randomPick], array[i]];
  }
}


function createCard(array) {
  for (let i=0; i<array.length; i++) {
    let card = document.createElement ("div");
    let cardInner = document.createElement ("div");
    let cardFront = document.createElement ("div");
    let cardBack = document.createElement ("div");
    let imageFront = new Image();
    let imageBack = new Image();

    card.className = "flip-card";
    pageGame.appendChild(card);

    cardInner.className = "flip-card__inner";
    card.appendChild(cardInner);

    cardFront.className = "flip-card__front";
    cardInner.appendChild(cardFront);
    imageFront.src = "img/card.png";
    imageFront.classList.add("flip-card__image");
    cardFront.appendChild(imageFront);

    cardBack.className = "flip-card__back";
    cardInner.appendChild(cardBack);
    if (array[i] === 1) {
      imageBack.src = "img/card_bug.png";
    } else {
      imageBack.src = "img/card_end.png";
    }
    imageBack.classList.add("flip-card__image");
    cardBack.appendChild(imageBack);
  }
}

button.addEventListener("click", () => {
  let array;
  let easy = [1,0,0];
  let middle = [1,0,0,0,0,0];
  let hard = [1,0,0,0,0,0,0,0,0,0];
  if (target.innerHTML ==="Простой" || target.innerHTML === undefined) {
    array = easy;
  }
  if (target.innerHTML ==="Средний") {
    array = middle;
  }
  if (target.innerHTML ==="Сложный") {
    array = hard;
    pageGame.classList.add("width");
  }
  shuffle(array);
  pageFace.classList.add("visible");
  pageGame.classList.remove("visible");
  createCard(array);
  flipCards = document.querySelectorAll(".flip-card");
  if (array === middle || array === easy) {
    for(var o = 0; o < flipCards.length; o++) {
      flipCards[o].classList.add("lowCard")
    }
  }
  flipCardInners = document.querySelectorAll(".flip-card__inner");
  for (let i=0; i<flipCards.length;i++) {
    let flipCardInner = () => flipCardInners[i].classList.toggle("active");
    flipCards[i].addEventListener("click", flipCardInner, {once:true});
  }
});

document.onclick = function(event) {
  if (active !== null) {
    active.classList.toggle("active");
    pageFace.classList.remove("visible");
    pageGame.classList.add("visible");
    pageGame.classList.remove("width");

    while (pageGame.firstChild) {
      pageGame.removeChild(pageGame.firstChild);
    }
  }
  active = document.querySelector(".active");
}