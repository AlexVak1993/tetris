const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

// board canvas size
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const moves = {
  [KEY.SPACE]: p => ({...p, y: p.y +1}),
  [KEY.UP]: p => board.rotate(p),
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
};

// create board copy
let board = new Board();

document.addEventListener("keydown", (event) => {
  if (moves[event.keyCode]) {
    event.preventDefault();

    // get new coord of figure
    let p = moves[event.keyCode](board.piece);


    if (event.keyCode === KEY.SPACE) {
      // hard drop
      while (board.valid(p)) {
        board.piece.move(p);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        board.piece.draw();

        p = moves[KEY.DOWN](board.piece)
      }
    } else if (board.valid(p)) {
      board.piece.move(p);

      // remove old coord on board
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      board.piece.draw();
    }
  }
});

function play() {
  board.reset();
  let piece = new Piece(ctx);
  piece.draw();

  board.piece = piece;

  console.table(board.grid);
  
  
}

// get new coord of piece
// let p = moves[e.key](board.piece);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIik7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4vLyBib2FyZCBjYW52YXMgc2l6ZVxuY3R4LmNhbnZhcy53aWR0aCA9IENPTFMgKiBCTE9DS19TSVpFO1xuY3R4LmNhbnZhcy5oZWlnaHQgPSBST1dTICogQkxPQ0tfU0laRTtcblxuY3R4LnNjYWxlKEJMT0NLX1NJWkUsIEJMT0NLX1NJWkUpO1xuXG5jb25zdCBtb3ZlcyA9IHtcbiAgW0tFWS5TUEFDRV06IHAgPT4gKHsuLi5wLCB5OiBwLnkgKzF9KSxcbiAgW0tFWS5VUF06IHAgPT4gYm9hcmQucm90YXRlKHApLFxuICBbS0VZLkxFRlRdOiAocCkgPT4gKHsgLi4ucCwgeDogcC54IC0gMSB9KSxcbiAgW0tFWS5SSUdIVF06IChwKSA9PiAoeyAuLi5wLCB4OiBwLnggKyAxIH0pLFxuICBbS0VZLkRPV05dOiAocCkgPT4gKHsgLi4ucCwgeTogcC55ICsgMSB9KSxcbn07XG5cbi8vIGNyZWF0ZSBib2FyZCBjb3B5XG5sZXQgYm9hcmQgPSBuZXcgQm9hcmQoKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gIGlmIChtb3Zlc1tldmVudC5rZXlDb2RlXSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBnZXQgbmV3IGNvb3JkIG9mIGZpZ3VyZVxuICAgIGxldCBwID0gbW92ZXNbZXZlbnQua2V5Q29kZV0oYm9hcmQucGllY2UpO1xuXG5cbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS0VZLlNQQUNFKSB7XG4gICAgICAvLyBoYXJkIGRyb3BcbiAgICAgIHdoaWxlIChib2FyZC52YWxpZChwKSkge1xuICAgICAgICBib2FyZC5waWVjZS5tb3ZlKHApO1xuXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgIGJvYXJkLnBpZWNlLmRyYXcoKTtcblxuICAgICAgICBwID0gbW92ZXNbS0VZLkRPV05dKGJvYXJkLnBpZWNlKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYm9hcmQudmFsaWQocCkpIHtcbiAgICAgIGJvYXJkLnBpZWNlLm1vdmUocCk7XG5cbiAgICAgIC8vIHJlbW92ZSBvbGQgY29vcmQgb24gYm9hcmRcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBib2FyZC5waWVjZS5kcmF3KCk7XG4gICAgfVxuICB9XG59KTtcblxuZnVuY3Rpb24gcGxheSgpIHtcbiAgYm9hcmQucmVzZXQoKTtcbiAgbGV0IHBpZWNlID0gbmV3IFBpZWNlKGN0eCk7XG4gIHBpZWNlLmRyYXcoKTtcblxuICBib2FyZC5waWVjZSA9IHBpZWNlO1xuXG4gIGNvbnNvbGUudGFibGUoYm9hcmQuZ3JpZCk7XG4gIFxuICBcbn1cblxuLy8gZ2V0IG5ldyBjb29yZCBvZiBwaWVjZVxuLy8gbGV0IHAgPSBtb3Zlc1tlLmtleV0oYm9hcmQucGllY2UpO1xuIl0sImZpbGUiOiJtYWluLmpzIn0=
