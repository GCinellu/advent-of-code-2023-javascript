const fs= require('fs');
const {
  getSolutionPart1, getSolution1,
  // getSolutionPart2
} = require("./helpers");

const lines = fs.readFileSync(__dirname + '/data', 'utf-8').split('\n');
const part1 = getSolution1(lines) // 556057
// const part2 = getSolutionPart2(lines) // 53515

console.log('[PART 1] =>', part1)
// console.log('[PART 2] =>', part2)