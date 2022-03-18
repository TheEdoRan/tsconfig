const inquirer = require("inquirer");
const { execSync } = require("child_process");

const checkTypeScript = async (skipQuestion, isNext) => {
	try {
		execSync("npm list typescript");
	} catch {
		if (!skipQuestion) {
			const { initProject: answer } = await inquirer.prompt([
				{
					type: "list",
					name: "installTypeScript",
					message:
						"typescript is not installed in the current project. Do you want to install it?",
					choices: ["Yes", "No"],
				},
			]);

			if (answer === "No") {
				console.info("Ok, bye bye!");
				process.exit(0);
			}
		}

		try {
			execSync(
				`npm i -D typescript @types/node ${isNext ? "@types/react" : ""}`,
				{ stdio: "inherit" }
			);
		} catch (e) {
			console.error(e);
			console.error(
				"ERROR: could not install typescript and @types/node. Exiting."
			);
			process.exit(1);
		}
	}
};

module.exports = {
	checkTypeScript,
};
