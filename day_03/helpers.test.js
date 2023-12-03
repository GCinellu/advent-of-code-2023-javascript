const {
  findNumbersInString, findIndexStartOfNumber, findIndexEndOfNumber, isSymbol, isNumberVerticallyAdjacentToSymbol,
  checkIfNumberIsHorizontallyAdjacentToSymbol, getSolution1
} = require('./helpers');

const mockDataPart1 = [
  '467..114..',
'...*......',
'..35..633.',
'......#...',
'617*......',
'.....+.58.',
'..592.....',
'......755.',
'...$.*....',
'.664.598..',
]
describe('Day 3 - helpers', () => {
  describe('findNumbersInString', () => {
    it('should return an array of numbers found in a string', () => {
      const cases = [
        ['467..114..', [467, 114]],
        ['..35..633.', [35, 633]],
        ['617*......', [617]],
        ['.....+.58.', [58]],
        ['..592.....', [592]],
        ['......755.', [755]],
        ['.664.598..', [664, 598]],
      ]

      for (const [string, expected] of cases) {
        const actual = findNumbersInString(string)
        expect(actual).toEqual(expected)
      }
    });

    it('should return an empty array if no numbers were found', () => {
      const cases = [
        '...*......',
        '......#...',
        '...$.*....',
      ]

      for (const string of cases) {
        const actual = findNumbersInString(string)
        expect(actual).toEqual([])
      }
    });
  });

  describe('findIndexStartOfNumber', () => {
    it('should return the index start of a number in a string', () => {
      const cases = [
        ['467..114..', 467, 0],
        ['467..114..', 114, 5],
        ['..35..633.', 35, 2],
        ['..35..633.', 633, 6],
        ['617*......', 617, 0],
        ['.....+.58.', 58, 7],
        ['..592.....', 592, 2],
        ['......755.', 755, 6],
        ['.664.598..', 664, 1],
        ['.664.598..', 598, 5],
      ]

      for (const [string, number, expected] of cases) {
        const actual = findIndexStartOfNumber(string, number)
        expect(actual).toEqual(expected)
      }
    });
  });

  describe('findIndexEndOfNumber', () => {
    it('should return the index start of a number in a string', () => {
      const cases = [
        ['467..114..', 467, 2],
        ['467..114..', 114, 7],
        ['..35..633.', 35, 3],
        ['..35..633.', 633, 8],
        ['617*......', 617, 2],
        ['.....+.58.', 58, 8],
        ['..592.....', 592, 4],
        ['......755.', 755, 8],
        ['.664.598..', 664, 3],
        ['.664.598..', 598, 7],
      ]

      for (const [string, number, expected] of cases) {
        const actual = findIndexEndOfNumber(string, number)
        expect(actual).toEqual(expected)
      }
    });
  });

  describe('isSymbol', () => {
    it('should return true if a character is a symbol', () => {
      const cases = [
        ['*', true],
        ['#', true],
        ['+', true],
        ['$', true],
        ['a', false],
        ['1', false],
      ]

      for (const [character, expected] of cases) {
        const actual = isSymbol(character)
        expect(actual).toEqual(expected)
      }
    });

    it('should return false if symbol is a dot', () => {
      const actual = isSymbol('.')
      expect(actual).toEqual(false)
    });
  });

  describe('checkIfNumberIsHorizontallyAdjacentToSymbol', () => {
    it('should return true if a number is horizontally adjacent to a symbol', () => {
      const cases = [
        ['467(.114..', 467, 0, 2, true],
        ['467.)114..', 114, 5, 7, true],
        ['..35#.633.', 35, 2, 3, true],
        ['..35.&633.', 633, 6, 8, true],
        ['617*......', 617, 0, 2, true],
        ['.....++58.', 58, 7, 8, true],
        ['..592,....', 592, 2, 4, true],
        ['.....;755.', 755, 6, 8, true],
        ['.664-598..', 664, 1, 3, true],
        ['.664@598..', 598, 5, 7, true],
      ]

      for (const [string, number, indexStart, indexEnd, expected] of cases) {
        const actual = checkIfNumberIsHorizontallyAdjacentToSymbol(string, number, indexStart, indexEnd)
        expect(actual).toEqual(expected)
      }
    });

    it('should return false if a number is horizontally adjacent to a symbol', () => {
      const cases = [
        ['467..114..', 467, 0, 2, false],
        ['467..114..', 114, 5, 7, false],
        ['..35..633.', 35, 2, 3, false],
        ['..35..633.', 633, 6, 8, false],
        ['617*......', 617, 0, 2, true],
        ['.....+.58.', 58, 7, 8, false],
        ['..592.....', 592, 2, 4, false],
        ['......755.', 755, 6, 8, false],
        ['.664.598..', 664, 1, 3, false],
        ['.664.598..', 598, 5, 7, false],
      ]

      for (const [string, number, indexStart, indexEnd, expected] of cases) {
        const actual = checkIfNumberIsHorizontallyAdjacentToSymbol(string, number, indexStart, indexEnd)
        expect(actual).toEqual(expected)
      }
    });
  });

  describe('isNumberVerticallyAdjacentToSymbol', () => {
    it('should return true if a number is vertically adjacent to a symbol', () => {
      const cases = [
        [mockDataPart1, 0, 467, 0, 2, true],
        [mockDataPart1, 2, 35, 2, 3, true],
        [mockDataPart1, 2, 633, 6, 8, true],
      ]

      for (const [matrix, row, number, indexStart, indexEnd, expected] of cases) {
        const actual = isNumberVerticallyAdjacentToSymbol(matrix, row, number, indexStart, indexEnd)
        expect(actual).toEqual(expected)
      }
    });

    it('should return false if a number is not vertically adjacent to a symbol', () => {
      const cases = [
        [mockDataPart1, 0, 114, 5, 7, false],
        [mockDataPart1, 5, 58, 7, 8, false],
      ]

      for (const [matrix, row, number, indexStart, indexEnd, expected] of cases) {
        const actual = isNumberVerticallyAdjacentToSymbol(matrix, row, number, indexStart, indexEnd)
        expect(actual).toEqual(expected)
      }
    })
  });

  describe('getSolution1', () => {
    it('should return the solution for the first test of the day', () => {
      const expected = 4361
      const actual = getSolution1(mockDataPart1)
      expect(actual).toEqual(expected)
    });
  });
})