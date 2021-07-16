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
