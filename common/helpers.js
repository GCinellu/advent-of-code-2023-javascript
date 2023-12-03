function sum(numbers) {
  return numbers.reduce((acc, number) => acc + number, 0)
}

function product(arr) {
  return arr.reduce((acc, val) => acc * val, 1);
}

module.exports = {
  sum,
  product
}