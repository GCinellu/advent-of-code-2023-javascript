const {sum, product} = require('../common/helpers');

const createSymbolsMapping = (data) => {
  const chars = {}
  for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < data[0].length; columnIndex++) {
      if (!'0123456789.'.includes(data[rowIndex][columnIndex])) {
        chars[`${rowIndex},${columnIndex}`] = [];
      }
    }
  }
  return chars
}

const findCollidingEdges = (data, symbolsMapping) => {
  const symbolsCoordinates = { ...symbolsMapping };

  data.forEach((row, rowIndex) => {
    const matches = [...row.matchAll(/\d+/g)]
    matches.forEach(({ 0: match, index }) => {
      Array.from({ length: 3 }, (_, i) => rowIndex + i - 1)
        .flatMap(
          rowEdge => Array.from({ length: match.length + 2 },
            (_, j) => `${rowEdge},${index + j - 1}`)
        )
        .forEach(edge => {
          symbolsCoordinates[edge] && symbolsCoordinates[edge].push(parseInt(match, 10));
        });
    });
  });

  return symbolsCoordinates;
}
const getSolutions = (data) => {
  const symbolsMapping = createSymbolsMapping(data);
  const collidingEdges = findCollidingEdges(data, symbolsMapping);

  const sumOfCollidingEdges = sum(Object.values(collidingEdges).flat())
  const sumOfProducts = Object.values(collidingEdges).reduce((total, p) => p.length === 2 ? total + product(p) : total, 0);

  return {
    part1: sumOfCollidingEdges,
    part2: sumOfProducts
  }
}

module.exports = {
  getSolutions,
  findCollidingEdges,
  createSymbolsMapping
}