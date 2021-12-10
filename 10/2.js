const { readInput } = require("../read-input");

const input = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`;

const pairs = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const points = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function parseInput(input) {
  return input
    .split("\n")
    .slice(0, -1)
    .map((line) => line.split(""));
}

function isLineCorrupted(line) {
  let openChars = [];
  for (let i = 0; i < line.length; i++) {
    const token = line[i];
    switch (token) {
      case "(":
      case "[":
      case "{":
      case "<":
        openChars.push(token);
        break;
      case ")":
      case "]":
      case "}":
      case ">":
        const expected = pairs[openChars[openChars.length - 1]];
        if (expected === token) openChars.splice(-1, 1);
        else {
          console.log(`Expected ${expected} but found ${token} instead.`);
          return token;
        }
        break;
    }
  }
  return false;
}

function completeLine(line) {
  let openChars = [];
  for (let i = 0; i < line.length; i++) {
    const token = line[i];
    switch (token) {
      case "(":
      case "[":
      case "{":
      case "<":
        openChars.push(token);
        break;
      case ")":
      case "]":
      case "}":
      case ">":
        openChars.splice(-1, 1);
        break;
    }
  }
  const closingChars = openChars.map((token) => pairs[token]).reverse();
  return closingChars;
}

function calculateScore(line) {
  return line.reduce((score, character) => score * 5 + points[character], 0);
}

async function main() {
  const input = await readInput(10);
  const lines = parseInput(input);
  const incompleteLines = lines.filter((line) => !isLineCorrupted(line));
  const scores = incompleteLines
    .map((line) => completeLine(line))
    .map((line) => calculateScore(line))
    .sort((a, b) => a - b);
  console.log(scores[Math.floor(scores.length / 2)]);
}

main();
