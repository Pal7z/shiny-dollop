let size = 8;
let board = [];
const delay = 500; // Delay in milliseconds

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${size}, 50px)`;

    for (let row = 0; row < size; row++) {
        board[row] = [];
        for (let col = 0; col < size; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${row}-${col}`;
            if ((row + col) % 2 === 0) {
                cell.style.backgroundColor = '#f0d9b5';
            } else {
                cell.style.backgroundColor = '#b58863';
            }
            boardElement.appendChild(cell);
            board[row][col] = cell;
        }
    }
}

function isSafe(board, row, col) {
    for (let i = 0; i < col; i++)
        if (board[row][i]) return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j]) return false;
    for (let i = row, j = col; j >= 0 && i < size; i++, j--)
        if (board[i][j]) return false;
    return true;
}

async function solveNQUtil(board, col) {
    if (col >= size) return true;
    for (let i = 0; i < size; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = true;
            document.getElementById(`cell-${i}-${col}`).classList.add('queen');
            await sleep(delay);
            if (await solveNQUtil(board, col + 1)) return true;
            board[i][col] = false;
            document.getElementById(`cell-${i}-${col}`).classList.remove('queen');
            await sleep(delay);
        }
    }
    return false;
}

async function solveNQueens() {
    size = parseInt(document.getElementById('boardSize').value);
    createBoard();
    const solution = Array.from({ length: size }, () => Array(size).fill(false));
    await solveNQUtil(solution, 0);
}

createBoard();
