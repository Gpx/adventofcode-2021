const { readInput } = require("../read-input");

async function main() {
  const input = await readInput(2);
  const instructions = input.split("\n").slice(0, -1);

  let depth = 0,
    horizontalPosition = 0,
    aim = 0;

  instructions.forEach((instruction) => {
    const [command, amount] = instruction.split(" ");
    switch (command) {
      case "forward":
        horizontalPosition += parseInt(amount);
        depth += aim * parseInt(amount);
        break;
      case "down":
        aim += parseInt(amount);
        break;
      case "up":
        aim -= parseInt(amount);
        break;
      default:
        throw new Error(`Unkwon command: "${command}"`);
    }
  });
  console.log(depth * horizontalPosition);
}

main();
