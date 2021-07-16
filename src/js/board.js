class Board {
  constructor() {
    this.piece = null;
  }

  reset() {
    this.grid = this.getEmptyBoard();
  }

  // create matrix with width and height filled 0
  getEmptyBoard() {
    return Array.from(
      {length: ROWS}, () => Array(COLS).fill(0)
    )
  }

  valip(p) {
    return true
  }
}