/*----- constants -----*/
function shuffle(array) {
  //used the fisher-yates shuffle from stackoverflow.com
  let currentIndex = array.length,
    randomIndex
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }
  return array
}

let cards = [
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

let firstTry = null //1st try index of the card selected.
let nextTurn = true
let finishedCards = 0
let tries = 0

const cardEls = document.querySelectorAll('.card')

/*----- event listeners -----*/

/*----- functions -----*/

shuffle(cards)

cardEls.forEach(function (element, index) {
  //listen for click event when a card is clicked on
  element.addEventListener('click', function () {
    if (index === firstTry || cards[index].matched || !nextTurn) {
    }

    let clickedCard = cards[index] //index of the clicked card
    element.setAttribute('src', clickedCard.image) //once the element is clicked the img src shows

    if (firstTry === null) {
      firstTry = index
    } else {
      // tries++ //will add the amount of tries

      if (cards[firstTry].value === cards[index].value) {
        cards[firstTry].matched = true
        cards[index].matched = true
        //match
        firstTry = null //reset first guess
        finishedCards += 2
        //check for winner to see if all the cards are matched and flipped down then reset
        if (finishedCards === cards.length) {
          resetGame()
        }
      } else {
        nextTurn = false

        setTimeout(function () {
          cardEls[firstTry].setAttribute('src', './images/bluefront.png') //flip the cards over if there is no match
          cardEls[index].setAttribute('src', './images/bluefront.png')
          firstTry = null //resset the game to flipping them back over to the bluefront
          nextTurn = true //continue playing if no match
          // tries = true //to continue playing
        }, 1000)
      }
    }
  })
})

function resetGame() {
  nextTurn = false

  setTimeout(function () {
    firstTry = null
    nextTurn = true
    finishedCards = 0

    cardEls.forEach(function (element, index) {
      //flip the cards face down
      element.setAttribute('src', './images/bluefront.png')
    })

    cards.forEach(function (card, index) {
      //reset the card and its index position to = to false
      card.matched = false
    })
    shuffle(cards)
    //shuffle cards and start again
  }, 0000)
}

document.querySelector('.button').addEventListener('click', function () {
  resetGame()
})
