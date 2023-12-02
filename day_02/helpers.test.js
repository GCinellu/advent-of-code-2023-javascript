const {
  extractGameRoundFromString,
  extractGameRoundsFromString,
  isValidExtraction
} = require('./helpers');

const mockStrings = [
  'Game 1: 7 blue, 9 red, 1 green; 8 green; 10 green, 5 blue, 3 red; 11 blue, 5 red, 1 green',
  'Game 2: 7 green, 3 blue; 20 blue, 4 green; 6 red, 13 blue, 2 green',
  'Game 3: 11 blue, 3 red, 1 green; 15 red, 9 blue, 3 green; 11 blue, 4 red, 4 green; 1 red, 2 green, 14 blue; 18 blue, 4 green, 10 red',
  'Game 4: 3 red, 7 blue; 3 blue, 2 red, 2 green; 2 green, 1 red, 1 blue; 3 green, 5 blue, 5 red; 7 blue, 1 green, 1 red; 2 green, 7 blue',
  'Game 5: 1 blue, 2 red, 1 green; 6 blue, 3 green, 2 red; 2 blue',
  'Game 6: 5 green, 5 red, 5 blue; 9 blue, 6 green, 8 red; 7 green, 3 red, 15 blue; 9 blue, 9 green; 10 red, 12 blue, 4 green; 9 blue, 1 red, 9 green',
  'Game 7: 8 blue, 9 green, 16 red; 9 green, 9 blue; 10 red, 5 blue, 8 green; 9 green, 17 red, 2 blue; 1 blue, 18 red, 8 green; 3 green, 8 blue, 14 red',
  'Game 8: 6 green, 8 blue, 16 red; 10 green, 1 blue, 4 red; 2 blue, 15 red, 10 green; 7 green, 9 red, 2 blue; 17 red, 4 green, 7 blue',
  'Game 9: 5 blue, 1 green, 4 red; 2 green, 6 red, 12 blue; 2 green, 7 blue, 1 red; 12 blue, 2 green, 1 red',
  'Game 10: 1 red, 16 blue, 18 green; 14 green, 13 blue; 4 green, 7 blue; 5 red, 16 blue, 11 green; 14 green, 2 red, 5 blue; 10 blue, 3 red, 6 green',
]

describe('Day 2 - helpers', () => {
  describe('extractGameRoundFromString', () => {
    it('should extract the game round from a string', () => {
      const string = mockStrings[0]

      const expected = 1
      const actual = extractGameRoundFromString(string)

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('extractGameRoundsFromString', () => {
    it('should extract the game rounds from a string', () => {
      const string = mockStrings[0]

      const expected = [
        "7 blue, 9 red, 1 green",
        "8 green", "10 green, 5 blue, 3 red",
        "11 blue, 5 red, 1 green"
      ]
      const actual = extractGameRoundsFromString(string)

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('isValidExtraction', () => {
    it('should determine if an extraction is valid based on the number of cubes extracted', () => {
      const string = mockStrings[0]

      const expected = false
      const actual = isValidExtraction(string)

      expect(actual).toEqual(expected);
    });
  });
})