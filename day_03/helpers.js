const {sum, product} = require("../common/helpers");

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

    matches.forEach(match => {
      let edges = [];

      [rowIndex - 1, rowIndex, rowIndex + 1].forEach(rowEdge => {
        for (let character = match.index - 1; character <= match.index + match[0].length; character++) {
          edges.push(`${rowEdge},${character}`);
        }
      });

      edges.forEach(edge => {
        if (chars.hasOwnProperty(edge)) {
          chars[edge].push(parseInt(match[0], 10));
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