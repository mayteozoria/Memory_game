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
  { value: '2', image: './images/hotpinkroses.png', matched: 'false' },
  { value: '3', image: './images/kitten.png', matched: 'false' },
  { value: '2', image: './images/hotpinkroses.png', matched: 'false' },
  { value: '3', image: './images/kitten.png', matched: 'false' }
]

let firstTry = null //1st try index of the card selected

const cardEls = document.querySelectorAll('.card')
const resetBtnEl = document.querySelector('button')
/*----- event listeners -----*/

/*----- functions -----*/

shuffle(cards)

cardEls.forEach(function (el, index) {
  el.addEventListener('click', function () {
    //listen for click event when a card is clicked on
    if (index === firstTry || cards[index].matched || !canTries) {
    }
    let clickedCard = cards[index]
    el.setAttribute('src', clickedCard.image)

    if (firstTry === null) {
      firstTry = index
    } else {
      //complete a turn
      tries++
      document.querySelector('#tries').textContent = tries

      if (cards[firstTry].value === cards[index].value) {
        //the current guess if its a match
        cards[firstTry].matched = true
        cards[index].matched = true
        firstTry = null
        flippedCards += 2 //check for win and reset if there is a winner

        if (flippedCards === cards.length) {
          resetGame()
        }
      } else {
        canTries = false

        setTimeout(function () {
          cardEls[firstTry].setAttribute('src', './images/bluefront.png')
          cardEls[index].setAttribute('src', './images/bluefront.png')

          firstTry = null
          canTries = true
        }, 1500)
      }
    }
  })
})
