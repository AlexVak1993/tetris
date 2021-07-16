'use strict'

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

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

const SHAPES = [
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
  [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
  [[4, 4], [4, 4]],
  [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
]
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb25zdGFudHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IENPTFMgPSAxMDtcbmNvbnN0IFJPV1MgPSAyMDtcbmNvbnN0IEJMT0NLX1NJWkUgPSAzMDtcblxuY29uc3QgS0VZID0ge1xuICBTUEFDRTogMzIsXG4gIExFRlQ6IDM3LFxuICBVUDogMzgsXG4gIFJJR0hUOiAzOSxcbiAgRE9XTjogNDBcbn1cbk9iamVjdC5mcmVlemUoS0VZKVxuXG5jb25zdCBDT0xPUlMgPSBbXG4gICdjeWFuJyxcbiAgJ2JsdWUnLFxuICAnb3JhbmdlJyxcbiAgJ3llbGxvdycsXG4gICdncmVlbicsXG4gICdwdXJwbGUnLFxuICAncmVkJ1xuXTtcblxuY29uc3QgU0hBUEVTID0gW1xuICBbWzAsIDAsIDAsIDBdLCBbMSwgMSwgMSwgMV0sIFswLCAwLCAwLCAwXSwgWzAsIDAsIDAsIDBdXSxcbiAgW1syLCAwLCAwXSwgWzIsIDIsIDJdLCBbMCwgMCwgMF1dLFxuICBbWzAsIDAsIDNdLCBbMywgMywgM10sIFswLCAwLCAwXV0sXG4gIFtbNCwgNF0sIFs0LCA0XV0sXG4gIFtbMCwgNSwgNV0sIFs1LCA1LCAwXSwgWzAsIDAsIDBdXSxcbiAgW1swLCA2LCAwXSwgWzYsIDYsIDZdLCBbMCwgMCwgMF1dLFxuICBbWzcsIDcsIDBdLCBbMCwgNywgN10sIFswLCAwLCAwXV1cbl0iXSwiZmlsZSI6ImNvbnN0YW50cy5qcyJ9
