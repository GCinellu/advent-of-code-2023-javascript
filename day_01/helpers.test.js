const {
  combineFirstAndLastDigitsFromString,
  splitNumberWordAndDigits,
  wordToDigit,
  wordsToDigits,
  splitNumberWordsToDigits,
  getSolutionPart1,
  getSolutionPart2,
} = require('./helpers');
const fs = require("fs");

const part1Mocks = [
  ['1abc2', 12],
  ['pqr3stu8vwx', 38],
  ['a1b2c3d4e5f', 15],
  ['treb7uchet', 77],
]

const part2Mocks = [
  ['two1nine', 29],
  ['eightwothree', 83],
  ['abcone2threexyz', 13],
  ['xtwone3four', 24],
  ['4nineeightseven2', 42],
  ['zoneight234', 14],
  ['7pqrstsixteen', 76],
]

describe('Day 1 - helpers', () => {
  describe('numbersFromString', () => {
    it('should return the first and the last number from a string', () => {
      for (let [string, expected] of part1Mocks) {
        const actual = combineFirstAndLastDigitsFromString(string)

        expect(actual).toStrictEqual(expected);
      }
    });

    it('should return the first number from a string if there is no last number', () => {
      const string = '6five'

      const expected = 66
      const actual = combineFirstAndLastDigitsFromString(string)

      expect(actual).toStrictEqual(expected);
    });

    it('should return 0 if there are no numbers in the string', () => {
      const string = 'test-no-numbers'

      const expected = 0
      const actual = combineFirstAndLastDigitsFromString(string)

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('splitNumberWordAndDigits', () => {
    it('should return all the literal numbers and digits from a string', () => {
      const string = 'kfkjfckbhnv8threedpxhhfivepkcnfjmcpt'

      const expected = ['8', 'three', 'five']
      const actual = splitNumberWordAndDigits(string)

      expect(actual).toEqual(expected);
    })
  })

  describe('wordToDigit', () => {
    it('should return the digit for a word', () => {
      const word = 'two'

      const expected = 2
      const actual = wordToDigit(word)

      expect(actual).toEqual(expected);
    })

    it('should return the digit for a number string', () => {
      const word = '2'

      const expected = 2
      const actual = wordToDigit(word)

      expect(actual).toEqual(expected);
    })
  })

  describe('wordsToDigit', () => {
    it('should return the digit for a list of words', () => {
      const word = ['two', '1', 'nine']

      const expected = [2, 1, 9]
      const actual = wordsToDigits(word)

      expect(actual).toEqual(expected);
    })
  })

  describe('splitNumberWordsAndDigits', () => {
    it('should return all the literal numbers and digits from a string', () => {
      const strings = part2Mocks.map(([string]) => string)
      const expected = part2Mocks.map(([, expected]) => expected)

      const actual = splitNumberWordsToDigits(strings)
      expect(actual).toEqual(expected);
    })
  })

  describe('getSolutionPart1', () => {
    it('should return the solution for the first part of the first day', () => {
      const strings = part1Mocks.map(([string]) => string)

      const expected = 142
      const actual = getSolutionPart1(strings)

      expect(actual).toEqual(expected);
    })
  })

  describe('getSolutionPart2', () => {
    it('should return the solution for the second part of the first day', () => {
      const strings = part2Mocks.map(([string]) => string)

      const expected = 281
      const actual = getSolutionPart2(strings)

      expect(actual).toEqual(expected);
    })

    it('should solve the puzzle', () => {
      const fs = require('fs');
      const strings = fs.readFileSync(__dirname + '/data', 'utf-8').split('\n');

      const expected = 53515
      const actual = getSolutionPart2(strings)

      expect(actual).toEqual(expected);
    })
  })
})