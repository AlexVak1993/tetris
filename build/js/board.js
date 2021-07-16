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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJib2FyZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGllY2UgPSBudWxsO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5ncmlkID0gdGhpcy5nZXRFbXB0eUJvYXJkKCk7XG4gIH1cblxuICAvLyBjcmVhdGUgbWF0cml4IHdpdGggd2lkdGggYW5kIGhlaWdodCBmaWxsZWQgMFxuICBnZXRFbXB0eUJvYXJkKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKFxuICAgICAge2xlbmd0aDogUk9XU30sICgpID0+IEFycmF5KENPTFMpLmZpbGwoMClcbiAgICApXG4gIH1cblxuICBpbnNpZGVXYWxscyh4KSB7XG4gICAgcmV0dXJuIHggPj0gMCAmJiB4IDxDT0xTO1xuICB9XG5cbiAgYWJvdmVGbG9vcih5KSB7XG4gICAgcmV0dXJuIHkgPD0gUk9XUztcbiAgfVxuXG4gIG5vdE9jY3VwaWVkKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkW3ldICYmIHRoaXMuZ3JpZFt5XVt4XSA9PT0gMDtcbiAgfVxuXG4gIHZhbGlwKHApIHtcbiAgICByZXR1cm4gcC5zaGFwZS5ldmVyeSgocm93LCBkeSkgPT4ge1xuICAgICAgcmV0dXJuIHJvdy5ldmVyeSgodmFsdWUsIGR4KSA9PiB7XG4gICAgICAgIGxldCB4ID0gcC54ICsgZHg7XG4gICAgICAgIGxldCB5ID0gcC55ICsgZHk7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gMCB8fCAodGhpcy5pbnNpZGVXYWxscyh4KSAmJiB0aGlzLmFib3ZlRmxvb3IoeSkgJiYgdGhpcy5ub3RPY2N1cGllZCh4LCB5KSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJvdGF0ZShwKSB7XG4gICAgbGV0IGNsb25lID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwKSk7XG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHAuc2hhcGUubGVuZ3RoOyArK3kpIHtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgeTsgKyt4KSB7XG4gICAgICAgIFtwLnNoYXBlW3hdW3ldLCBwLnNoYXBlW3ldW3hdXSA9IFxuICAgICAgICBbcC5zaGFwZVt5XVt4XSwgcC5zaGFwZVt4XVt5XV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwLnNoYXBlLmZvckVhY2gocm93ID0+IHJvdy5yZXZlcnNlKCkpO1xuXG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG59Il0sImZpbGUiOiJib2FyZC5qcyJ9
