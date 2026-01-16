const { execSync } = require("node:child_process");

process.stdout.write(execSync("npm run legacy", { encoding: "utf8" }));
