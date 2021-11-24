#!/usr/bin/env node

const { join } = require("path");
const { readFile } = require("fs");
const { EOL } = require("os");
const filePath = join(__dirname, "input.txt");

readFile(filePath, "utf8", (err, data) => {
  if (err) throw err;
  const lines = data.split(EOL);
  const width = lines[0].length;
  const height = lines.length;

  let x = 0;
  let y = 0;
  let trees = 0;

  while (y < height) {
    const location = lines[y][x];

    if (location === "#") {
      trees++;
    }

    x = (x + 3) % width;
    y += 1;
  }

  console.log("Result:");
  console.log(`I will encounter ${trees} trees.`);
});
