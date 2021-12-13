const { readInput } = require("../read-input");

const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;

function parseInput(input) {
  const [coordinatesText, foldingInstructions] = input.split("\n\n");
  const foldings = foldingInstructions
    .split("\n")
    .slice(0, -1)
    .map((folding) => {
      const match = folding.match(/fold along (x|y)=(\d+)/);
      return [match[1], parseInt(match[2])];
    });

  const coordinates = coordinatesText
    .split("\n")
    .map((coordinate) => coordinate.split(","))
    .map(([x, y]) => [parseInt(x), parseInt(y)]);
  return [coordinates, foldings];
}

function generateMatrix(coordinates) {
  const maxX = coordinates.reduce((max, [x]) => (x > max ? x : max), -Infinity);
  const maxY = coordinates.reduce(
    (max, [, y]) => (y > max ? y : max),
    -Infinity
  );
  const matrix = Array(maxY + 1)
    .fill(false)
    .map(() => Array(maxX + 1).fill("."));
  coordinates.forEach(([x, y]) => (matrix[y][x] = "#"));
  return matrix;
}

function printMatrix(matrix) {
  matrix.forEach((line) => console.log(line.join(""), "\n"));
  console.log("\n");
}

function foldYMatrix(matrix, line) {
  const newMatrix = matrix.slice(0, line);

  for (let y = 0; y < newMatrix.length; y++) {
    for (let x = 0; x < newMatrix[y].length; x++) {
      newMatrix[y][x] =
        newMatrix[y][x] === "#" || matrix[2 * line - y][x] === "#" ? "#" : ".";
    }
  }

  return newMatrix;
}

function foldXMatrix(matrix, line) {
  const newMatrix = [];
  for (let y = 0; y < matrix.length; y++) {
    newMatrix.push([]);
    for (let x = 0; x < line; x++) {
      newMatrix[y].push(matrix[y][x]);
    }
  }

  for (let y = 0; y < newMatrix.length; y++) {
    for (let x = 0; x < newMatrix[y].length; x++) {
      newMatrix[y][x] =
        newMatrix[y][x] === "#" || matrix[y][2 * line - x] === "#" ? "#" : ".";
    }
  }

  return newMatrix;
}

function foldMatrix(matrix, [direction, line]) {
  return direction === "y"
    ? foldYMatrix(matrix, line)
    : foldXMatrix(matrix, line);
}

function countDots(matrix) {
  return matrix.reduce(
    (count, line) => count + line.filter((cell) => cell === "#").length,
    0
  );
}

async function main() {
  const input = await readInput(13);
  const [coordinates, foldings] = parseInput(input);
  let matrix = generateMatrix(coordinates);
  matrix = foldMatrix(matrix, foldings[0]);
  printMatrix(matrix);
  console.log(countDots(matrix));
}

main();
