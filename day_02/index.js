const fs = require('fs');
const {getSolutionPart1} = require("./helpers");

const lines = fs.readFileSync(__dirname + '/data', 'utf-8').split('\n');
const part1 = getSolutionPart1(lines)

console.log(`[INFO] part1`, part1)