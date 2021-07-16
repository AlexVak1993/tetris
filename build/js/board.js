class Board {
  ctx;
  ctxNext;
  grid;
  piece;
  next;
  requestId;
  time;

  constructor(ctx, ctxNext) {
    this.ctx = ctx;
    this.ctxNext = ctxNext;
    this.init();
  }

  init() {
    // board canvas size
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;

    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  reset() {
    this.grid = this.getEmptyBoard();
    this.piece = new Piece(this.ctx);
    this.piece.setStartPosition();
    this.getNewPiece();
  }

  // create matrix with width and height filled 0
  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  getNewPiece() {
    this.next = new Piece(this.ctxNext);
    this.ctxNext.clearRect(
      0,
      0,
      this.ctxNext.canvas.width,
      this.ctxNext.canvas.height
    );
    this.next.draw();
  }

  insideWalls(x) {
    return x >= 0 && x < COLS;
  }

  aboveFloor(y) {
    return y <= ROWS;
  }

  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }

  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return (
          value === 0 ||
          (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y))
        );
      });
    });
  }

  rotate(piece) {
    // Clone with JSON for immutability.
    let p = JSON.parse(JSON.stringify(piece));

    // Transpose matrix
    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
      }
    }

    // Reverse the order of the columns.
    p.shape.forEach(row => row.reverse());
    return p;
  }

  draw() {
    this.piece.draw();
    this.drawBoard();
  }

  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  clearLines() {
    let lines = 0;

    this.grid.forEach((row, y) => {
      // if all cell filled in row
      if (row.every((value) => value > 0)) {
        lines++;

        // remove this row
        this.grid.splice(y, 1);

        // add at the top new cell row
        this.grid.unshift(Array(COLS).fill(0));
      }
    });

    if (lines > 0) {
      account.score += this.getLineClearPoints(lines);
      account.lines += lines;
    
      // If we have reached the lines for next level
      if (account.lines >= LINES_PER_LEVEL) {
        // Goto next level
        account.level++;  
        // Remove lines so we start working for the next level
        account.lines -= LINES_PER_LEVEL;
        // Increase speed of game
        time.level = LEVEL[account.level];
      }
    }
  }

  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }

  drop() {
    let p = moves[KEY.DOWN](this.piece);
    if (this.valid(p)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.clearLines();
      console.table(this.grid);

      if (this.piece.y === 0) {
        // Game over
        return false;
      }

      this.piece = this.next;
      this.piece.ctx = this.ctx;
      this.piece.setStartPosition();
      this.getNewPiece()
    }

    return true
  }

  getLineClearPoints(lines, level) {
    const lineClearPoints =
    lines === 1
      ? POINTS.SINGLE
      : lines === 2
      ? POINTS.DOUBLE
      : lines === 3
      ? POINTS.TRIPLE
      : lines === 4
      ? POINTS.TETRIS
      : 0;

    return (level + 1) * lineClearPoints;
  }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJib2FyZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCb2FyZCB7XG4gIGN0eDtcbiAgY3R4TmV4dDtcbiAgZ3JpZDtcbiAgcGllY2U7XG4gIG5leHQ7XG4gIHJlcXVlc3RJZDtcbiAgdGltZTtcblxuICBjb25zdHJ1Y3RvcihjdHgsIGN0eE5leHQpIHtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLmN0eE5leHQgPSBjdHhOZXh0O1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBib2FyZCBjYW52YXMgc2l6ZVxuICAgIHRoaXMuY3R4LmNhbnZhcy53aWR0aCA9IENPTFMgKiBCTE9DS19TSVpFO1xuICAgIHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQgPSBST1dTICogQkxPQ0tfU0laRTtcblxuICAgIHRoaXMuY3R4LnNjYWxlKEJMT0NLX1NJWkUsIEJMT0NLX1NJWkUpO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5ncmlkID0gdGhpcy5nZXRFbXB0eUJvYXJkKCk7XG4gICAgdGhpcy5waWVjZSA9IG5ldyBQaWVjZSh0aGlzLmN0eCk7XG4gICAgdGhpcy5waWVjZS5zZXRTdGFydFBvc2l0aW9uKCk7XG4gICAgdGhpcy5nZXROZXdQaWVjZSgpO1xuICB9XG5cbiAgLy8gY3JlYXRlIG1hdHJpeCB3aXRoIHdpZHRoIGFuZCBoZWlnaHQgZmlsbGVkIDBcbiAgZ2V0RW1wdHlCb2FyZCgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogUk9XUyB9LCAoKSA9PiBBcnJheShDT0xTKS5maWxsKDApKTtcbiAgfVxuXG4gIGdldE5ld1BpZWNlKCkge1xuICAgIHRoaXMubmV4dCA9IG5ldyBQaWVjZSh0aGlzLmN0eE5leHQpO1xuICAgIHRoaXMuY3R4TmV4dC5jbGVhclJlY3QoXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHRoaXMuY3R4TmV4dC5jYW52YXMud2lkdGgsXG4gICAgICB0aGlzLmN0eE5leHQuY2FudmFzLmhlaWdodFxuICAgICk7XG4gICAgdGhpcy5uZXh0LmRyYXcoKTtcbiAgfVxuXG4gIGluc2lkZVdhbGxzKHgpIHtcbiAgICByZXR1cm4geCA+PSAwICYmIHggPCBDT0xTO1xuICB9XG5cbiAgYWJvdmVGbG9vcih5KSB7XG4gICAgcmV0dXJuIHkgPD0gUk9XUztcbiAgfVxuXG4gIG5vdE9jY3VwaWVkKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkW3ldICYmIHRoaXMuZ3JpZFt5XVt4XSA9PT0gMDtcbiAgfVxuXG4gIHZhbGlkKHApIHtcbiAgICByZXR1cm4gcC5zaGFwZS5ldmVyeSgocm93LCBkeSkgPT4ge1xuICAgICAgcmV0dXJuIHJvdy5ldmVyeSgodmFsdWUsIGR4KSA9PiB7XG4gICAgICAgIGxldCB4ID0gcC54ICsgZHg7XG4gICAgICAgIGxldCB5ID0gcC55ICsgZHk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgdmFsdWUgPT09IDAgfHxcbiAgICAgICAgICAodGhpcy5pbnNpZGVXYWxscyh4KSAmJiB0aGlzLmFib3ZlRmxvb3IoeSkgJiYgdGhpcy5ub3RPY2N1cGllZCh4LCB5KSlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcm90YXRlKHBpZWNlKSB7XG4gICAgLy8gQ2xvbmUgd2l0aCBKU09OIGZvciBpbW11dGFiaWxpdHkuXG4gICAgbGV0IHAgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBpZWNlKSk7XG5cbiAgICAvLyBUcmFuc3Bvc2UgbWF0cml4XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBwLnNoYXBlLmxlbmd0aDsgKyt5KSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHk7ICsreCkge1xuICAgICAgICBbcC5zaGFwZVt4XVt5XSwgcC5zaGFwZVt5XVt4XV0gPSBbcC5zaGFwZVt5XVt4XSwgcC5zaGFwZVt4XVt5XV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV2ZXJzZSB0aGUgb3JkZXIgb2YgdGhlIGNvbHVtbnMuXG4gICAgcC5zaGFwZS5mb3JFYWNoKHJvdyA9PiByb3cucmV2ZXJzZSgpKTtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgdGhpcy5waWVjZS5kcmF3KCk7XG4gICAgdGhpcy5kcmF3Qm9hcmQoKTtcbiAgfVxuXG4gIGRyYXdCb2FyZCgpIHtcbiAgICB0aGlzLmdyaWQuZm9yRWFjaCgocm93LCB5KSA9PiB7XG4gICAgICByb3cuZm9yRWFjaCgodmFsdWUsIHgpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IENPTE9SU1t2YWx1ZV07XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoeCwgeSwgMSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJMaW5lcygpIHtcbiAgICBsZXQgbGluZXMgPSAwO1xuXG4gICAgdGhpcy5ncmlkLmZvckVhY2goKHJvdywgeSkgPT4ge1xuICAgICAgLy8gaWYgYWxsIGNlbGwgZmlsbGVkIGluIHJvd1xuICAgICAgaWYgKHJvdy5ldmVyeSgodmFsdWUpID0+IHZhbHVlID4gMCkpIHtcbiAgICAgICAgbGluZXMrKztcblxuICAgICAgICAvLyByZW1vdmUgdGhpcyByb3dcbiAgICAgICAgdGhpcy5ncmlkLnNwbGljZSh5LCAxKTtcblxuICAgICAgICAvLyBhZGQgYXQgdGhlIHRvcCBuZXcgY2VsbCByb3dcbiAgICAgICAgdGhpcy5ncmlkLnVuc2hpZnQoQXJyYXkoQ09MUykuZmlsbCgwKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobGluZXMgPiAwKSB7XG4gICAgICBhY2NvdW50LnNjb3JlICs9IHRoaXMuZ2V0TGluZUNsZWFyUG9pbnRzKGxpbmVzKTtcbiAgICAgIGFjY291bnQubGluZXMgKz0gbGluZXM7XG4gICAgXG4gICAgICAvLyBJZiB3ZSBoYXZlIHJlYWNoZWQgdGhlIGxpbmVzIGZvciBuZXh0IGxldmVsXG4gICAgICBpZiAoYWNjb3VudC5saW5lcyA+PSBMSU5FU19QRVJfTEVWRUwpIHtcbiAgICAgICAgLy8gR290byBuZXh0IGxldmVsXG4gICAgICAgIGFjY291bnQubGV2ZWwrKzsgIFxuICAgICAgICAvLyBSZW1vdmUgbGluZXMgc28gd2Ugc3RhcnQgd29ya2luZyBmb3IgdGhlIG5leHQgbGV2ZWxcbiAgICAgICAgYWNjb3VudC5saW5lcyAtPSBMSU5FU19QRVJfTEVWRUw7XG4gICAgICAgIC8vIEluY3JlYXNlIHNwZWVkIG9mIGdhbWVcbiAgICAgICAgdGltZS5sZXZlbCA9IExFVkVMW2FjY291bnQubGV2ZWxdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZyZWV6ZSgpIHtcbiAgICB0aGlzLnBpZWNlLnNoYXBlLmZvckVhY2goKHJvdywgeSkgPT4ge1xuICAgICAgcm93LmZvckVhY2goKHZhbHVlLCB4KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgICB0aGlzLmdyaWRbeSArIHRoaXMucGllY2UueV1beCArIHRoaXMucGllY2UueF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBkcm9wKCkge1xuICAgIGxldCBwID0gbW92ZXNbS0VZLkRPV05dKHRoaXMucGllY2UpO1xuICAgIGlmICh0aGlzLnZhbGlkKHApKSB7XG4gICAgICB0aGlzLnBpZWNlLm1vdmUocCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZnJlZXplKCk7XG4gICAgICB0aGlzLmNsZWFyTGluZXMoKTtcbiAgICAgIGNvbnNvbGUudGFibGUodGhpcy5ncmlkKTtcblxuICAgICAgaWYgKHRoaXMucGllY2UueSA9PT0gMCkge1xuICAgICAgICAvLyBHYW1lIG92ZXJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBpZWNlID0gdGhpcy5uZXh0O1xuICAgICAgdGhpcy5waWVjZS5jdHggPSB0aGlzLmN0eDtcbiAgICAgIHRoaXMucGllY2Uuc2V0U3RhcnRQb3NpdGlvbigpO1xuICAgICAgdGhpcy5nZXROZXdQaWVjZSgpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGdldExpbmVDbGVhclBvaW50cyhsaW5lcywgbGV2ZWwpIHtcbiAgICBjb25zdCBsaW5lQ2xlYXJQb2ludHMgPVxuICAgIGxpbmVzID09PSAxXG4gICAgICA/IFBPSU5UUy5TSU5HTEVcbiAgICAgIDogbGluZXMgPT09IDJcbiAgICAgID8gUE9JTlRTLkRPVUJMRVxuICAgICAgOiBsaW5lcyA9PT0gM1xuICAgICAgPyBQT0lOVFMuVFJJUExFXG4gICAgICA6IGxpbmVzID09PSA0XG4gICAgICA/IFBPSU5UUy5URVRSSVNcbiAgICAgIDogMDtcblxuICAgIHJldHVybiAobGV2ZWwgKyAxKSAqIGxpbmVDbGVhclBvaW50cztcbiAgfVxufVxuIl0sImZpbGUiOiJib2FyZC5qcyJ9
