const {sum, product} = require("../common/helpers");
const findNumbersInString = (string) => {
  const regex = new RegExp(/\d+/g)
  const numbers = string.match(regex)
  return numbers?.map(number => parseInt(number)) ?? []
}

const findIndexStartOfNumber = (string, number) => {
  const regex = new RegExp(`(?<!\\d)${number}(?!\\d)`);
  return string.search(regex);
}

function findIndexEndOfNumber(string, number) {
  const numberString = number.toString();
  const regex = new RegExp(`(?<!\\d)${number}(?!\\d)`);

  const indexEnd = string.search(regex);
  if (indexEnd === -1) {
    return -1;
  }

  return indexEnd + numberString.length - 1;
}

const isSymbol = (character) => {
  return !!character.replaceAll('.', '').match(/\W/);
}

const checkIfNumberIsHorizontallyAdjacentToSymbol = (fullString, inputNumber, indexStart, indexEnd, rowIndex) => {
  const characterBefore = fullString[indexStart - 1] ?? '';
  const characterAfter = fullString[indexEnd + 1] ?? '';

  const isAdjacentToSymbolBefore = characterBefore && isSymbol(characterBefore);
  const isAdjacentToSymbolAfter = characterAfter && isSymbol(characterAfter);

  return isAdjacentToSymbolBefore || isAdjacentToSymbolAfter;
}

const isNumberVerticallyAdjacentToSymbol = (matrix, rowIndex, number, indexStart, indexEnd) => {
  const previousRow = rowIndex > 0 ? matrix[rowIndex - 1] : '';
  const nextRow = rowIndex < matrix.length - 1 ? matrix[rowIndex + 1] : '';

  const adjustedIndexStart = indexStart === 0 ? 0 : indexStart - 1;
  const adjustedIndexEnd = indexEnd >= matrix[rowIndex]?.length - 1 ? indexEnd : indexEnd + 2;

  const adjacentTextInPreviousRow = previousRow && previousRow.slice(adjustedIndexStart, adjustedIndexEnd);
  const adjacentTextInNextRow = nextRow && nextRow?.slice(adjustedIndexStart, adjustedIndexEnd);

  const isAdjacentToSymbolInPreviousRow = !!adjacentTextInPreviousRow && isSymbol(adjacentTextInPreviousRow);
  const isAdjacentToSymbolInNextRow = !!adjacentTextInNextRow && isSymbol(adjacentTextInNextRow);

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
      if (checkIfNumberIsHorizontallyAdjacentToSymbol(row, number, indexStart, indexEnd, rowIndex)) {
        validNumbers.push(number)
        continue;
      }

      if (isNumberVerticallyAdjacentToSymbol(matrix, rowIndex, number, indexStart, indexEnd)) {
        validNumbers.push(number)
        continue
      }
    }
  }

  return sum(validNumbers)
}

const getSolutions = (data) => {
  const length = data.length;
  const chars = {}
  for (let rowIndex = 0; rowIndex < length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < length; columnIndex++) {
      if (!'0123456789.'.includes(data[rowIndex][columnIndex])) {
        chars[`${rowIndex},${columnIndex}`] = [];
      }
    }
  }

  data.forEach((row, rowIndex) => {
    const matches = [...row.matchAll(/\d+/g)];

    matches.forEach(n => {
      let edge = [];

      [rowIndex - 1, rowIndex, rowIndex + 1].forEach(rowEdge => {
        for (let character = n.index - 1; character <= n.index + n[0].length; character++) {
          edge.push(`${rowEdge},${character}`);
        }
      });

      edge.forEach(o => {
        if (chars.hasOwnProperty(o)) {
          chars[o].push(parseInt(n[0]));
        }
      });
    });
  });

  const sumOfSums = Object.values(chars).reduce((total, p) => total + sum(p), 0)
  const sumOfProducts = Object.values(chars).reduce((total, p) => p.length === 2 ? total + product(p) : total, 0);

  return {
    part1: sumOfSums,
    part2: sumOfProducts
  }
}

module.exports = {
  getSolutions,
}