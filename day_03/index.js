const fs= require('fs');
const {
  getSolutions,
} = require("./helpers");

const lines = fs.readFileSync(__dirname + '/data', 'utf-8').replaceAll(/(\r)/gm, "").split('\n');
console.log('Solutions =>', getSolutions(lines)) // { part1: 556057, part2: 82824352 }
// solutions are pretty similar
// assumptions:
// - Numbers always only touch no more than one symbol
// - Only asterisks can touch two numbers

