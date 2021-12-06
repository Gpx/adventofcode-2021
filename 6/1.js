const { readInput } = require("../read-input");

const input = `3,4,3,1,2`;

class School {
  constructor(input) {
    this.fish = input.split(",").map((i) => new Fish(parseInt(i)));
    this.day = 0;
  }

  passDays(days) {
    for (let i = 0; i < days; i++) {
      this.passDay();
      console.log(this.toString());
    }
  }

  passDay() {
    this.day++;
    const offspring = this.fish
      .map((fish) => fish.passDay())
      .filter((fish) => !!fish);
    this.fish = [...this.fish, ...offspring];
  }

  toString() {
    return `After ${this.day} days: ${this.fish
      .map((fish) => fish.daysLeft)
      .join(",")}`;
  }
}

class Fish {
  constructor(daysLeft) {
    this.daysLeft = daysLeft;
  }

  passDay() {
    this.daysLeft--;
    if (this.daysLeft < 0) {
      this.daysLeft = 6;
      return new Fish(8);
    }
  }
}

async function main() {
  const input = await readInput(6);
  const school = new School(input);
  school.passDays(80);
  console.log(school.fish.length);
}

main();
