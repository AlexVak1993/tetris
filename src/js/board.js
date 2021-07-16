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
