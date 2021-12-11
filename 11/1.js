const { readInput } = require("../read-input");
const { bold } = require("chalk");

const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

function parseInput(input) {
  return input
    .split("\n")
    .slice(0, -1)
    .map((line) => line.split("").map((n) => parseInt(n)));
}

function printMatrix(matrix) {
  console.log(
    matrix
      .map((line) => line.map((n) => (n === 0 ? bold(n) : n)).join(""))
      .join("\n"),
    "\n"
  );
}

function increaseNeighbours(matrix, i, j) {
  if (i > 0) {
    if (j > 0) matrix[i - 1][j - 1]++;
    matrix[i - 1][j]++;
    if (j < matrix[i].length - 1) matrix[i - 1][j + 1]++;
  }
  if (j > 0) matrix[i][j - 1]++;
  if (j < matrix[i].length - 1) matrix[i][j + 1]++;
  if (i < matrix.length - 1) {
    if (j > 0) matrix[i + 1][j - 1]++;
    matrix[i + 1][j]++;
    if (j < matrix[i].length - 1) matrix[i + 1][j + 1]++;
  }
}

function countFlashes(matrix, count) {
  if (count === 0) return 0;
  const newMatrix = JSON.parse(JSON.stringify(matrix));
  for (let i = 0; i < newMatrix.length; i++) {
    for (let j = 0; j < newMatrix[i].length; j++) {
      newMatrix[i][j]++;
    }
  }
  let allFlashes = [];
  let flashes = [];
  let hasFlashed = true;
  while (hasFlashed) {
    hasFlashed = false;
    flashes = [];
    for (let i = 0; i < newMatrix.length; i++) {
      for (let j = 0; j < newMatrix[i].length; j++) {
        if (newMatrix[i][j] > 9 && !allFlashes.includes(`${i}-${j}`)) {
          flashes.push([i, j]);
          allFlashes.push(`${i}-${j}`);
          hasFlashed = true;
        }
      }
    }
    flashes.forEach(([i, j]) => increaseNeighbours(newMatrix, i, j));
  }
  allFlashes
    .map((coordinates) => coordinates.split("-"))
    .forEach(([i, j]) => (newMatrix[i][j] = 0));
  printMatrix(newMatrix);
  return allFlashes.length + countFlashes(newMatrix, count - 1);
}

async function main() {
  const input = await readInput(11);
  const matrix = parseInput(input);
  printMatrix(matrix);
  const flashes = countFlashes(matrix, 100);
  console.log(flashes);
}

main();
