const { readInput } = require("../read-input");

const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;

function parseInput(input) {
  const [template, rulesText] = input.split("\n\n");
  const rules = rulesText
    .split("\n")
    .slice(0, -1)
    .map((rule) => rule.split(" -> "))
    .reduce((rules, [pair, insertion]) => {
      rules[pair] = insertion;
      return rules;
    }, {});
  return [template, rules];
}

function getPairs(template) {
  const pairs = [];
  for (let i = 0; i < template.length - 1; i++) {
    pairs.push(`${template[i]}${template[i + 1]}`);
  }
  return pairs;
}

function mergeQuantities(...quantities) {
  const keys = Array.from(
    new Set(quantities.flatMap((quantity) => Object.keys(quantity)))
  );
  return keys.reduce((merged, key) => {
    merged[key] = quantities.reduce(
      (sum, quantity) => sum + (quantity[key] || 0),
      0
    );
    return merged;
  }, {});
}

const cache = {};

function processTimes(template, rules, times) {
  return mergeQuantities(
    countElementsQuantities(template),
    process(template, rules, times)
  );
}

function process(template, rules, times) {
  if (times == 0) return {};

  const pairs = getPairs(template);
  let total = {};
  for (let i = 0; i < pairs.length; i++) {
    const added = rules[pairs[i]];

    if (cache[pairs[i] + times] == null)
      cache[pairs[i] + times] = mergeQuantities(
        { [added]: 1 },
        process(`${pairs[i][0]}${added}${pairs[i][1]}`, rules, times - 1)
      );
    total = mergeQuantities(total, cache[pairs[i] + times]);
  }
  return mergeQuantities(total);
}

function countElementsQuantities(template) {
  return template.split("").reduce((quantities, element) => {
    quantities[element] == null
      ? (quantities[element] = 1)
      : quantities[element]++;
    return quantities;
  }, {});
}

function calculateResult(quantities) {
  const values = Object.values(quantities);
  return Math.max(...values) - Math.min(...values);
}

async function main() {
  const input = await readInput(14);
  const [template, rules] = parseInput(input);
  const quantities = processTimes(template, rules, 40);
  console.log(quantities);
  console.log(calculateResult(quantities));
}

main();
