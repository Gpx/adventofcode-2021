const { readInput } = require("../read-input");

const input = `16,1,2,0,4,2,7,1,2,14`;

function fuelCost(start, end) {
  const movements = Math.abs(start - end);
  if (movements % 2 === 0) {
    return (movements + 1) * (movements / 2);
  } else {
    return (
      (movements + 1) * Math.floor(movements / 2) +
      Math.floor((movements + 1) / 2)
    );
  }
}

function costPerPosition(input, position) {
  const cost = input.reduce(
    (cost, start) => (cost += fuelCost(start, position)),
    0
  );
  return cost;
}

function cheapestPosition(input) {
  const min = Math.min(...input),
    max = Math.max(...input);
  let minimum = Infinity;
  for (let i = min; i <= max; i++) {
    const cost = costPerPosition(input, i);
    if (cost < minimum) minimum = cost;
  }
  return minimum;
}

async function main() {
  const input = await readInput(7);
  const position = cheapestPosition(input.split(",").map((i) => parseInt(i)));
  console.log(position);
}

main();
