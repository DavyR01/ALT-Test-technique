import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

test("golden master", () => {
   const expectedDir = path.join("legacy", "expected");
   const expectedFile = path.join(expectedDir, "report.txt");

   const legacyOutput = execSync("npm run legacy", { encoding: "utf8" });
   const refOutput = execSync("node src/runRef.js", { encoding: "utf8" });

   if (!existsSync(expectedFile)) {
      mkdirSync(expectedDir, { recursive: true });
      writeFileSync(expectedFile, legacyOutput, "utf8");
      throw new Error("Baseline created. Commit legacy/expected/report.txt then rerun.");
   }

   const expected = readFileSync(expectedFile, "utf8");
   expect(refOutput).toBe(expected);
});
