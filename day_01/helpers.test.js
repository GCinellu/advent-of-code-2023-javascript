const {
  combineFirstAndLastDigitsFromString,
  combineFirstAndLastDigitsFromStrings,
  splitNumberWordAndDigits,
  wordToDigit,
  wordsToDigits,
  splitNumberWordsToDigits,
  getSolutionPart1,
  getSolutionPart2,
} = require('./helpers');

const mockStrings = [
  'ksvctznmffourtwovbb9four5five',
  '6nfhcklxlkg9jbqmqrrxmhn9two6',
  '9eight2six97dkth',
  'sixgjqm64dkvcccvttnts',
  'twofivefourb5four',
  'gfive2',
]

describe('Day 1 - helpers', () => {
  describe('numbersFromString', () => {
    it('should return the first and the last number from a string', () => {
      const string = '6five54'

      const expected = 64
      const actual = combineFirstAndLastDigitsFromString(string)

      expect(actual).toStrictEqual(expected);
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

  describe('numbersFromStrings', () => {
    it('should return all the first and last numbers for all the strings in an array', () => {
      const strings = [...mockStrings]

      const expected = [95, 66, 97, 64, 55, 22]
      const actual = combineFirstAndLastDigitsFromStrings(strings)

      expect(actual).toEqual(expected);
    })
  })

  describe('splitNumberWordAndDigits', () => {
    it('should return all the literal numbers and digits from a string', () => {
      const string = 'kfkjfckbhnv8threedpxhhfivepkcnfjmcpt'

      const expected = ['8', 'three', 'five']
      // const expected = ['two', '1', 'nine']
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
      const strings = [
        'two1nine',
        'eightwothree',
        'abcone2threexyz',
        'xtwone3four',
        '4nineeightseven2',
        'zoneight234',
        '7pqrstsixteen',
      ]

      const expected = [29, 83, 13, 24, 42, 14, 76]
      const actual = splitNumberWordsToDigits(strings)

      expect(actual).toEqual(expected);
    })
  })

  describe('getSolutionPart1', () => {
    it('should return the solution for the first part of the first day', () => {
      const strings = [...mockStrings]

      const expected = 399
      const actual = getSolutionPart1(strings)

      expect(actual).toEqual(expected);
    })
  })

  describe('getSolutionPart2', () => {
    it('should return the solution for the second part of the first day', () => {
      const strings = [
        'two1nine',
        'eightwothree',
        'abcone2threexyz',
        'xtwone3four',
        '4nineeightseven2',
        'zoneight234',
        '7pqrstsixteen',
      ]

      const expected = 281
      const actual = getSolutionPart2(strings)

      expect(actual).toEqual(expected);
    })
  })
})