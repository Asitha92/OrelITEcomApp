/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  displayName: "orelIT",
  clearMocks: true,
  testEnvironment: "jest-environment-jsdom",
  maxWorkers: 4,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
