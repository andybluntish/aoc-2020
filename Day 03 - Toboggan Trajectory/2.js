#!/usr/bin/env node

const { join } = require("path");
const { readFileSync } = require("fs");
const { EOL } = require("os");
const filePath = join(__dirname, "input.txt");

function traverse(map, xDistance, yDistance) {
  const width = map[0].length;
  const height = map.length;

  let x = 0;
  let y = 0;
  let trees = 0;

  while (y < height) {
    const location = map[y][x];

    if (location === "#") {
      trees++;
    }

    x = (x + xDistance) % width;
    y += yDistance;
  }

  return trees;
}

try {
  const data = readFileSync(filePath, "utf8");
  const lines = data.split(EOL);
  const attempts = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  const result = attempts
    .map(({ right, down }) => {
      return traverse(lines, right, down);
    })
    .reduce((prev, curr) => {
      return prev * curr;
    }, 1);

  console.log("Result:");
  console.log(
    `The product of the sum of trees in all the attempts is ${result}.`
  );
} catch (err) {
  console.error(err);
}
