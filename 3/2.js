const { readInput } = require("../read-input");

function findMostCommonBit(list, position) {
  let count0 = 0,
    count1 = 0;

  for (let i = 0; i < list.length; i++) {
    list[i][position] === "0" ? count0++ : count1++;
  }

  return count0 === count1 ? null : count0 > count1 ? "0" : "1";
}

function findLeastCommonBit(list, position) {
  const mostCommon = findMostCommonBit(list, position);
  return mostCommon === null ? null : mostCommon === "0" ? "1" : "0";
}

function filterByValue(list, position, value) {
  return list.filter((code) => code[position] === value);
}

function findOxygen(list) {
  let candidates = list;
  let position = 0;
  while (candidates.length > 1) {
    const mostCommon = findMostCommonBit(candidates, position) || "1";
    candidates = filterByValue(candidates, position, mostCommon);
    position++;
  }
  return parseInt(candidates[0], 2);
}

function findCO2(list) {
  let candidates = list;
  let position = 0;
  while (candidates.length > 1) {
    const leastCommon = findLeastCommonBit(candidates, position) || "0";
    candidates = filterByValue(candidates, position, leastCommon);
    position++;
  }
  return parseInt(candidates[0], 2);
}

async function main() {
  const input = await readInput(3);
  const rows = input.split("\n").slice(0, -1);
  const oxygen = findOxygen(rows);
  const co2 = findCO2(rows);
  console.log(oxygen * co2);
}

main();
