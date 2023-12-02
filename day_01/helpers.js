const { sum } = require('../common/helpers')
function composeFirstAndLastDigitsFromNumberArray(numbers = []) {
  const firstNumber = numbers.shift() ?? '0'
  const lastNumber = numbers.pop() ?? firstNumber

  const valueString = `${firstNumber}${lastNumber}`
  return parseInt(valueString, 10) || 0
}

function combineFirstAndLastDigitsFromString(string) {
  const numbers = string
    .split('')
    .filter(l => !isNaN(l)).map(character => parseInt(character, 10))
    .filter(Boolean)
  
  return composeFirstAndLastDigitsFromNumberArray(numbers)
}

function combineFirstAndLastDigitsFromStrings(strings) {
  return strings.map(combineFirstAndLastDigitsFromString)
}

function splitNumberWordAndDigits(numberWord) {
  const numberWords = [
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
  ];
  let words = [];
  let currentWord = '';

  for (let char of numberWord) {
    if (!isNaN(char)) {
      words.push(char)
      currentWord = '';
      continue;
    }
    currentWord += char;

    const match = numberWords
      .find(numberWord => currentWord.match(numberWord))


    if (match) {
      words.push(match);
      currentWord = '';
    }
  }

  return words;
}

function wordToDigit(word) {
  if (!isNaN(parseInt(word, 10))) return parseInt(word, 10);
  
  const mapping = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4,
    'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9
  };

  return parseInt(mapping[word.toLowerCase()]) ?? null;
}

function wordsToDigits(words = []) {
  return words.map(wordToDigit).filter(Boolean)
}

function splitNumberWordsToDigits(numberWords = []) {
  return numberWords
    .map(splitNumberWordAndDigits)
    .map(wordsToDigits)
    .map(composeFirstAndLastDigitsFromNumberArray)
    .filter(Boolean)
}

function getSolutionPart1(strings) {
  const numbers = combineFirstAndLastDigitsFromStrings(strings)
  return sum(numbers)
}

function getSolutionPart2(strings = []) {
  console.log(`[INFO] strings`, strings)
  const numbers = splitNumberWordsToDigits(strings)
  return sum(numbers)
}

module.exports = {
  // part 1
  combineFirstAndLastDigitsFromString,
  combineFirstAndLastDigitsFromStrings,
  getSolutionPart1,

  // part 2
  splitNumberWordAndDigits,
  splitNumberWordsToDigits,
  wordToDigit,
  wordsToDigits,
  getSolutionPart2,
}