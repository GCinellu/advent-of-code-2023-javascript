const {
  findCollidingEdges,
  createSymbolsMapping
} = require('./helpers');
const fs = require('fs');

describe('createSymbolsMapping', () => {
  it('should create a mapping of non-numeric, non-period characters with their positions', () => {
    const data = [
      '........897.......839...........651.399.............236...............................343...986...........308...............................',
      '........*................*404......*............134.....953..508=.....................*....*..........325*..........744......392............',
      '...350..847..403...-..541.....622.................*....................356.......%..95...793....................830...........*.....163.....',
    ]

    const expected = {
      '1,8': [], '1,25': [], '1,35': [], '1,64': [], '1,86': [], '1,91': [], '1,105': [],
      '2,19': [], '2,50': [], '2,81': [], '2,126': []
    }

    const result = createSymbolsMapping(data);
    expect(result).toEqual(expected);
  });
});

describe('findCollidingEdges', () => {
  it('should correctly identify and record the edges colliding with numbers', () => {
    const data = [
      '........897.......839...........651.399.............236...............................343...986...........308...............................',
      '........*................*404......*............134.....953..508=.....................*....*..........325*..........744......392............',
      '...350..847..403...-..541.....622.................*....................356.......%..95...793....................830...........*.....163.....',
    ];
    const symbolsMapping = {
      '0,2': [], '0,3': [],
      '1,1': [], '1,2': [],
      '2,4': [], '2,5': []
    };

    const expected = {
      '0,2': [], '0,3': [],
      '1,1': [], '1,2': [350],
      '2,4': [350], '2,5': [350]
    }

    const result = findCollidingEdges(data, symbolsMapping);

    expect(result).toEqual(expected);
  });
});