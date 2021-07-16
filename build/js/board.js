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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJib2FyZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGllY2UgPSBudWxsO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5ncmlkID0gdGhpcy5nZXRFbXB0eUJvYXJkKCk7XG4gIH1cblxuICAvLyBjcmVhdGUgbWF0cml4IHdpdGggd2lkdGggYW5kIGhlaWdodCBmaWxsZWQgMFxuICBnZXRFbXB0eUJvYXJkKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKFxuICAgICAge2xlbmd0aDogUk9XU30sICgpID0+IEFycmF5KENPTFMpLmZpbGwoMClcbiAgICApXG4gIH1cblxuICB2YWxpcChwKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxufSJdLCJmaWxlIjoiYm9hcmQuanMifQ==
