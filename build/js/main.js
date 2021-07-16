const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');
const time = {start: 0, elapsed: 0, level: 1000};

// board canvas size
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

ctxNext.canvas.width = 4 * BLOCK_SIZE;
ctxNext.canvas.height = 4 * BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

moves = {
  [KEY.SPACE]: p => ({...p, y: p.y +1}),
  [KEY.UP]: p => board.rotate(p),
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
};

let accountValues = {
  score: 0,
  lines: 0,
  level: 0
}

function updateAccount(key, value) {
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
}

let account = new Proxy(accountValues, {
  set: (target, key, value) => {
    target[key] = value;
    updateAccount(key, value);
    return true;
  }
});

// create board copy
let board = new Board(ctx, ctxNext);
addEventListener();

function addEventListener() {
  document.addEventListener("keydown", event => {
    if (moves[event.keyCode]) {
      event.preventDefault();
  
      // get new coord of figure
      let p = moves[event.keyCode](board.piece);
      if (event.keyCode === KEY.SPACE) {
        // hard drop
        while (board.valid(p)) {
          account.score += POINTS.HARD_DROP;
          board.piece.move(p);
          p = moves[KEY.DOWN](board.piece)
        }
      } else if (board.valid(p)) {
        board.piece.move(p);
        if (event.keyCode === KEY.DOWN) {
          account.score += POINTS.SOFT_DROP;
        }
      }
    }
  });
}

function animate(now = 0) {
  // refresh time
  time.elapsed = now - time.start;

  if (time.elapsed > time.level) {
    time.start = now;
    
    if (!board.drop()) {
      gameOver();
      return
    }
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  board.draw();
  requestId = requestAnimationFrame(animate);
}

function resetGame() {
  account.score = 0;
  account.lines = 0;
  account.level = 0;
  board.reset();
  let piece = new Piece(ctx);
  board.piece = piece;
  board.piece.setStartPosition();
}

let requestId;

function gameOver() {
  cancelAnimationFrame(requestId);
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(1, 3, 8, 1.2);
  this.ctx.font = '1px Arial';
  this.ctx.fillStyle = 'red';
  this.ctx.fillText('GAME OVER', 1.8, 4);
}

function play() {
  resetGame();

  board.reset();
  let piece = new Piece(ctx);
  board.piece = piece;
  board.piece.setStartPosition();
  animate()
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIik7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuY29uc3QgY2FudmFzTmV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXh0Jyk7XG5jb25zdCBjdHhOZXh0ID0gY2FudmFzTmV4dC5nZXRDb250ZXh0KCcyZCcpO1xuY29uc3QgdGltZSA9IHtzdGFydDogMCwgZWxhcHNlZDogMCwgbGV2ZWw6IDEwMDB9O1xuXG4vLyBib2FyZCBjYW52YXMgc2l6ZVxuY3R4LmNhbnZhcy53aWR0aCA9IENPTFMgKiBCTE9DS19TSVpFO1xuY3R4LmNhbnZhcy5oZWlnaHQgPSBST1dTICogQkxPQ0tfU0laRTtcblxuY3R4LnNjYWxlKEJMT0NLX1NJWkUsIEJMT0NLX1NJWkUpO1xuXG5jdHhOZXh0LmNhbnZhcy53aWR0aCA9IDQgKiBCTE9DS19TSVpFO1xuY3R4TmV4dC5jYW52YXMuaGVpZ2h0ID0gNCAqIEJMT0NLX1NJWkU7XG5jdHhOZXh0LnNjYWxlKEJMT0NLX1NJWkUsIEJMT0NLX1NJWkUpO1xuXG5tb3ZlcyA9IHtcbiAgW0tFWS5TUEFDRV06IHAgPT4gKHsuLi5wLCB5OiBwLnkgKzF9KSxcbiAgW0tFWS5VUF06IHAgPT4gYm9hcmQucm90YXRlKHApLFxuICBbS0VZLkxFRlRdOiAocCkgPT4gKHsgLi4ucCwgeDogcC54IC0gMSB9KSxcbiAgW0tFWS5SSUdIVF06IChwKSA9PiAoeyAuLi5wLCB4OiBwLnggKyAxIH0pLFxuICBbS0VZLkRPV05dOiAocCkgPT4gKHsgLi4ucCwgeTogcC55ICsgMSB9KSxcbn07XG5cbmxldCBhY2NvdW50VmFsdWVzID0ge1xuICBzY29yZTogMCxcbiAgbGluZXM6IDAsXG4gIGxldmVsOiAwXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFjY291bnQoa2V5LCB2YWx1ZSkge1xuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGtleSk7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICB9XG59XG5cbmxldCBhY2NvdW50ID0gbmV3IFByb3h5KGFjY291bnRWYWx1ZXMsIHtcbiAgc2V0OiAodGFyZ2V0LCBrZXksIHZhbHVlKSA9PiB7XG4gICAgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgICB1cGRhdGVBY2NvdW50KGtleSwgdmFsdWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59KTtcblxuLy8gY3JlYXRlIGJvYXJkIGNvcHlcbmxldCBib2FyZCA9IG5ldyBCb2FyZChjdHgsIGN0eE5leHQpO1xuYWRkRXZlbnRMaXN0ZW5lcigpO1xuXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKCkge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7XG4gICAgaWYgKG1vdmVzW2V2ZW50LmtleUNvZGVdKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBcbiAgICAgIC8vIGdldCBuZXcgY29vcmQgb2YgZmlndXJlXG4gICAgICBsZXQgcCA9IG1vdmVzW2V2ZW50LmtleUNvZGVdKGJvYXJkLnBpZWNlKTtcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLRVkuU1BBQ0UpIHtcbiAgICAgICAgLy8gaGFyZCBkcm9wXG4gICAgICAgIHdoaWxlIChib2FyZC52YWxpZChwKSkge1xuICAgICAgICAgIGFjY291bnQuc2NvcmUgKz0gUE9JTlRTLkhBUkRfRFJPUDtcbiAgICAgICAgICBib2FyZC5waWVjZS5tb3ZlKHApO1xuICAgICAgICAgIHAgPSBtb3Zlc1tLRVkuRE9XTl0oYm9hcmQucGllY2UpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYm9hcmQudmFsaWQocCkpIHtcbiAgICAgICAgYm9hcmQucGllY2UubW92ZShwKTtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtFWS5ET1dOKSB7XG4gICAgICAgICAgYWNjb3VudC5zY29yZSArPSBQT0lOVFMuU09GVF9EUk9QO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZShub3cgPSAwKSB7XG4gIC8vIHJlZnJlc2ggdGltZVxuICB0aW1lLmVsYXBzZWQgPSBub3cgLSB0aW1lLnN0YXJ0O1xuXG4gIGlmICh0aW1lLmVsYXBzZWQgPiB0aW1lLmxldmVsKSB7XG4gICAgdGltZS5zdGFydCA9IG5vdztcbiAgICBcbiAgICBpZiAoIWJvYXJkLmRyb3AoKSkge1xuICAgICAgZ2FtZU92ZXIoKTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xuXG4gIGJvYXJkLmRyYXcoKTtcbiAgcmVxdWVzdElkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xufVxuXG5mdW5jdGlvbiByZXNldEdhbWUoKSB7XG4gIGFjY291bnQuc2NvcmUgPSAwO1xuICBhY2NvdW50LmxpbmVzID0gMDtcbiAgYWNjb3VudC5sZXZlbCA9IDA7XG4gIGJvYXJkLnJlc2V0KCk7XG4gIGxldCBwaWVjZSA9IG5ldyBQaWVjZShjdHgpO1xuICBib2FyZC5waWVjZSA9IHBpZWNlO1xuICBib2FyZC5waWVjZS5zZXRTdGFydFBvc2l0aW9uKCk7XG59XG5cbmxldCByZXF1ZXN0SWQ7XG5cbmZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICBjYW5jZWxBbmltYXRpb25GcmFtZShyZXF1ZXN0SWQpO1xuICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICB0aGlzLmN0eC5maWxsUmVjdCgxLCAzLCA4LCAxLjIpO1xuICB0aGlzLmN0eC5mb250ID0gJzFweCBBcmlhbCc7XG4gIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICB0aGlzLmN0eC5maWxsVGV4dCgnR0FNRSBPVkVSJywgMS44LCA0KTtcbn1cblxuZnVuY3Rpb24gcGxheSgpIHtcbiAgcmVzZXRHYW1lKCk7XG5cbiAgYm9hcmQucmVzZXQoKTtcbiAgbGV0IHBpZWNlID0gbmV3IFBpZWNlKGN0eCk7XG4gIGJvYXJkLnBpZWNlID0gcGllY2U7XG4gIGJvYXJkLnBpZWNlLnNldFN0YXJ0UG9zaXRpb24oKTtcbiAgYW5pbWF0ZSgpXG59XG4iXSwiZmlsZSI6Im1haW4uanMifQ==
