#!/usr/bin/env node

const { join } = require("path");
const { readFile } = require("fs");
const { EOL } = require("os");

const filePath = join(__dirname, "input.txt");

readFile(filePath, "utf8", (err, data) => {
  if (err) throw err;
  const lines = data.split(EOL);
  const valid = lines
    .map((line) => {
      if (!line.trim().length) return false;

      const [, min, max, char, password] =
        line.match(/(\d+)-(\d+)\s?(\w):\s?(.*)/i) ?? [];
      const charCount = (password.match(new RegExp(char, "gi")) ?? []).length;

      return charCount >= parseInt(min, 10) && charCount <= parseInt(max, 10);
    })
    .filter(Boolean);

  console.log("Result:");
  console.log(`out of ${lines.length} passwords`);
  console.log(`${valid.length} are valid`);
  console.log(`and ${lines.length - valid.length} are invalid.`);
});
