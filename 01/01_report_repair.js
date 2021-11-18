#!/usr/bin/env node

const { join } = require("path");
const { readFile } = require("fs");
const { EOL } = require("os");

const filePath = join(__dirname, "input.txt");
const target = 2020;

readFile(filePath, "utf8", (err, data) => {
  if (err) throw err;
  const values = data.split(EOL).map((line) => parseInt(line, 10));

  main: for (let a = 0; a < values.length; a++) {
    for (let b = a + 1; b < values.length; b++) {
      const aVal = values[a];
      const bVal = values[b];
      const sum = aVal + bVal;

      if (sum === target) {
        result = aVal * bVal;

        console.log("Result:");
        console.log(`${aVal} + ${bVal} = ${sum}`);
        console.log(`${aVal} * ${bVal} = ${result}`);
        break main;
      }
    }
  }
});
