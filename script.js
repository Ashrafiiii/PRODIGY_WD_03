const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameStatus = ['','','','','','','','',''];

function handleClick(index) {
  if (gameStatus[index] === '' && !checkWinner()) {
    gameStatus[index] = currentPlayer;
    render();
    if (!checkWinner() && !gameStatus.includes('')) {
      message.textContent = "It's a draw!";
    }
    togglePlayer();
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (gameStatus[a] && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c]) {
      message.textContent = `${currentPlayer} wins!`;
      return true;
    }
  }
  return false;
}

function resetGame() {
  gameStatus = ['','','','','','','','',''];
  currentPlayer = 'X';
  message.textContent = '';
  render();
}

function render() {
  board.innerHTML = '';
  gameStatus.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.onclick = () => handleClick(index);
    board.appendChild(cell);
  });
}

render();
