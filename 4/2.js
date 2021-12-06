const { readInput } = require("../read-input");

class Board {
  constructor(input) {
    this.numbers = input.split("\n").map((row) => row.trim().split(/\s+/));
    if (this.numbers[this.numbers.length - 1].length === 1)
      this.numbers = this.numbers.slice(0, -1);
    this.marked = JSON.parse(JSON.stringify(this.numbers)).map((row) =>
      row.map((cell) => false)
    );
  }

  markNumber(number) {
    for (let i = 0; i < this.numbers.length; i++) {
      for (let j = 0; j < this.numbers[i].length; j++) {
        if (this.numbers[i][j] === number) this.marked[i][j] = true;
      }
    }
  }

  isWinningBoard() {
    for (let i = 0; i < this.marked.length; i++) {
      if (this.marked[i].every((cell) => cell)) return true;
    }

    for (let i = 0; i < this.marked.length; i++) {
      let fullColumn = true;
      for (let j = 0; j < this.marked[i].length; j++) {
        fullColumn &&= this.marked[j][i];
      }
      if (fullColumn) return true;
    }

    return false;
  }

  sumUnmarked() {
    let sum = 0;
    for (let i = 0; i < this.numbers.length; i++) {
      for (let j = 0; j < this.numbers[i].length; j++) {
        if (!this.marked[i][j]) sum += parseInt(this.numbers[i][j]);
      }
    }
    return sum;
  }
}

function parseInput(input) {
  let [numbers, ...boards] = input.split("\n\n");
  numbers = numbers.split(",");
  boards = boards.map((board) => new Board(board));
  return { numbers, boards };
}

function findLastWinner(numbers, boards) {
  let counter = 0;
  let nonWinningBoards = boards;
  while (true) {
    const number = numbers[counter];
    nonWinningBoards.forEach((board) => board.markNumber(number));
    nonWinningBoards = nonWinningBoards.filter(
      (board) => !board.isWinningBoard()
    );
    counter++;
    if (nonWinningBoards.length === 1) {
      break;
    }
  }
  const winningBoard = nonWinningBoards[0];

  while (true) {
    const number = numbers[counter];
    winningBoard.markNumber(number);
    if (winningBoard.isWinningBoard()) return { winningBoard, number };
    counter++;
  }
}

async function main() {
  const input = await readInput(4);
  const { numbers, boards } = parseInput(input);
  const { winningBoard, number } = findLastWinner(numbers, boards);
  console.log(winningBoard.sumUnmarked() * number);
}

main();
