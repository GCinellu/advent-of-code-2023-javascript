const cubesLimits = {
  red: 12,
  green: 13,
  blue: 14
}

function extractGameRoundsFromString(string) {
  const gamesString = string.replace(/^[^:]+:\s*/, '');
  return gamesString.split(';').map(game => game.trim());
}

function extractGameRoundFromString(string) {
  return parseInt(string.match(/Game (\d+):/)[1], 10)
}

function validateExtraction(extraction) {
  let [numberString, color] = extraction.split(' ')
  const number = parseInt(numberString, 10)

  return number <= cubesLimits[color]
}

function calculateMaximumCubesPower(gameData) {
  const rounds = extractGameRoundsFromString(gameData);
  const maxValues = {
    red: 0,
    blue: 0,
    green: 0,
  };

  rounds.forEach(round => {
    round.split(', ').forEach(extraction => {
      const [numberString, color] = extraction.split(' ');
      const number = parseInt(numberString, 10);

      if (!isNaN(number) && maxValues[color] !== undefined) {
        maxValues[color] = Math.max(maxValues[color], number);
      }
    });
  });

  return maxValues.red * maxValues.blue * maxValues.green;
}


const getSolutionPart1 = (lines) => {
  return lines.reduce((totalScore, line) => {
    if (!line) return totalScore;

    const gameIndex = extractGameRoundFromString(line);
    if (isNaN(parseInt(gameIndex, 10))) return totalScore;

    const gameRounds = extractGameRoundsFromString(line);
    const isGameValid = gameRounds.every(gameRound => {
      return gameRound.split(', ').every(validateExtraction);
    });

    return isGameValid
      ? totalScore + parseInt(gameIndex, 10)
      : totalScore;
  }, 0);
}

const getSolutionPart2 = (lines) => {
  return lines.reduce((acc, line) => {
    if (!line) return acc

    const gamePower = calculateMaximumCubesPower(line)
    return acc + gamePower
  }, 0)
}

module.exports = {
  extractGameRoundsFromString,
  extractGameRoundFromString,
  calculateMaximumCubesPower,
  validateExtraction,
  getSolutionPart1,
  getSolutionPart2
}