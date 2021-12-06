const { readInput } = require("../read-input");

const input = `3,4,3,1,2`;

class School {
  constructor(input) {
    this.fishGroups = [
      new FishGroup(0),
      new FishGroup(1),
      new FishGroup(2),
      new FishGroup(3),
      new FishGroup(4),
      new FishGroup(5),
      new FishGroup(6),
      new FishGroup(7),
      new FishGroup(8),
    ];
    input
      .split(",")
      .map((i) => parseInt(i))
      .forEach((days) => this.fishGroups[days].count++);
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
    const newOffspring = this.fishGroups.reduce(
      (count, group) => count + group.passDay(),
      0
    );
    this.fishGroups.push(new FishGroup(8, newOffspring));
    this.mergeGroups();
  }

  mergeGroups() {
    const merged = this.fishGroups.reduce((merged, group) => {
      const mergedGroup = merged.find((mg) => mg.daysLeft === group.daysLeft);
      if (mergedGroup) mergedGroup.count += group.count;
      else merged.push(group);
      return merged;
    }, []);
    this.fishGroups = merged;
  }

  total() {
    return this.fishGroups.reduce((count, group) => count + group.count, 0);
  }

  toString() {
    return `After ${this.day} days: ${this.fishGroups
      .map((group) => group.count)
      .join(",")}`;
  }
}

class FishGroup {
  constructor(daysLeft, count = 0) {
    this.daysLeft = daysLeft;
    this.count = count;
  }

  passDay() {
    this.daysLeft--;
    if (this.daysLeft < 0) {
      this.daysLeft = 6;
      return this.count;
    }
    return 0;
  }
}

async function main() {
  const input = await readInput(6);
  const school = new School(input);
  school.passDays(256);
  console.log(school.total());
}

main();
