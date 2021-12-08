const { readInput } = require("../read-input");

const input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`;

function countLine(line) {
  const [_, output] = line.split(" | ");
  const digits = output.split(" ");
  const ones = digits.filter((digit) => digit.length === 2);
  const sevens = digits.filter((digit) => digit.length === 3);
  const fours = digits.filter((digit) => digit.length === 4);
  const eights = digits.filter((digit) => digit.length === 7);
  return ones.length + sevens.length + fours.length + eights.length;
}

async function main() {
  const input = await readInput(8);
  const total = input
    .split("\n")
    .slice(0, -1)
    .reduce((total, line) => total + countLine(line), 0);
  console.log(total);
}

main();
