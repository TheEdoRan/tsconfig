const { execSync } = require("child_process");

const isNextProject = () => {
  try {
    execSync("npm list next");
    console.info("Next.js project detected. Executing appropriate scripts.");
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  isNextProject,
};
