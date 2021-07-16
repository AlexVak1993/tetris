'use strict'

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const LINES_PER_LEVEL = 10;

const KEY = {
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}
Object.freeze(KEY)

const COLORS = [
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red'
];
Object.freeze(COLORS);

const SHAPES = [
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
  [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
  [[4, 4], [4, 4]],
  [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
];
Object.freeze(COLORS);

const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2
}
Object.freeze(POINTS);

const LEVEL = {
  0: 800,
  1: 720,
  2: 630,
  3: 550,
}
Object.freeze(LEVEL);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb25zdGFudHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IENPTFMgPSAxMDtcbmNvbnN0IFJPV1MgPSAyMDtcbmNvbnN0IEJMT0NLX1NJWkUgPSAzMDtcblxuY29uc3QgTElORVNfUEVSX0xFVkVMID0gMTA7XG5cbmNvbnN0IEtFWSA9IHtcbiAgU1BBQ0U6IDMyLFxuICBMRUZUOiAzNyxcbiAgVVA6IDM4LFxuICBSSUdIVDogMzksXG4gIERPV046IDQwXG59XG5PYmplY3QuZnJlZXplKEtFWSlcblxuY29uc3QgQ09MT1JTID0gW1xuICAnY3lhbicsXG4gICdibHVlJyxcbiAgJ29yYW5nZScsXG4gICd5ZWxsb3cnLFxuICAnZ3JlZW4nLFxuICAncHVycGxlJyxcbiAgJ3JlZCdcbl07XG5PYmplY3QuZnJlZXplKENPTE9SUyk7XG5cbmNvbnN0IFNIQVBFUyA9IFtcbiAgW1swLCAwLCAwLCAwXSwgWzEsIDEsIDEsIDFdLCBbMCwgMCwgMCwgMF0sIFswLCAwLCAwLCAwXV0sXG4gIFtbMiwgMCwgMF0sIFsyLCAyLCAyXSwgWzAsIDAsIDBdXSxcbiAgW1swLCAwLCAzXSwgWzMsIDMsIDNdLCBbMCwgMCwgMF1dLFxuICBbWzQsIDRdLCBbNCwgNF1dLFxuICBbWzAsIDUsIDVdLCBbNSwgNSwgMF0sIFswLCAwLCAwXV0sXG4gIFtbMCwgNiwgMF0sIFs2LCA2LCA2XSwgWzAsIDAsIDBdXSxcbiAgW1s3LCA3LCAwXSwgWzAsIDcsIDddLCBbMCwgMCwgMF1dXG5dO1xuT2JqZWN0LmZyZWV6ZShDT0xPUlMpO1xuXG5jb25zdCBQT0lOVFMgPSB7XG4gIFNJTkdMRTogMTAwLFxuICBET1VCTEU6IDMwMCxcbiAgVFJJUExFOiA1MDAsXG4gIFRFVFJJUzogODAwLFxuICBTT0ZUX0RST1A6IDEsXG4gIEhBUkRfRFJPUDogMlxufVxuT2JqZWN0LmZyZWV6ZShQT0lOVFMpO1xuXG5jb25zdCBMRVZFTCA9IHtcbiAgMDogODAwLFxuICAxOiA3MjAsXG4gIDI6IDYzMCxcbiAgMzogNTUwLFxufVxuT2JqZWN0LmZyZWV6ZShMRVZFTCk7Il0sImZpbGUiOiJjb25zdGFudHMuanMifQ==
