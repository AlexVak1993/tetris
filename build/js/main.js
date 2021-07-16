const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

// board canvas size
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// create board copy
let board = new Board();

function play() {
  board.reset();
  let piece = new Piece(ctx);
  piece.draw();

  board.piece = piece;

  console.table(board.grid);
}

const moves = {
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
};

// get new coord of piece
// let p = moves[e.key](board.piece);

document.addEventListener("keydown", (e) => {
  if (moves[e.key]) {
    e.preventDefault();

    // get new coord of figure
    let p = moves[e.key](board.piece);

    // check new coord
    if (board.valid(p)) {
      board.piece.move(p);

      // remove old coord on board
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      board.piece.draw();
    }
  }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIik7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4vLyBib2FyZCBjYW52YXMgc2l6ZVxuY3R4LmNhbnZhcy53aWR0aCA9IENPTFMgKiBCTE9DS19TSVpFO1xuY3R4LmNhbnZhcy5oZWlnaHQgPSBST1dTICogQkxPQ0tfU0laRTtcblxuY3R4LnNjYWxlKEJMT0NLX1NJWkUsIEJMT0NLX1NJWkUpO1xuXG4vLyBjcmVhdGUgYm9hcmQgY29weVxubGV0IGJvYXJkID0gbmV3IEJvYXJkKCk7XG5cbmZ1bmN0aW9uIHBsYXkoKSB7XG4gIGJvYXJkLnJlc2V0KCk7XG4gIGxldCBwaWVjZSA9IG5ldyBQaWVjZShjdHgpO1xuICBwaWVjZS5kcmF3KCk7XG5cbiAgYm9hcmQucGllY2UgPSBwaWVjZTtcblxuICBjb25zb2xlLnRhYmxlKGJvYXJkLmdyaWQpO1xufVxuXG5jb25zdCBtb3ZlcyA9IHtcbiAgW0tFWS5MRUZUXTogKHApID0+ICh7IC4uLnAsIHg6IHAueCAtIDEgfSksXG4gIFtLRVkuUklHSFRdOiAocCkgPT4gKHsgLi4ucCwgeDogcC54ICsgMSB9KSxcbiAgW0tFWS5ET1dOXTogKHApID0+ICh7IC4uLnAsIHk6IHAueSArIDEgfSksXG59O1xuXG4vLyBnZXQgbmV3IGNvb3JkIG9mIHBpZWNlXG4vLyBsZXQgcCA9IG1vdmVzW2Uua2V5XShib2FyZC5waWVjZSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gIGlmIChtb3Zlc1tlLmtleV0pIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBnZXQgbmV3IGNvb3JkIG9mIGZpZ3VyZVxuICAgIGxldCBwID0gbW92ZXNbZS5rZXldKGJvYXJkLnBpZWNlKTtcblxuICAgIC8vIGNoZWNrIG5ldyBjb29yZFxuICAgIGlmIChib2FyZC52YWxpZChwKSkge1xuICAgICAgYm9hcmQucGllY2UubW92ZShwKTtcblxuICAgICAgLy8gcmVtb3ZlIG9sZCBjb29yZCBvbiBib2FyZFxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjdHguY2FudmFzLndpZHRoLCBjdHguY2FudmFzLmhlaWdodCk7XG5cbiAgICAgIGJvYXJkLnBpZWNlLmRyYXcoKTtcbiAgICB9XG4gIH1cbn0pO1xuIl0sImZpbGUiOiJtYWluLmpzIn0=
