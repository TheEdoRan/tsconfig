#!/usr/bin/env node

const { copyConfig } = require("./utils/copyConfig");
const { checkProject } = require("./utils/checkProject");
const { checkTypeScript } = require("./utils/checkTypeScript");
const { isNextProject } = require("./utils/isNextProject");

const main = async () => {
  const noQuestions = process.argv
    .slice(2)
    .some((arg) => arg === "--no-questions");

  const isNext = isNextProject();

  await copyConfig(isNext);
  await checkProject(noQuestions);
  await checkTypeScript(noQuestions, isNext);
};

main()
  .then(() => console.log("\n\nDone!"))
  .catch(() => {
    console.error(
      "\n\nERROR: Something went wrong with the execution of the script. Exiting."
    );
    process.exit(1);
  });
