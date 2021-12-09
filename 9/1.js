const { readInput } = require("../read-input");

const input = `2199943210
3987894921
9856789892
8767896789
9899965678
`;

function getAdjacentPoints(points, i, j) {
  let adjacents = [];
  if (i - 1 >= 0) adjacents.push(points[i - 1][j]);
  if (i + 1 < points.length) adjacents.push(points[i + 1][j]);
  if (j - 1 >= 0) adjacents.push(points[i][j - 1]);
  if (j + 1 < points[i].length) adjacents.push(points[i][j + 1]);
  return adjacents;
}

function findLowPoints(input) {
  const points = input
    .split("\n")
    .slice(0, -1)
    .map((row) => row.split("").map((point) => parseInt(point)));

  let lowPoints = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      const adjacents = getAdjacentPoints(points, i, j);
      if (adjacents.every((adjacent) => adjacent > points[i][j]))
        lowPoints.push(points[i][j]);
    }
  }
  return lowPoints;
}

async function main() {
  const input = await readInput(9);
  const lowPoints = findLowPoints(input);
  console.log(lowPoints.reduce((sum, point) => (sum += point + 1), 0));
}

main();
