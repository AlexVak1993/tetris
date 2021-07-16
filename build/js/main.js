const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');
// const time = {start: 0, elapsed: 0, level: 1000};

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
initNext();

function initNext() {
  ctxNext.canvas.width = 4 * BLOCK_SIZE;
  ctxNext.canvas.height = 4 * BLOCK_SIZE;
  ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
}

function addEventListener() {
  document.addEventListener('keydown', event => {
    if (event.keyCode === KEY.P) {
      pause();
    }
    if (event.keyCode === KEY.ESC) {
      gameOver();
    } else if (moves[event.keyCode]) {
      event.preventDefault();
      // Get new state
      let p = moves[event.keyCode](board.piece);
      if (event.keyCode === KEY.SPACE) {
        // Hard drop
        while (board.valid(p)) {
          account.score += POINTS.HARD_DROP;
          board.piece.move(p);
          p = moves[KEY.DOWN](board.piece);
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

function pause() {
  if (!requestId) {
    animate();
    return;
  }

  cancelAnimationFrame(requestId);
  requestId = null;
  
  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'yellow';
  ctx.fillText('PAUSED', 3, 4);
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
  time = { start: 0, elapsed: 0, level: LEVEL[account.level] };
}

let requestId;

function gameOver() {
  cancelAnimationFrame(requestId);
  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText('GAME OVER', 1.8, 4);
}

function play() {
  resetGame();
  time.start = performance.now();
  // If we have an old game running a game then cancel the old
  if (requestId) {
    cancelAnimationFrame(requestId);
  }

  animate();
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIik7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuY29uc3QgY2FudmFzTmV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXh0Jyk7XG5jb25zdCBjdHhOZXh0ID0gY2FudmFzTmV4dC5nZXRDb250ZXh0KCcyZCcpO1xuLy8gY29uc3QgdGltZSA9IHtzdGFydDogMCwgZWxhcHNlZDogMCwgbGV2ZWw6IDEwMDB9O1xuXG5tb3ZlcyA9IHtcbiAgW0tFWS5TUEFDRV06IHAgPT4gKHsuLi5wLCB5OiBwLnkgKzF9KSxcbiAgW0tFWS5VUF06IHAgPT4gYm9hcmQucm90YXRlKHApLFxuICBbS0VZLkxFRlRdOiAocCkgPT4gKHsgLi4ucCwgeDogcC54IC0gMSB9KSxcbiAgW0tFWS5SSUdIVF06IChwKSA9PiAoeyAuLi5wLCB4OiBwLnggKyAxIH0pLFxuICBbS0VZLkRPV05dOiAocCkgPT4gKHsgLi4ucCwgeTogcC55ICsgMSB9KSxcbn07XG5cbmxldCBhY2NvdW50VmFsdWVzID0ge1xuICBzY29yZTogMCxcbiAgbGluZXM6IDAsXG4gIGxldmVsOiAwXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFjY291bnQoa2V5LCB2YWx1ZSkge1xuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGtleSk7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICB9XG59XG5cbmxldCBhY2NvdW50ID0gbmV3IFByb3h5KGFjY291bnRWYWx1ZXMsIHtcbiAgc2V0OiAodGFyZ2V0LCBrZXksIHZhbHVlKSA9PiB7XG4gICAgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgICB1cGRhdGVBY2NvdW50KGtleSwgdmFsdWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59KTtcblxuLy8gY3JlYXRlIGJvYXJkIGNvcHlcbmxldCBib2FyZCA9IG5ldyBCb2FyZChjdHgsIGN0eE5leHQpO1xuYWRkRXZlbnRMaXN0ZW5lcigpO1xuaW5pdE5leHQoKTtcblxuZnVuY3Rpb24gaW5pdE5leHQoKSB7XG4gIGN0eE5leHQuY2FudmFzLndpZHRoID0gNCAqIEJMT0NLX1NJWkU7XG4gIGN0eE5leHQuY2FudmFzLmhlaWdodCA9IDQgKiBCTE9DS19TSVpFO1xuICBjdHhOZXh0LnNjYWxlKEJMT0NLX1NJWkUsIEJMT0NLX1NJWkUpO1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKCkge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLRVkuUCkge1xuICAgICAgcGF1c2UoKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtFWS5FU0MpIHtcbiAgICAgIGdhbWVPdmVyKCk7XG4gICAgfSBlbHNlIGlmIChtb3Zlc1tldmVudC5rZXlDb2RlXSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIEdldCBuZXcgc3RhdGVcbiAgICAgIGxldCBwID0gbW92ZXNbZXZlbnQua2V5Q29kZV0oYm9hcmQucGllY2UpO1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtFWS5TUEFDRSkge1xuICAgICAgICAvLyBIYXJkIGRyb3BcbiAgICAgICAgd2hpbGUgKGJvYXJkLnZhbGlkKHApKSB7XG4gICAgICAgICAgYWNjb3VudC5zY29yZSArPSBQT0lOVFMuSEFSRF9EUk9QO1xuICAgICAgICAgIGJvYXJkLnBpZWNlLm1vdmUocCk7XG4gICAgICAgICAgcCA9IG1vdmVzW0tFWS5ET1dOXShib2FyZC5waWVjZSk7XG4gICAgICAgIH0gICAgICAgXG4gICAgICB9IGVsc2UgaWYgKGJvYXJkLnZhbGlkKHApKSB7XG4gICAgICAgIGJvYXJkLnBpZWNlLm1vdmUocCk7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLRVkuRE9XTikge1xuICAgICAgICAgIGFjY291bnQuc2NvcmUgKz0gUE9JTlRTLlNPRlRfRFJPUDsgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBhdXNlKCkge1xuICBpZiAoIXJlcXVlc3RJZCkge1xuICAgIGFuaW1hdGUoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjYW5jZWxBbmltYXRpb25GcmFtZShyZXF1ZXN0SWQpO1xuICByZXF1ZXN0SWQgPSBudWxsO1xuICBcbiAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gIGN0eC5maWxsUmVjdCgxLCAzLCA4LCAxLjIpO1xuICBjdHguZm9udCA9ICcxcHggQXJpYWwnO1xuICBjdHguZmlsbFN0eWxlID0gJ3llbGxvdyc7XG4gIGN0eC5maWxsVGV4dCgnUEFVU0VEJywgMywgNCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUobm93ID0gMCkge1xuICAvLyByZWZyZXNoIHRpbWVcbiAgdGltZS5lbGFwc2VkID0gbm93IC0gdGltZS5zdGFydDtcblxuICBpZiAodGltZS5lbGFwc2VkID4gdGltZS5sZXZlbCkge1xuICAgIHRpbWUuc3RhcnQgPSBub3c7XG4gICAgXG4gICAgaWYgKCFib2FyZC5kcm9wKCkpIHtcbiAgICAgIGdhbWVPdmVyKCk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICBjdHguY2xlYXJSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcblxuICBib2FyZC5kcmF3KCk7XG4gIHJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRHYW1lKCkge1xuICBhY2NvdW50LnNjb3JlID0gMDtcbiAgYWNjb3VudC5saW5lcyA9IDA7XG4gIGFjY291bnQubGV2ZWwgPSAwO1xuICBib2FyZC5yZXNldCgpOyAgXG4gIHRpbWUgPSB7IHN0YXJ0OiAwLCBlbGFwc2VkOiAwLCBsZXZlbDogTEVWRUxbYWNjb3VudC5sZXZlbF0gfTtcbn1cblxubGV0IHJlcXVlc3RJZDtcblxuZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlcXVlc3RJZCk7XG4gIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICBjdHguZmlsbFJlY3QoMSwgMywgOCwgMS4yKTtcbiAgY3R4LmZvbnQgPSAnMXB4IEFyaWFsJztcbiAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICBjdHguZmlsbFRleHQoJ0dBTUUgT1ZFUicsIDEuOCwgNCk7XG59XG5cbmZ1bmN0aW9uIHBsYXkoKSB7XG4gIHJlc2V0R2FtZSgpO1xuICB0aW1lLnN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIC8vIElmIHdlIGhhdmUgYW4gb2xkIGdhbWUgcnVubmluZyBhIGdhbWUgdGhlbiBjYW5jZWwgdGhlIG9sZFxuICBpZiAocmVxdWVzdElkKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmVxdWVzdElkKTtcbiAgfVxuXG4gIGFuaW1hdGUoKTtcbn1cbiJdLCJmaWxlIjoibWFpbi5qcyJ9
