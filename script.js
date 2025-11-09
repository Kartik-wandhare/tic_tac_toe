const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
let board = Array(9).fill(null);
let current = "X";
let gameOver = false;

// Create 9 cells
boardEl.innerHTML = "";
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.index = i;
  cell.addEventListener("click", () => handleMove(i));
  boardEl.appendChild(cell);
}

function handleMove(i) {
  if (gameOver || board[i]) return;
  board[i] = current;
  const cell = boardEl.children[i];
  cell.textContent = current;
  cell.classList.add("taken");

  if (checkWin()) {
    statusEl.textContent = `Player ${current} wins!`;
    gameOver = true;
    return;
  }
  if (board.every(Boolean)) {
    statusEl.textContent = "It's a draw!";
    gameOver = true;
    return;
  }
  current = current === "X" ? "O" : "X";
  statusEl.textContent = `Player ${current}'s turn`;
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  return wins.some(line => {
    const [a,b,c] = line;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = Array(9).fill(null);
  current = "X";
  gameOver = false;
  statusEl.textContent = "Player X's turn";
  Array.from(boardEl.children).forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}
