const { readInput } = require("../read-input");

async function main() {
  const input = await readInput(1);
  const values = input.split("\n");

  let increments = 0;
  for (let i = 1; i < values.length - 1; i++) {
    if (parseInt(values[i - 1]) < parseInt(values[i])) increments++;
  }
  console.log(increments);
}

main();
