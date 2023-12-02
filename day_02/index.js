const fs = require('fs');
const {getSolutionPart1,getSolutionPart2} = require("./helpers");

const lines = fs.readFileSync(__dirname + '/data', 'utf-8').split('\n');

const part1 = getSolutionPart1(lines)
const part2 = getSolutionPart2(lines)

console.log(`[INFO] part1`, part1) // 2551
console.log(`[INFO] part2`, part2) // 62811