const cubesLimits = {
  red: 12,
  green: 13,
  blue: 14
}

function extractGameRoundFromString(string) {
  const gamesStr = string.replace(/^[^:]+:\s*/, '');
  return gamesStr.split(';').map(game => game.trim());
}

function validateExtraction(extraction) {
  let [number, color] = extraction.split(' ')
  number = parseInt(number, 10)

  return number > cubesLimits[color]
}

const getSolutionPart1 = (lines) => {
  return lines.reduce((acc, line) => {
    if (!line) return acc

    const index = line.match(/Game (\d+):/)[1]
    let isValidGame = true

    const gameRounds = extractGameRoundFromString(line)

    for (let gameRound of gameRounds) {
      let extractions = gameRound.split(', ')

      for (let extraction of extractions) {
        let [number, color] = extraction.split(' ')
        number = parseInt(number, 10)

        if (number > cubesLimits[color]) {
          isValidGame = false
        }
      }
    }

    if (isValidGame) {
      acc += parseInt(index, 10)
    }

    return acc
  }, 0)
}

module.exports = {
  getSolutionPart1
}