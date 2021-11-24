#!/usr/bin/env node

const { join } = require("path");
const { readFileSync } = require("fs");
const { EOL } = require("os");
const filePath = join(__dirname, "input.txt");

try {
  const data = readFileSync(filePath, "utf8");
  const passports = data.split(`${EOL}${EOL}`);
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  // const optionalFields = ["cid"];
  const valid = passports.filter((passport) => {
    return requiredFields.every((field) => passport.includes(`${field}:`));
  });

  console.log("Result:");
  console.log(`There are ${valid.length} valid passports.`);
} catch (err) {
  console.error(err);
}
