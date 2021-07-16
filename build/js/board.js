class Board {
  constructor(ctx, ctxNext) {
    this.ctx = ctx;
    this.ctxNext = ctxNext;
    this.piece = null;
    this.next = null;
  }

  reset() {
    this.grid = this.getEmptyBoard();
    this.piece = new Piece(this.ctx);
    this.piece.setStartPosition();
    this.getNewPiece;
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

  rotate(p) {
    let clone = JSON.parse(JSON.stringify(p));

    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
      }
    }

    p.shape.forEach((row) => row.reverse());

    return clone;
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

      this.piece = new Piece(this.ctx);
      this.piece.setStartPosition();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJib2FyZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKGN0eCwgY3R4TmV4dCkge1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuY3R4TmV4dCA9IGN0eE5leHQ7XG4gICAgdGhpcy5waWVjZSA9IG51bGw7XG4gICAgdGhpcy5uZXh0ID0gbnVsbDtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZ3JpZCA9IHRoaXMuZ2V0RW1wdHlCb2FyZCgpO1xuICAgIHRoaXMucGllY2UgPSBuZXcgUGllY2UodGhpcy5jdHgpO1xuICAgIHRoaXMucGllY2Uuc2V0U3RhcnRQb3NpdGlvbigpO1xuICAgIHRoaXMuZ2V0TmV3UGllY2U7XG4gIH1cblxuICAvLyBjcmVhdGUgbWF0cml4IHdpdGggd2lkdGggYW5kIGhlaWdodCBmaWxsZWQgMFxuICBnZXRFbXB0eUJvYXJkKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBST1dTIH0sICgpID0+IEFycmF5KENPTFMpLmZpbGwoMCkpO1xuICB9XG5cbiAgZ2V0TmV3UGllY2UoKSB7XG4gICAgdGhpcy5uZXh0ID0gbmV3IFBpZWNlKHRoaXMuY3R4TmV4dCk7XG4gICAgdGhpcy5jdHhOZXh0LmNsZWFyUmVjdChcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgdGhpcy5jdHhOZXh0LmNhbnZhcy53aWR0aCxcbiAgICAgIHRoaXMuY3R4TmV4dC5jYW52YXMuaGVpZ2h0XG4gICAgKTtcbiAgICB0aGlzLm5leHQuZHJhdygpO1xuICB9XG5cbiAgaW5zaWRlV2FsbHMoeCkge1xuICAgIHJldHVybiB4ID49IDAgJiYgeCA8IENPTFM7XG4gIH1cblxuICBhYm92ZUZsb29yKHkpIHtcbiAgICByZXR1cm4geSA8PSBST1dTO1xuICB9XG5cbiAgbm90T2NjdXBpZWQoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmdyaWRbeV0gJiYgdGhpcy5ncmlkW3ldW3hdID09PSAwO1xuICB9XG5cbiAgdmFsaWQocCkge1xuICAgIHJldHVybiBwLnNoYXBlLmV2ZXJ5KChyb3csIGR5KSA9PiB7XG4gICAgICByZXR1cm4gcm93LmV2ZXJ5KCh2YWx1ZSwgZHgpID0+IHtcbiAgICAgICAgbGV0IHggPSBwLnggKyBkeDtcbiAgICAgICAgbGV0IHkgPSBwLnkgKyBkeTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB2YWx1ZSA9PT0gMCB8fFxuICAgICAgICAgICh0aGlzLmluc2lkZVdhbGxzKHgpICYmIHRoaXMuYWJvdmVGbG9vcih5KSAmJiB0aGlzLm5vdE9jY3VwaWVkKHgsIHkpKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByb3RhdGUocCkge1xuICAgIGxldCBjbG9uZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocCkpO1xuXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBwLnNoYXBlLmxlbmd0aDsgKyt5KSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHk7ICsreCkge1xuICAgICAgICBbcC5zaGFwZVt4XVt5XSwgcC5zaGFwZVt5XVt4XV0gPSBbcC5zaGFwZVt5XVt4XSwgcC5zaGFwZVt4XVt5XV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcC5zaGFwZS5mb3JFYWNoKChyb3cpID0+IHJvdy5yZXZlcnNlKCkpO1xuXG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICB0aGlzLnBpZWNlLmRyYXcoKTtcbiAgICB0aGlzLmRyYXdCb2FyZCgpO1xuICB9XG5cbiAgZHJhd0JvYXJkKCkge1xuICAgIHRoaXMuZ3JpZC5mb3JFYWNoKChyb3csIHkpID0+IHtcbiAgICAgIHJvdy5mb3JFYWNoKCh2YWx1ZSwgeCkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gQ09MT1JTW3ZhbHVlXTtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh4LCB5LCAxLCAxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjbGVhckxpbmVzKCkge1xuICAgIGxldCBsaW5lcyA9IDA7XG5cbiAgICB0aGlzLmdyaWQuZm9yRWFjaCgocm93LCB5KSA9PiB7XG4gICAgICAvLyBpZiBhbGwgY2VsbCBmaWxsZWQgaW4gcm93XG4gICAgICBpZiAocm93LmV2ZXJ5KCh2YWx1ZSkgPT4gdmFsdWUgPiAwKSkge1xuICAgICAgICBsaW5lcysrO1xuXG4gICAgICAgIC8vIHJlbW92ZSB0aGlzIHJvd1xuICAgICAgICB0aGlzLmdyaWQuc3BsaWNlKHksIDEpO1xuXG4gICAgICAgIC8vIGFkZCBhdCB0aGUgdG9wIG5ldyBjZWxsIHJvd1xuICAgICAgICB0aGlzLmdyaWQudW5zaGlmdChBcnJheShDT0xTKS5maWxsKDApKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChsaW5lcyA+IDApIHtcbiAgICAgIGFjY291bnQuc2NvcmUgKz0gdGhpcy5nZXRMaW5lQ2xlYXJQb2ludHMobGluZXMpO1xuICAgIH1cbiAgfVxuXG4gIGZyZWV6ZSgpIHtcbiAgICB0aGlzLnBpZWNlLnNoYXBlLmZvckVhY2goKHJvdywgeSkgPT4ge1xuICAgICAgcm93LmZvckVhY2goKHZhbHVlLCB4KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgICB0aGlzLmdyaWRbeSArIHRoaXMucGllY2UueV1beCArIHRoaXMucGllY2UueF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBkcm9wKCkge1xuICAgIGxldCBwID0gbW92ZXNbS0VZLkRPV05dKHRoaXMucGllY2UpO1xuICAgIGlmICh0aGlzLnZhbGlkKHApKSB7XG4gICAgICB0aGlzLnBpZWNlLm1vdmUocCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZnJlZXplKCk7XG4gICAgICB0aGlzLmNsZWFyTGluZXMoKTtcbiAgICAgIGNvbnNvbGUudGFibGUodGhpcy5ncmlkKTtcblxuICAgICAgaWYgKHRoaXMucGllY2UueSA9PT0gMCkge1xuICAgICAgICAvLyBHYW1lIG92ZXJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBpZWNlID0gbmV3IFBpZWNlKHRoaXMuY3R4KTtcbiAgICAgIHRoaXMucGllY2Uuc2V0U3RhcnRQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBnZXRMaW5lQ2xlYXJQb2ludHMobGluZXMsIGxldmVsKSB7XG4gICAgY29uc3QgbGluZUNsZWFyUG9pbnRzID1cbiAgICBsaW5lcyA9PT0gMVxuICAgICAgPyBQT0lOVFMuU0lOR0xFXG4gICAgICA6IGxpbmVzID09PSAyXG4gICAgICA/IFBPSU5UUy5ET1VCTEVcbiAgICAgIDogbGluZXMgPT09IDNcbiAgICAgID8gUE9JTlRTLlRSSVBMRVxuICAgICAgOiBsaW5lcyA9PT0gNFxuICAgICAgPyBQT0lOVFMuVEVUUklTXG4gICAgICA6IDA7XG5cbiAgICByZXR1cm4gKGxldmVsICsgMSkgKiBsaW5lQ2xlYXJQb2ludHM7XG4gIH1cbn1cbiJdLCJmaWxlIjoiYm9hcmQuanMifQ==
