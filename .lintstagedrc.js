module.exports = {
  "package.json": () => {
    return "sort-package-json";
  },
  "src/**/*.ts": () => {
    return ['eslint --fix'];
  },
};
