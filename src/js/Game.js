export default class Game {
  constructor (elements) {
    this.elements = elements
    this.score = [0, 0]
  }

  reset () {
    this.score = [0, 0]
  }

  incrementScore (player) {
    this.score[player - 1] += 1
  }

  rearrangeArrayStartingWithIndex (array, index) {
    const sortedElements = [].concat(array)
    for (let i = 0; i < index; i++) {
      sortedElements.push(sortedElements.shift())
    }
    return sortedElements
  }

  isEven (num) {
    return num % 2 === 0
  }

  getRandomChoice () {
    const { elements } = this
    return Math.floor(Math.random() * elements.length)
  }

  playGame (player1choice, player2choice) {
    if (player1choice === player2choice) return 0
    const sortedElements = this.rearrangeArrayStartingWithIndex(this.elements, player1choice)
    const player2index = sortedElements.indexOf(this.elements[player2choice])
    const winningPlayer = this.isEven(player2index) ? 1 : 2
    this.incrementScore(winningPlayer)
    return winningPlayer
  }
}
