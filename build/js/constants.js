'use strict'

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const LINES_PER_LEVEL = 10;

const KEY = {
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  P: 80
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
  4: 470,
  5: 380,
  6: 300,
  7: 220,
  8: 130,
  9: 100,
  10: 80,
  11: 80,
  12: 80,
  13: 70,
  14: 70,
  15: 70,
  16: 50,
  17: 50,
  18: 50,
  19: 30,
  20: 30,
}
Object.freeze(LEVEL);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb25zdGFudHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IENPTFMgPSAxMDtcbmNvbnN0IFJPV1MgPSAyMDtcbmNvbnN0IEJMT0NLX1NJWkUgPSAzMDtcbmNvbnN0IExJTkVTX1BFUl9MRVZFTCA9IDEwO1xuXG5jb25zdCBLRVkgPSB7XG4gIEVTQzogMjcsXG4gIFNQQUNFOiAzMixcbiAgTEVGVDogMzcsXG4gIFVQOiAzOCxcbiAgUklHSFQ6IDM5LFxuICBET1dOOiA0MCxcbiAgUDogODBcbn1cbk9iamVjdC5mcmVlemUoS0VZKVxuXG5jb25zdCBDT0xPUlMgPSBbXG4gICdjeWFuJyxcbiAgJ2JsdWUnLFxuICAnb3JhbmdlJyxcbiAgJ3llbGxvdycsXG4gICdncmVlbicsXG4gICdwdXJwbGUnLFxuICAncmVkJ1xuXTtcbk9iamVjdC5mcmVlemUoQ09MT1JTKTtcblxuY29uc3QgU0hBUEVTID0gW1xuICBbWzAsIDAsIDAsIDBdLCBbMSwgMSwgMSwgMV0sIFswLCAwLCAwLCAwXSwgWzAsIDAsIDAsIDBdXSxcbiAgW1syLCAwLCAwXSwgWzIsIDIsIDJdLCBbMCwgMCwgMF1dLFxuICBbWzAsIDAsIDNdLCBbMywgMywgM10sIFswLCAwLCAwXV0sXG4gIFtbNCwgNF0sIFs0LCA0XV0sXG4gIFtbMCwgNSwgNV0sIFs1LCA1LCAwXSwgWzAsIDAsIDBdXSxcbiAgW1swLCA2LCAwXSwgWzYsIDYsIDZdLCBbMCwgMCwgMF1dLFxuICBbWzcsIDcsIDBdLCBbMCwgNywgN10sIFswLCAwLCAwXV1cbl07XG5PYmplY3QuZnJlZXplKENPTE9SUyk7XG5cbmNvbnN0IFBPSU5UUyA9IHtcbiAgU0lOR0xFOiAxMDAsXG4gIERPVUJMRTogMzAwLFxuICBUUklQTEU6IDUwMCxcbiAgVEVUUklTOiA4MDAsXG4gIFNPRlRfRFJPUDogMSxcbiAgSEFSRF9EUk9QOiAyXG59XG5PYmplY3QuZnJlZXplKFBPSU5UUyk7XG5cbmNvbnN0IExFVkVMID0ge1xuICAwOiA4MDAsXG4gIDE6IDcyMCxcbiAgMjogNjMwLFxuICAzOiA1NTAsXG4gIDQ6IDQ3MCxcbiAgNTogMzgwLFxuICA2OiAzMDAsXG4gIDc6IDIyMCxcbiAgODogMTMwLFxuICA5OiAxMDAsXG4gIDEwOiA4MCxcbiAgMTE6IDgwLFxuICAxMjogODAsXG4gIDEzOiA3MCxcbiAgMTQ6IDcwLFxuICAxNTogNzAsXG4gIDE2OiA1MCxcbiAgMTc6IDUwLFxuICAxODogNTAsXG4gIDE5OiAzMCxcbiAgMjA6IDMwLFxufVxuT2JqZWN0LmZyZWV6ZShMRVZFTCk7Il0sImZpbGUiOiJjb25zdGFudHMuanMifQ==
