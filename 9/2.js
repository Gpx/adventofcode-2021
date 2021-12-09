const { readInput } = require("../read-input");

const input = `2199943210
3987894921
9856789892
8767896789
9899965678
`;

function parseInput(input) {
  return input
    .split("\n")
    .slice(0, -1)
    .map((row) => row.split("").map((point) => parseInt(point)));
}

function getAdjacentPoints(points, i, j) {
  let adjacents = [];
  if (i - 1 >= 0) adjacents.push([i - 1, j]);
  if (i + 1 < points.length) adjacents.push([i + 1, j]);
  if (j - 1 >= 0) adjacents.push([i, j - 1]);
  if (j + 1 < points[i].length) adjacents.push([i, j + 1]);
  return adjacents;
}

function findLowPoints(points) {
  let lowPoints = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      const adjacents = getAdjacentPoints(points, i, j);
      if (adjacents.every(([x, y]) => points[x][y] > points[i][j]))
        lowPoints.push([i, j]);
    }
  }
  return lowPoints;
}

function removeDuplicates(points) {
  return points.reduce((uniques, [x, y]) => {
    const exists = uniques.find(([a, b]) => a === x && b === y);
    if (!exists) uniques.push([x, y]);
    return uniques;
  }, []);
}

function getBasin(points, i, j) {
  let basin = [[i, j]];
  const adjacents = getAdjacentPoints(points, i, j);
  const basinPoints = adjacents.filter(
    ([x, y]) => points[x][y] > points[i][j] && points[x][y] < 9
  );
  basin = [
    ...basin,
    ...basinPoints.flatMap(([x, y]) => getBasin(points, x, y)),
  ];
  return removeDuplicates(basin);
}

async function main() {
  const input = await readInput(9);
  const points = parseInput(input);
  const lowPoints = findLowPoints(points);
  const basins = lowPoints.map(([x, y]) => getBasin(points, x, y));
  const basinSizes = basins
    .map((basin) => basin.length)
    .sort((a, b) => a - b)
    .reverse()
    .slice(0, 3)
    .reduce((product, size) => product * size, 1);
  console.log(basinSizes);
}

main();
