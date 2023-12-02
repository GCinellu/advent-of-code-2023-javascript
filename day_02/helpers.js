const cubesLimits = {
  red: 12,
  green: 13,
  blue: 14
}

function extractGameRoundsFromString(string) {
  const gamesStr = string.replace(/^[^:]+:\s*/, '');
  return gamesStr.split(';').map(game => game.trim());
}

function extractGameRoundFromString(string) {
  return parseInt(string.match(/Game (\d+):/)[1], 10)
}

function validateExtraction(extraction) {
  let isValidGame = true
  let [number, color] = extraction.split(' ')
  number = parseInt(number, 10)

  if (number > cubesLimits[color]) {
    isValidGame = false
  }

  return isValidGame
}

function getCubesPowerFromGame(game) {
  const gameRounds = extractGameRoundsFromString(game)
  const gameValues = {
    red: 0,
    blue: 0,
    green: 0,
  }
  let counter = 0

  for (let gameRound of gameRounds) {
    let extractions = gameRound.split(', ')

    for (let extraction of extractions) {
      let [number, color] = extraction.split(' ')
      number = parseInt(number, 10)

      if (gameValues[color] < number) {
        gameValues[color] = number
      }
    }
  }

  return counter + (
    gameValues.red * gameValues.blue * gameValues.green
  )
}

const getSolutionPart1 = (lines) => {
  return lines.reduce((acc, line) => {
    if (!line) return acc

    const index = extractGameRoundFromString(line)
    let isValidGame = true

    const gameRounds = extractGameRoundsFromString(line)

    for (let gameRound of gameRounds) {
      let extractions = gameRound.split(', ')

      for (let extraction of extractions) {
        let [number, color] = extraction.split(' ')
        number = parseInt(number, 10)

        if (number > cubesLimits[color]) {
          isValidGame = false
          break;
        }
      }
    }

    if (isValidGame) {
      acc += parseInt(index, 10)
    }

    return acc
  }, 0)
}

const getSolutionPart2 = (lines) => {
  return lines.reduce((acc, line) => {
    if (!line) return acc

    const gamePower = getCubesPowerFromGame(line)
    return acc + gamePower
  }, 0)
}

module.exports = {
  extractGameRoundsFromString,
  extractGameRoundFromString,
  getCubesPowerFromGame,
  validateExtraction,
  getSolutionPart1,
  getSolutionPart2
}