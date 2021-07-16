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

  insideWalls(x) {
    return x >= 0 && x <COLS;
  }

  aboveFloor(y) {
    return y <= ROWS;
  }

  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }

  valip(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return value === 0 || (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y))
      })
    })
  }

  rotate(p) {
    let clone = JSON.parse(JSON.stringify(p));

    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = 
        [p.shape[y][x], p.shape[x][y]]
      }
    }

    p.shape.forEach(row => row.reverse());

    return clone;
  }
}