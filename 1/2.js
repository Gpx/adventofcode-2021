const { readInput } = require("../read-input");

async function main() {
  const input = await readInput(1);
  const values = input.split("\n").map((n) => parseInt(n));

  let sums = [];
  for (let i = 0; i < values.length - 2; i++) {
    const sum = values[i] + values[i + 1] + values[i + 2];
    sums.push(sum);
  }

  let increments = 0;
  for (let i = 1; i < sums.length; i++) {
    if (sums[i - 1] < sums[i]) increments++;
  }
  console.log(increments);
}

main();
