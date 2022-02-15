const fs = require("fs/promises");
const { resolve } = require("path");

const copyConfig = async (isNext) => {
  try {
    await fs.copyFile(
      resolve(
        __dirname,
        "..",
        "files",
        isNext ? "tsconfig_next.json" : "tsconfig.json"
      ),
      resolve(process.cwd(), "tsconfig.json")
    );

    console.info("TypeScript configuration successfully generated!");
  } catch (e) {
    console.error(
      "ERROR: Could not generate configuration. Details below:\n",
      e
    );

    process.exit(1);
  }
};

module.exports = {
  copyConfig,
};
