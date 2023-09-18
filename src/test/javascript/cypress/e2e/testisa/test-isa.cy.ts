import {
    accountMenuSelector,
    adminMenuSelector,
    loginItemSelector,
    navbarSelector,
    passwordLoginSelector,
    submitLoginSelector,
    submitSettingsSelector,
    usernameLoginSelector,
  } from '../../support/commands';
  import { entityDetailsButtonSelector } from '../../support/entity';

describe('/admin', () => {
    before(() => {
      cy.window().then(win => {
        win.sessionStorage.clear();
      });
      cy.clearCookies();
      cy.visit('');
    });
  
    beforeEach(() => {
      cy.visit('');
    });
  
    describe('/settings', () => {
      it('Language should be English', () => {
        cy.clickOnLoginItem();
        cy.get(usernameLoginSelector).click().type('admin');
        cy.get(passwordLoginSelector).type('admin');
        cy.get(submitLoginSelector).click();
        cy.clickOnSettingsItem();
        cy.get('[data-cy=langKey]').should('contain', 'English');
      });
  
      it('Can change name and email', () => {
        cy.clickOnLoginItem();
        cy.get(usernameLoginSelector).click().type('admin');
        cy.get(passwordLoginSelector).type('admin');
        cy.get(submitLoginSelector).click();
        cy.clickOnSettingsItem();
        cy.get('[data-cy=firstname]').clear().type('AdminFranco');
        cy.get('[data-cy=email]').clear().type('adminfranco@localhost.com');
        cy.get('[data-cy=submit]').click();
        cy.visit('/');
        cy.clickOnSettingsItem();
        cy.get('[data-cy=firstname]').should('have.value', 'AdminFranco');
        cy.get('[data-cy=email]').should('have.value', 'adminfranco@localhost.com');
      });
    });
  
    describe('/author', () => {
      it('Can create a new author', () => {
        cy.clickOnLoginItem();
        cy.login("admin", "admin");
        cy.visit('/author');
        cy.get('[data-cy=entityCreateButton]').click();
        cy.get('[data-cy=firstName]').type('Franco');
        cy.get('[data-cy=lastName]').type('Santander');
        cy.get('[data-cy=entityCreateSaveButton]').click();
        cy.get('[data-cy="entityTable"]').should('be.visible');
      });
    });
  });