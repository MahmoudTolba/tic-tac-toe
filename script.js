(() => {
    const board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = true;

    const cells = document.querySelectorAll('.cell');
    const turnIndicator = document.getElementById('turnIndicator');
    const resultEl = document.getElementById('result');
    const restartBtn = document.getElementById('restartBtn');

    const winningCombinations = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6]           // diagonals
    ];

    function handleCellClick(e) {
      if (!gameActive) return;
      const index = parseInt(e.target.getAttribute('data-index'), 10);

      if (board[index] !== null) return; // already taken

      board[index] = currentPlayer;
      e.target.textContent = currentPlayer;
      e.target.classList.add('disabled');

      if (checkWin()) {
        gameActive = false;
        turnIndicator.textContent = '';
        resultEl.textContent = `Player ${currentPlayer} wins! 🎉`;
        highlightWinningCells();
        return;
      }

      if (board.every(cell => cell !== null)) {
        gameActive = false;
        turnIndicator.textContent = '';
        resultEl.textContent = "It's a draw! 🤝";
        return;
      }

      togglePlayer();
      turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
      resultEl.textContent = '';
    }

    function checkWin() {
      return winningCombinations.some(combination => {
        const [a,b,c] = combination;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
      });
    }

    function highlightWinningCells() {
      winningCombinations.forEach(combination => {
        const [a,b,c] = combination;
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
          cells[a].style.backgroundColor = '#7bed9f';
          cells[b].style.backgroundColor = '#7bed9f';
          cells[c].style.backgroundColor = '#7bed9f';
        }
      });
    }

    function togglePlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function restartGame() {
      board.fill(null);
      currentPlayer = 'X';
      gameActive = true;
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
        cell.style.backgroundColor = '#3e3a65';
      });
      turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
      resultEl.textContent = '';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);

    // Initialize turn indicator on load
    turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
  })();