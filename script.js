/*---- constants ------*/
let cards = [
  //an array of objects
  { value: '1', image: './images/bird.png', matched: 'false' },
  { value: '2', image: './images/kitten.png', matched: 'false' },
  { value: '3', image: './images/bunny.png', matched: 'false' },
  { value: '4', image: './images/koyfish.png', matched: 'false' },
  { value: '5', image: './images/turtle.png', matched: 'false' },
  { value: '6', image: './images/eagle.png', matched: 'false' },

  { value: '1', image: './images/bird.png', matched: 'false' },
  { value: '2', image: './images/kitten.png', matched: 'false' },
  { value: '3', image: './images/bunny.png', matched: 'false' },
  { value: '4', image: './images/koyfish.png', matched: 'false' },
  { value: '5', image: './images/turtle.png', matched: 'false' },
  { value: '6', image: './images/eagle.png', matched: 'false' }
]
//influenced from the rock scissors paper GA video

/*-----Variables-----*/

let firstTry = null //1st try index of the card selected.
let nextTurn = true //the next try
let finishedCards = 0 // if the all the cards have been matched

/*------ cached elements ----*/
const messageEl = document.querySelector('h2')
const cardEls = document.querySelectorAll('.card') //select all the cards
resetBtn = document.querySelector('button')

/*----- event listeners -----*/
resetBtn.addEventListener('click', function () {
  resetGame()
})

/*----- functions -----*/
function init() {
  // to visualize the game and initalize the game
  let firstTry = null //1st try index of the card selected.
  let nextTurn = true //the next try
  let finishedCards = 0 // if the all the cards have been selected
  shuffleCards(cards)
}

const shuffleCards = (arr) => {
  //a simple sort will shuffle the elements/cards randomly in any order
  arr.sort(() => Math.random() - 0.5)
}

//calls a function for each element in the array by using the selector .cards
cardEls.forEach((element, index) => {
  element.addEventListener('click', function () {
    //listen for click event when a card is clicked on
    if (index === firstTry || cards[index].matched || !nextTurn) {
      //no clicked card can be clicked more than one.
    }

    let clickedCard = cards[index] //index position of the clicked card
    element.setAttribute('src', clickedCard.image) //once the element is clicked the img src shows

    if (firstTry === null) {
      //store the first try
      firstTry = index
    } else {
      //check to see if the current cards are equal, its a match
      if (cards[firstTry].value === cards[index].value) {
        cards[firstTry].matched = true
        cards[index].matched = true
        //match
        firstTry = null //start the next turn

        //check for winner to see if all the cards are matched and flipped down then reset
        if (finishedCards === cards.length) {
          renderMessage()
          //resetGame() //check for a win or reset
        }
      } else {
        //no match
        nextTurn = false

        setTimeout(() => {
          //set timer to have a delay so cards flip back after 1 second if there is no match
          cardEls[firstTry].setAttribute('src', './images/bluefront.png') //flip the cards over if there is no match
          cardEls[index].setAttribute('src', './images/bluefront.png')
          firstTry = null //resset the game to flipping them back over to the bluefront
          nextTurn = true //continue playing
          // tries = true //to continue playing
        }, 500)
      }
    }
  })
})

function resetGame() {
  //reset the cards when two non matching cards are selected
  nextTurn = false
  setTimeout(() => {
    firstTry = null
    nextTurn = true
    finishedCards = 0

    cardEls.forEach((element, index) => {
      //flip the cards face down once the games has reset
      element.setAttribute('src', './images/bluefront.png')
      //messageEl.innerText = '' //remove the innter of YOU WIN
    })

    cards.forEach((card, index) => {
      //reset the card and its index position to  false
      card.matched = false
    })
    shuffleCards(cards)
    //shuffle cards and start again
  }, 500)
}

function render() {
  shuffleCards()
  renderMessage()
}

function renderMessage() {
  if (finishedCards === cards.length) {
    messageEl.innerText = 'YOU WIN!'
  }
}
