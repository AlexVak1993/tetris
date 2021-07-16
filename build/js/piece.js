class Piece {
  x;
  y;
  color;
  shape;
  ctx;
  typeId;

  constructor(ctx) {
    this.ctx = ctx;
    this.spawn();
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        // this.x, this.y - left top coord figure on gameboard
        // x, y coord piece on figure matrix
        // this.x + x - coord piece on gameboard
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1)
        }
      })
    })
  }

  move(p) {
    this.x = p.x;
    this.y = p.y;
    this.shape = p.shape;
  }

  randomizeTetrominoType(noOfTypes) {
    return Math.floor(Math.random() * noOfTypes)
  }

  spawn() {
    this.typeId = this.randomizeTetrominoType(COLORS.length - 1);
    this.shape = SHAPES[this.typeId];
    this.color = COLORS[this.typeId];
    this.x = 0;
    this.y = 0;
  }

  setStartPosition() {
    this.x = this.typeId === 4 ? 4 : 3;
  }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwaWVjZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQaWVjZSB7XG4gIHg7XG4gIHk7XG4gIGNvbG9yO1xuICBzaGFwZTtcbiAgY3R4O1xuICB0eXBlSWQ7XG5cbiAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5zcGF3bigpO1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgIHRoaXMuc2hhcGUuZm9yRWFjaCgocm93LCB5KSA9PiB7XG4gICAgICByb3cuZm9yRWFjaCgodmFsdWUsIHgpID0+IHtcbiAgICAgICAgLy8gdGhpcy54LCB0aGlzLnkgLSBsZWZ0IHRvcCBjb29yZCBmaWd1cmUgb24gZ2FtZWJvYXJkXG4gICAgICAgIC8vIHgsIHkgY29vcmQgcGllY2Ugb24gZmlndXJlIG1hdHJpeFxuICAgICAgICAvLyB0aGlzLnggKyB4IC0gY29vcmQgcGllY2Ugb24gZ2FtZWJvYXJkXG4gICAgICAgIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLnggKyB4LCB0aGlzLnkgKyB5LCAxLCAxKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBtb3ZlKHApIHtcbiAgICB0aGlzLnggPSBwLng7XG4gICAgdGhpcy55ID0gcC55O1xuICAgIHRoaXMuc2hhcGUgPSBwLnNoYXBlO1xuICB9XG5cbiAgcmFuZG9taXplVGV0cm9taW5vVHlwZShub09mVHlwZXMpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbm9PZlR5cGVzKVxuICB9XG5cbiAgc3Bhd24oKSB7XG4gICAgdGhpcy50eXBlSWQgPSB0aGlzLnJhbmRvbWl6ZVRldHJvbWlub1R5cGUoQ09MT1JTLmxlbmd0aCAtIDEpO1xuICAgIHRoaXMuc2hhcGUgPSBTSEFQRVNbdGhpcy50eXBlSWRdO1xuICAgIHRoaXMuY29sb3IgPSBDT0xPUlNbdGhpcy50eXBlSWRdO1xuICAgIHRoaXMueCA9IDA7XG4gICAgdGhpcy55ID0gMDtcbiAgfVxuXG4gIHNldFN0YXJ0UG9zaXRpb24oKSB7XG4gICAgdGhpcy54ID0gdGhpcy50eXBlSWQgPT09IDQgPyA0IDogMztcbiAgfVxufSJdLCJmaWxlIjoicGllY2UuanMifQ==
