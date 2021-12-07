const { readInput } = require("../read-input");

const input = `16,1,2,0,4,2,7,1,2,14`;

function costPerPosition(input, position) {
  const cost = input.reduce(
    (cost, start) => (cost += Math.abs(start - position)),
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
