const { readInput } = require("../read-input");

/*
const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;
*/

class Map {
  constructor(input) {
    const max = Map.findMax(input) + 1;
    this.grid = Array(max)
      .fill(0)
      .map((_) => Array(max).fill(0));
    this.parseInput(input);
  }

  parseInput(input) {
    const lines = input
      .split("\n")
      .slice(0, -1)
      .map((line) => {
        const [start, end] = line.split(" -> ");
        return {
          start: start.split(",").map((n) => parseInt(n)),
          end: end.split(",").map((n) => parseInt(n)),
        };
      });
    lines.forEach((line) => this.addLine(line));
  }

  addLine({ start, end }) {
    if (start[1] === end[1]) {
      const min = Math.min(start[0], end[0]);
      const max = Math.max(start[0], end[0]);
      for (let i = min; i <= max; i++) {
        this.grid[end[1]][i]++;
      }
    } else if (start[0] === end[0]) {
      const min = Math.min(start[1], end[1]);
      const max = Math.max(start[1], end[1]);
      for (let i = min; i <= max; i++) {
        this.grid[i][end[0]]++;
      }
    } else {
      const [lower, higher] = start[1] < end[1] ? [start, end] : [end, start];
      const point = [lower[0], lower[1]];
      if (lower[0] < higher[0]) {
        while (point[0] <= higher[0]) {
          this.grid[point[1]][point[0]]++;
          point[0]++;
          point[1]++;
        }
      } else {
        while (point[0] >= higher[0]) {
          this.grid[point[1]][point[0]]++;
          point[0]--;
          point[1]++;
        }
      }
    }
  }

  countInterlaps() {
    let interlaps = 0;
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        if (this.grid[i][j] > 1) interlaps++;
      }
    }
    return interlaps;
  }

  static inputToNumbers(input) {
    return input
      .split("\n")
      .map((line) => line.split(" -> "))
      .flat()
      .map((pair) => pair.split(","))
      .flat()
      .slice(0, -1)
      .map((n) => parseInt(n));
  }

  static findMax(input) {
    return Math.max(...Map.inputToNumbers(input));
  }

  toString() {
    return this.grid
      .map((line) => line.join(""))
      .join("\n")
      .replace(/0/g, ".");
  }
}

async function main() {
  const input = await readInput(5);
  const map = new Map(input);
  console.log(map.countInterlaps());
}

main();
