#!/usr/bin/env node

const { join } = require("path");
const { readFileSync } = require("fs");
const { EOL } = require("os");
const filePath = join(__dirname, "input.txt");

const validators = {
  byr(value) {
    const num = parseInt(value, 10);
    return num >= 1920 && num <= 2002;
  },

  iyr(value) {
    const num = parseInt(value, 10);
    return num >= 2010 && num <= 2020;
  },

  eyr(value) {
    const num = parseInt(value, 10);
    return num >= 2020 && num <= 2030;
  },

  hgt(value) {
    const num = parseInt(value, 10);
    if (value.endsWith("cm")) {
      return num >= 120 && num <= 193;
    } else if (value.endsWith("in")) {
      return num >= 59 && num <= 76;
    }

    return false;
  },

  hcl(value) {
    return /^#[0-9a-f]{6}$/.test(value);
  },

  ecl(value) {
    return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
  },

  pid(value) {
    return /^\d{9}$/.test(value);
  },
};

try {
  const data = readFileSync(filePath, "utf8");
  const passports = data.split(`${EOL}${EOL}`);
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const valid = passports
    .map((passport) => passport.replace(/\n+/, " ").trim())
    .filter((passport) => {
      return requiredFields.every((field) => {
        const [, value] =
          passport.match(new RegExp(`${field}:(.+?)(?:\\s|$)`, "i")) ?? [];

        if (value) {
          return validators[field](value);
        }

        return false;
      });
    });

  console.log("Result:");
  console.log(`There are ${valid.length} valid passports.`);
} catch (err) {
  console.error(err);
}
