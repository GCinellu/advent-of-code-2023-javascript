const { sum } = require('../common/helpers')

function composeFirstAndLastDigitsFromNumberArray(numbers = []) {
  const firstNumber = numbers.shift()
  const lastNumber = numbers.pop() || firstNumber
  
  const valueString = `${firstNumber}${lastNumber}`

  return parseInt(valueString, 10)
}

function combineFirstAndLastDigitsFromString(line) {
  const numbers = line
    .split('')
    .filter(character => !isNaN(character))
    .map(character => parseInt(character, 10))
    .filter(Boolean)
  
  return numbers.length
    ? composeFirstAndLastDigitsFromNumberArray(numbers)
    : 0
}

function combineFirstAndLastDigitsFromStrings(strings) {
  return strings.map((element) => {
    return combineFirstAndLastDigitsFromString(element)
  })
}

function splitNumberWordAndDigits(numberWord) {
  const numberWords = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
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
      currentWord = char; // as the gnomes like to mix up the last letter of a number with the first one of another number
    }
  }

  return words;
}

function wordToDigit(word) {
  if (!isNaN(parseInt(word, 10))) return parseInt(word, 10);
  
  const mapping = {
    'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
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
  const numbers = splitNumberWordsToDigits(strings)
  return sum(numbers)
}

module.exports = {
  // part 1
  combineFirstAndLastDigitsFromString,
  getSolutionPart1,

  // part 2
  splitNumberWordAndDigits,
  splitNumberWordsToDigits,
  wordToDigit,
  wordsToDigits,
  getSolutionPart2,
}