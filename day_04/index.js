const fs = require('fs')
const data = fs.readFileSync(__dirname + '/data', 'utf-8').replaceAll(/(\r)/gm, '').split('\n')

const getNumbersFromCard = (cardNumbers) => {
  return cardNumbers.split(' ').map(extraction => {
    const parsedExtraction = parseInt(extraction.trim(), 10)
    return isNaN(parsedExtraction) ? null : parsedExtraction
  }).filter(Boolean)
}
const solution = (data) => data.reduce((score, card) => {
  const [, ...cardNumbers] = card.split(':')
  const [cardExtractions, cardPlayedNumbers] = cardNumbers[0].split('|')

  const extractions = getNumbersFromCard(cardExtractions)
  const playedNumbers = getNumbersFromCard(cardPlayedNumbers)
  const winningNumbers = playedNumbers.filter(playedNumber => extractions.includes(playedNumber))

  if (winningNumbers.length === 0) return score

  return score += winningNumbers.length === 1 ? 1 : Math.pow(2, winningNumbers.length - 1)
}, 0)

console.log('Part 1 =>', solution(data)) // 21959