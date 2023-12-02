const {
  sum,
} = require('./helpers');

describe('Common - helpers', () => {
  describe('sum', () => {
    it('should return the first and the last number from a string', () => {
      const cases = [
        [[1, 2, 3], 6],
        [[1, 2, 3, 4], 10],
        [[1, 2, 3, 4, 5], 15],
      ]


      for (let [numbers, expected] of cases) {
        const actual = sum(numbers)

        expect(actual).toStrictEqual(expected);
      }
    });
  });
})