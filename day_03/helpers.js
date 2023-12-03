const {sum} = require("../common/helpers");
const findNumbersInString = (string) => {
  const regex = new RegExp(/\d+/g)
  const numbers = string.match(regex)
  return numbers?.map(number => parseInt(number)) ?? []
}

const findIndexStartOfNumber = (string, number) => {
  return string.indexOf(number)
}

function findIndexEndOfNumber(string, number) {
  const numberString = number.toString();
  const startIndex = string.indexOf(numberString);
  if (startIndex === -1) {
    return -1;
  }
  return startIndex + numberString.length - 1;
}

const isSymbol = (character) => {
  return !!character.replaceAll('.', '').match(/\W/) && character !== '.';
}

const checkIfNumberIsHorizontallyAdjacentToSymbol = (string, number, indexStart, indexEnd) => {
  const characterBefore = string[indexStart - 1];
  const characterAfter = string[indexEnd + 1];

  const isAdjacentToSymbolBefore = characterBefore && isSymbol(characterBefore);
  const isAdjacentToSymbolAfter = characterAfter && isSymbol(characterAfter);

  return isAdjacentToSymbolBefore || isAdjacentToSymbolAfter;
}

const isNumberVerticallyAdjacentToSymbol = (matrix, rowIndex, number, indexStart, indexEnd) => {
  const previousRow = rowIndex > 0 ? matrix[rowIndex - 1] : null;
  const nextRow = rowIndex < matrix.length - 1 ? matrix[rowIndex + 1] : null;

  const adjustedIndexStart = indexStart === 0 ? 0 : indexStart - 1;
  const adjustedIndexEnd = indexEnd >= matrix[rowIndex]?.length - 1 ? indexEnd : indexEnd + 2;

  const adjacentTextInPreviousRow = previousRow && previousRow.slice(adjustedIndexStart, adjustedIndexEnd);
  const adjacentTextInNextRow = nextRow && nextRow?.slice(adjustedIndexStart, adjustedIndexEnd);

  const isAdjacentToSymbolInPreviousRow = !!adjacentTextInPreviousRow && isSymbol(adjacentTextInPreviousRow);
  const isAdjacentToSymbolInNextRow = !!adjacentTextInNextRow && isSymbol(adjacentTextInNextRow);

  console.log(`[INFO] isNumberVerticallyAdjacentToSymbol`, {
    number,
    adjacentTextInPreviousRow,
    adjacentTextInNextRow,
    isAdjacentToSymbolInPreviousRow,
    isAdjacentToSymbolInNextRow
  })

  return isAdjacentToSymbolInPreviousRow || isAdjacentToSymbolInNextRow;
}

const getSolution1 = (data) => {
  const matrix = data.map(line => line.replaceAll('\\r', ''))
  const validNumbers = []

  for (let [rowIndex, row] of matrix.entries()) {
    const numbers = findNumbersInString(row)


    for (let number of numbers) {
      const indexStart = findIndexStartOfNumber(row, number)
      const indexEnd = findIndexEndOfNumber(row, number)

      if (checkIfNumberIsHorizontallyAdjacentToSymbol(row, number, indexStart, indexEnd)) {
        validNumbers.push(number)
        continue;
      }
      if (isNumberVerticallyAdjacentToSymbol(matrix, rowIndex, number, indexStart, indexEnd)) {
        validNumbers.push(number)
      }
    }
  }

  return sum(validNumbers)
}

module.exports = {
  findNumbersInString,
  findIndexStartOfNumber,
  findIndexEndOfNumber,
  isSymbol,
  isNumberVerticallyAdjacentToSymbol,
  checkIfNumberIsHorizontallyAdjacentToSymbol,
  getSolution1
}