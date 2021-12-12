const { readInput } = require("../read-input");

let input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

/*
input = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

input = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`;
*/

function hasSmallCaveDoubleVisits(visited) {
  const smallCaves = visited.filter((cave) => cave.toLowerCase() === cave);
  return smallCaves.some(
    (cave) => smallCaves.filter((name) => name === cave).length > 1
  );
}

function canBeVisited(cave, visited) {
  if (cave === "start") return false;
  if (cave === "end") return true;
  if (cave.toUpperCase() === cave) return true;
  if (!visited.includes(cave)) return true;
  return !hasSmallCaveDoubleVisits(visited);
}

const allPaths = [];

function findPaths(connections, start = "start", visited = []) {
  if (start === "end") {
    allPaths.push(visited);
    return;
  }
  const possibleJumps = connections.filter(
    ([from, to]) => from === start && canBeVisited(to, visited)
  );
  if (possibleJumps.length === 0) return;
  possibleJumps.map(([, to]) => findPaths(connections, to, [...visited, to]));
}

function parseInput(input) {
  const connections = input
    .split("\n")
    .slice(0, -1)
    .map((link) => link.split("-"));
  const reverseConnections = [...connections].map(([from, to]) => [to, from]);
  return [...connections, ...reverseConnections];
}

async function main() {
  const input = await readInput(12);
  const connections = parseInput(input);
  findPaths(connections);
  console.log(allPaths.length);
}

main();
