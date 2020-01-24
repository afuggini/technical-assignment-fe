import Game from './Game'
import types from './gameTypes'

export default class GamePlay {
  constructor (type) {
    type = type || 'classic'
    this.choices = types[type]
    this.game = new Game(types[type])
    this.isCPUGame = false
    this.generateUI()
  }

  generateUI () {
    this.appElement = document.getElementById('app')
    this.scoreElement = document.getElementById('score')
    this.outputElement = document.getElementById('output')
    this.p1Element = document.getElementById('p1')
    this.p2Element = document.getElementById('p2')
    this.choicesElement = document.getElementById('choices')
    this.cpucpuButton = document.getElementById('cpucpu')
    this.usercpuButton = document.getElementById('usercpu')
    this.simulateButton = document.getElementById('simulate')
    this.resetButton = document.getElementById('reset')

    this.resetButton.addEventListener('click', () => this.resetGame())
    this.simulateButton.addEventListener('click', () => this.playGame())
    this.usercpuButton.addEventListener('click', () => this.startUserGame())
    this.cpucpuButton.addEventListener('click', () => this.startCPUGame())

    this.choices.map((choice, index) => {
      const li = document.createElement('li')
      li.innerHTML = choice
      li.addEventListener('click', () => this.playGame(index))
      this.choicesElement.appendChild(li)
    })
  }

  startCPUGame () {
    this.isCPUGame = true
    this.resetGame()
    this.appElement.className = 'cpu-vs-cpu'
  }

  startUserGame () {
    this.isCPUGame = false
    this.resetGame()
    this.appElement.className = 'user-vs-cpu'
  }

  playVsComputer (playerChoice) {
    const computerChoice = this.game.getRandomChoice()
    return {
      player1: playerChoice,
      player2: computerChoice,
      result: this.game.playGame(playerChoice, computerChoice)
    }
  }

  simulateGame () {
    const computer1Choice = this.game.getRandomChoice()
    const computer2Choice = this.game.getRandomChoice()
    return {
      player1: computer1Choice,
      player2: computer2Choice,
      result: this.game.playGame(computer1Choice, computer2Choice)
    }
  }

  generateWinnerTitle (resultNumber) {
    if (resultNumber === 0) {
      return 'Tie game!'
    }
    const message = this.isCPUGame
      ? `CPU ${resultNumber} wins!`
      : resultNumber === 2 ? 'CPU wins!' : 'You win!'
    return message
  }

  playGame (choice) {
    const result = choice ? this.playVsComputer(choice) : this.simulateGame()
    const message = this.generateWinnerTitle(result.result)
    this.showChoices(result.player1, result.player2)
    this.outputElement.innerHTML = message
    this.updateScore()
  }

  updateScore () {
    this.scoreElement.innerHTML = `${this.game.score[0]} : ${this.game.score[1]}`
  }

  showChoices (player1choice, player2choice) {
    this.p1Element.innerHTML = this.game.elements[player1choice]
    this.p2Element.innerHTML = this.game.elements[player2choice]
  }

  resetGame () {
    this.outputElement.innerHTML = '-'
    this.p1Element.innerHTML = ''
    this.p2Element.innerHTML = ''
    this.game.reset()
    this.updateScore()
  }
}
