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
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
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
}

async function main() {
  const input = await readInput(10);
  const lines = parseInput(input);
  const corruptedTokens = lines
    .map((line) => isLineCorrupted(line))
    .filter((token) => token != null);
  const score = corruptedTokens.reduce(
    (score, token) => score + points[token],
    0
  );
  console.log(score);
}

main();
