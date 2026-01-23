module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)(?:\((\w+)\))?:\s(.+?)\s\((no-ref|#\d{1,5})\)$/,
      headerCorrespondence: ["type", "scope", "subject", "ticket"],
    },
  },
  rules: {
    "type-enum": [2, "always", ["build", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "test", "chore", "deps"]],
  },
};
