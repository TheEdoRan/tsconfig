const fs = require("fs/promises");
const path = require("path");
const inquirer = require("inquirer");
const { execSync } = require("child_process");

const checkProject = async (skipQuestion) => {
  try {
    await fs.stat(path.resolve(process.cwd(), "package.json"));
  } catch (e) {
    if (e.code === "ENOENT") {
      if (!skipQuestion) {
        const { initProject: answer } = await inquirer.prompt([
          {
            type: "list",
            name: "initProject",
            message:
              "package.json does not exist in the current directory. Do you want to initialize a new project?",
            choices: ["Yes", "No"],
          },
        ]);

        if (answer === "No") {
          console.info("Ok, bye bye!");
          process.exit(0);
        }
      }

      try {
        execSync("npm init", { stdio: "inherit" });
        console.info("package.json successfully generated.");
      } catch {
        console.error("ERROR: Could not init a new project. Exiting.");
        process.exit(1);
      }
    } else {
      console.error(`ERROR: could not access package.json: ${e}`);
    }
  }
};

module.exports = {
  checkProject,
};
