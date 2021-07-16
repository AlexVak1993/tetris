class Piece {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwaWVjZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQaWVjZSB7XG4gIGNvbnN0cnVjdG9yKGN0eCkge1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuc3Bhd24oKTtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICB0aGlzLnNoYXBlLmZvckVhY2goKHJvdywgeSkgPT4ge1xuICAgICAgcm93LmZvckVhY2goKHZhbHVlLCB4KSA9PiB7XG4gICAgICAgIC8vIHRoaXMueCwgdGhpcy55IC0gbGVmdCB0b3AgY29vcmQgZmlndXJlIG9uIGdhbWVib2FyZFxuICAgICAgICAvLyB4LCB5IGNvb3JkIHBpZWNlIG9uIGZpZ3VyZSBtYXRyaXhcbiAgICAgICAgLy8gdGhpcy54ICsgeCAtIGNvb3JkIHBpZWNlIG9uIGdhbWVib2FyZFxuICAgICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpcy54ICsgeCwgdGhpcy55ICsgeSwgMSwgMSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgbW92ZShwKSB7XG4gICAgdGhpcy54ID0gcC54O1xuICAgIHRoaXMueSA9IHAueTtcbiAgfVxuXG4gIHJhbmRvbWl6ZVRldHJvbWlub1R5cGUobm9PZlR5cGVzKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5vT2ZUeXBlcylcbiAgfVxuXG4gIHNwYXduKCkge1xuICAgIHRoaXMudHlwZUlkID0gdGhpcy5yYW5kb21pemVUZXRyb21pbm9UeXBlKENPTE9SUy5sZW5ndGggLSAxKTtcbiAgICB0aGlzLnNoYXBlID0gU0hBUEVTW3RoaXMudHlwZUlkXTtcbiAgICB0aGlzLmNvbG9yID0gQ09MT1JTW3RoaXMudHlwZUlkXTtcbiAgICB0aGlzLnggPSAwO1xuICAgIHRoaXMueSA9IDA7XG4gIH1cblxuICBzZXRTdGFydFBvc2l0aW9uKCkge1xuICAgIHRoaXMueCA9IHRoaXMudHlwZUlkID09PSA0ID8gNCA6IDM7XG4gIH1cbn0iXSwiZmlsZSI6InBpZWNlLmpzIn0=
