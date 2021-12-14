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

function process(template, rules) {
  const pairs = getPairs(template);
  const newTemplate = pairs.reduce((newTemplate, pair) => {
    newTemplate += `${pair[0]}${rules[pair]}`;
    return newTemplate;
  }, "");
  return newTemplate + pairs[pairs.length - 1][1];
}

function processTimes(template, rules, times) {
  let newTemplate = template;
  for (let i = 0; i < times; i++) {
    newTemplate = process(newTemplate, rules);
  }
  return newTemplate;
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
  const finalTemplate = processTimes(template, rules, 10);
  const quantities = countElementsQuantities(finalTemplate);
  console.log(calculateResult(quantities));
}

main();
