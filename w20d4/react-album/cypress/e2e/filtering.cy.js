it('finds the first checkbox and uncheck it by clicking on the label', () => {
	// - Visits the root of the app
	cy.visit('/');

	// - Finds the first checkbox and uncheck it by clicking on the label
	cy.get('.filters__form-group').first().find('label').click();

	cy.get('.filters__form-group').first().find('input').should('not.be.checked');
});
