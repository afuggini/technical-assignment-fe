import Game from '../src/js/Game'
import types from '../src/js/gameTypes'

describe('Game', () => {
  const elements = types['classic']
  const game = new Game(elements)

  it('should generate rearranged array based on choice', () => {
    const sortedArray = game.rearrangeArrayStartingWithIndex([0, 2, 4, 6], 2)
    expect(sortedArray).toEqual([4, 6, 0, 2])
  })

  it('should determine wether a number is even', () => {
    expect(game.isEven(0)).toBe(true)
    expect(game.isEven(2)).toBe(true)
    expect(game.isEven(4)).toBe(true)
    expect(game.isEven(1)).toBe(false)
    expect(game.isEven(3)).toBe(false)
    expect(game.isEven(5)).toBe(false)
  })

  it('should generate a random element choice', () => {
    const onlyUnique = (value, index, arr) => {
      return arr.indexOf(value) === index
    }
    const randomChoices = []

    for (let i = 0; i < 5000; i++) {
      const choice = game.getRandomChoice()
      randomChoices.push(choice)
      expect(choice < elements.length && choice >= 0).toBe(true)
    }

    // Make sure all possible choices were randomly selected at least once
    const unique = randomChoices.filter(onlyUnique)
    expect(unique.length).toBe(elements.length)
  })

  it('should return the winning player number or 0 for tie', () => {
    const tieGames = [
      game.playGame(0, 0),
      game.playGame(1, 1),
      game.playGame(2, 2)
    ]
    tieGames.forEach(result => expect(result).toBe(0))

    const p1WinsGames = [
      game.playGame(1, 0),
      game.playGame(2, 1),
      game.playGame(0, 2)
    ]
    p1WinsGames.forEach(result => expect(result).toBe(1))

    const p2WinsGames = [
      game.playGame(0, 1),
      game.playGame(1, 2),
      game.playGame(2, 0)
    ]
    p2WinsGames.forEach(result => expect(result).toBe(2))
  })
})
