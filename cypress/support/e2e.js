
import './commands'
import "allure-cypress/commands";

require('cypress-xpath');

beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
                console.error('Uncaught exception:', err.message);
                return false;
        });
});