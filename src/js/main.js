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
