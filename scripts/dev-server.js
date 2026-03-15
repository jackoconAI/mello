const path = require("path");
const { spawn } = require("child_process");

// Ensure node is on PATH for PostCSS and other child processes
const nodeBinDir = path.dirname(process.execPath);
const nodeModulesBin = path.join(__dirname, "..", "node_modules", ".bin");
const env = {
  ...process.env,
  PATH: nodeBinDir + ":" + nodeModulesBin + ":" + (process.env.PATH || ""),
};

const nextBin = path.join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [nextBin, "dev"], {
  cwd: path.join(__dirname, ".."),
  env,
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code || 0));
