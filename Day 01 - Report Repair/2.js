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
      for (let c = b + 1; c < values.length; c++) {
        const aVal = values[a];
        const bVal = values[b];
        const cVal = values[c];
        const sum = aVal + bVal + cVal;

        if (sum === target) {
          result = aVal * bVal * cVal;

          console.log("Result:");
          console.log(`${aVal} + ${bVal} + ${cVal} = ${sum}`);
          console.log(`${aVal} * ${bVal} * ${cVal} = ${result}`);
          break main;
        }
      }
    }
  }
});
