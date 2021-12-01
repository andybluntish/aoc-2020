#!/usr/bin/env node

const { join } = require("path");
const { readFileSync } = require("fs");
const { EOL } = require("os");
const filePath = join(__dirname, "input.txt");

function bisect(min, max, start) {
  let middle = (min + max) / 2;
  if (start) {
    return [min, Math.floor(middle)];
  } else {
    return [Math.ceil(middle), max];
  }
}

function findPosition(min, max, code) {
  let position;
  for (let isStart of code) {
    [min, max] = bisect(min, max, isStart);
    position = isStart ? min : max;
  }

  return position;
}

function calculateSeatPosition(code) {
  // Row
  const rows = code
    .slice(0, 7)
    .split("")
    .map((c) => c === "F");
  const row = findPosition(0, 127, rows);

  // Column
  const columns = code
    .slice(7)
    .split("")
    .map((c) => c === "L");
  const column = findPosition(0, 7, columns);

  return { row, column };
}

function calculateSeatID({ row, column }) {
  return row * 8 + column;
}

try {
  const data = readFileSync(filePath, "utf8");
  const boardingPasses = data.trim().split(EOL);
  const seatIds = boardingPasses
    .map(calculateSeatPosition)
    .map(calculateSeatID);
  const result = Math.max(...seatIds);

  console.log("Result:");
  console.log(`The highest seat ID is ${result}.`);
} catch (err) {
  console.error(err);
}
