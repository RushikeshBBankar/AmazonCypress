const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on);
    },
    baseUrl: 'https://www.amazon.in/',
    viewportWidth: 1536,
    viewportHeight: 695,
    userName:`7387984297`,
    password: `Rajani@123`,
  },
  chromeWebSecurity: false,
});
