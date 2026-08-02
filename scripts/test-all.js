const { execSync } = require("child_process");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

console.log("\n==================================================");
console.log("🚀 PROJECT : ME — AUTOMATED SYSTEM VERIFICATION");
console.log("==================================================\n");

let passed = 0;
let total = 0;

function runStep(name, command, cwd) {
  total++;
  console.log(`\x1b[36m[STEP ${total}] ${name}...\x1b[0m`);
  try {
    const startTime = Date.now();
    const output = execSync(command, { cwd, encoding: "utf8", stdio: "pipe" });
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\x1b[32m✔ PASSED\x1b[0m (${duration}s)\n`);
    passed++;
    return true;
  } catch (error) {
    console.error(`\x1b[31m✖ FAILED\x1b[0m\n`);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    return false;
  }
}

// Step 1: Run Backend Game Engine Unit Tests
runStep(
  "Backend Engine Unit Tests (Level System, XP Calculator, Sub-Quests, Penalty Engine)",
  "node --test tests/*.test.js",
  path.join(rootDir, "server")
);

// Step 2: Run Frontend Vite Production Build & Type/Asset Bundle Check
runStep(
  "Frontend Bundle Build & Asset Compilation Check",
  "npm run build",
  path.join(rootDir, "client")
);

console.log("==================================================");
if (passed === total) {
  console.log(`\x1b[32m🎉 ALL SYSTEMS VERIFIED: ${passed}/${total} SUITES PASSED CLEANLY!\x1b[0m`);
  console.log("==================================================\n");
  process.exit(0);
} else {
  console.log(`\x1b[31m⚠️ SYSTEM CHECK FAILURES: ${passed}/${total} SUITES PASSED.\x1b[0m`);
  console.log("==================================================\n");
  process.exit(1);
}
