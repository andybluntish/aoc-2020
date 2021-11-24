#!/usr/bin/env node

const { join } = require("path");
const { readFileSync } = require("fs");
const { EOL } = require("os");
const filePath = join(__dirname, "input.txt");

try {
  const data = readFileSync(filePath, "utf8");
  const lines = data.split(EOL);
  const valid = lines
    .map((line) => {
      if (!line.trim().length) return false;

      const [, p1, p2, char, password] =
        line.match(/(\d+)-(\d+)\s?(\w):\s?(.*)/i) ?? [];
      const char1 = password.charAt(parseInt(p1, 10) - 1);
      const char2 = password.charAt(parseInt(p2, 10) - 1);

      return char1 !== char2 && [char1, char2].includes(char);
    })
    .filter(Boolean);

  console.log("Result:");
  console.log(`out of ${lines.length} passwords`);
  console.log(`${valid.length} are valid`);
  console.log(`and ${lines.length - valid.length} are invalid.`);
} catch (err) {
  console.error(err);
}
