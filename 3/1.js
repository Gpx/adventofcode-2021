const { readInput } = require("../read-input");

async function main() {
  const input = await readInput(3);
  const rows = input.split("\n").slice(0, -1);
  let gammaBits = "",
    espilonBits = "";

  for (let i = 0; i < rows[0].length; i++) {
    let count0 = 0,
      count1 = 0;
    for (let j = 0; j < rows.length; j++) {
      rows[j][i] === "0" ? count0++ : count1++;
    }
    if (count0 > count1) {
      gammaBits += "0";
      espilonBits += "1";
    } else {
      gammaBits += "1";
      espilonBits += "0";
    }
  }
  const gamma = parseInt(gammaBits, 2),
    epsilon = parseInt(espilonBits, 2);
  console.log(gamma * epsilon);
}

main();
