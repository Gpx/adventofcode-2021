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

const similarities = {
  5: {
    0: { 4: [2, 3, 5] },
    1: { 1: [2, 5], 2: [3] },
    2: { 3: [5], 4: [3], 5: [2] },
    3: { 4: [2, 5], 5: [3] },
    4: { 2: [2], 3: [3, 5] },
    5: { 3: [2], 4: [3], 5: [5] },
    6: { 4: [2, 3], 5: [5] },
    7: { 2: [2, 5], 3: [3] },
    8: { 5: [2, 3, 5] },
    9: { 4: [2], 5: [3, 5] },
  },
  6: {
    0: { 5: [6, 9], 6: [0] },
    1: { 1: [6], 2: [0, 9] },
    2: { 4: [0, 6, 9] },
    3: { 4: [0, 6], 5: [9] },
    4: { 3: [0, 6], 4: [9] },
    5: { 4: [0], 5: [6, 9] },
    6: { 5: [0, 9], 6: [6] },
    7: { 2: [6], 3: [0, 9] },
    8: { 6: [0, 6, 9] },
    9: { 5: [0, 6], 6: [9] },
  },
};

class Code {
  constructor(code) {
    this.code = code.split("").sort().join("");
    switch (this.code.length) {
      case 2:
        this.possibleValues = [1];
        break;
      case 3:
        this.possibleValues = [7];
        break;
      case 4:
        this.possibleValues = [4];
        break;
      case 5:
        this.possibleValues = [2, 3, 5];
        break;
      case 6:
        this.possibleValues = [0, 6, 9];
        break;
      case 7:
        this.possibleValues = [8];
    }
  }

  get value() {
    return this.possibleValues.length === 1 ? this.possibleValues[0] : null;
  }

  compare(other) {
    if (this.value == null) return;
    if (other.value != null) return;
    const intersections = this.intersections(other);
    const possibilities =
      similarities[other.code.length][this.value][intersections];
    other.possibleValues = possibilities;
  }

  intersections(other) {
    const [long, short] =
      this.code.length >= other.code.length ? [this, other] : [other, this];
    const intersection = (
      long.code.match(new RegExp(`[${short.code}]`, "g")) || []
    ).join("");
    return intersection.length;
  }
}

function hasSolution(codes) {
  return codes.slice(-4).every((code) => code.value != null);
}

function lineSolution(codes) {
  return parseInt(
    codes.slice(-4).reduce((total, code) => total + code.value, "")
  );
}

function countLine(line) {
  const [input, output] = line.split(" | ");
  const codes = [...input.split(" "), ...output.split(" ")].map(
    (code) => new Code(code)
  );
  while (true) {
    for (let i = 0; i < codes.length; i++) {
      const codeA = codes[i];
      for (let j = 0; j < codes.length; j++) {
        const codeB = codes[j];
        codeA.compare(codeB);
        if (hasSolution(codes)) return lineSolution(codes);
      }
    }
  }
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
