const fs = require("fs/promises");
const path = require("path");

async function readInput(day) {
  const content = await fs.readFile(
    path.join(__dirname, day.toString(), "input.txt"),
    { encoding: "utf-8" }
  );
  return content;
}

module.exports = { readInput };
