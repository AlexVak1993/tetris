class Piece {
  constructor(ctx) {
    this.ctx = ctx;
    this.color = 'blue';
    this.shape = [
      [2,0,0],
      [2,2,2],
      [0,0,0]
    ];

    // starting position
    this.x = 3;
    this.y= 0;
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
  }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwaWVjZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQaWVjZSB7XG4gIGNvbnN0cnVjdG9yKGN0eCkge1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuY29sb3IgPSAnYmx1ZSc7XG4gICAgdGhpcy5zaGFwZSA9IFtcbiAgICAgIFsyLDAsMF0sXG4gICAgICBbMiwyLDJdLFxuICAgICAgWzAsMCwwXVxuICAgIF07XG5cbiAgICAvLyBzdGFydGluZyBwb3NpdGlvblxuICAgIHRoaXMueCA9IDM7XG4gICAgdGhpcy55PSAwO1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgIHRoaXMuc2hhcGUuZm9yRWFjaCgocm93LCB5KSA9PiB7XG4gICAgICByb3cuZm9yRWFjaCgodmFsdWUsIHgpID0+IHtcbiAgICAgICAgLy8gdGhpcy54LCB0aGlzLnkgLSBsZWZ0IHRvcCBjb29yZCBmaWd1cmUgb24gZ2FtZWJvYXJkXG4gICAgICAgIC8vIHgsIHkgY29vcmQgcGllY2Ugb24gZmlndXJlIG1hdHJpeFxuICAgICAgICAvLyB0aGlzLnggKyB4IC0gY29vcmQgcGllY2Ugb24gZ2FtZWJvYXJkXG4gICAgICAgIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLnggKyB4LCB0aGlzLnkgKyB5LCAxLCAxKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBtb3ZlKHApIHtcbiAgICB0aGlzLnggPSBwLng7XG4gICAgdGhpcy55ID0gcC55O1xuICB9XG59Il0sImZpbGUiOiJwaWVjZS5qcyJ9
