describe('Mocking API request', () => {
	it('find the input and search and return a response', () => {
		// - Visits the root of the app
		cy.visit('/');

		cy.intercept('GET', '**/search*', { fixture: 'album' }).as('fetchAlbum');

		// - Finds the search input field and type 'Celine Dion'
		cy.get('.search__form')
			.find('input')
			.type('celine dion')
			.should('have.value', 'celine dion');

		// - Waits for the API mock results to load
		cy.wait('@fetchAlbum');

		// - Checks for an explicit album
		cy.contains('Courage (Deluxe Edition)');

		// - Uncheck Explicit filter
		cy.get('#Explicit').uncheck();
		
		// - Confirms that the explicit album is filtered out
		cy.contains('Courage (Deluxe Edition)').should('not.exist');
	});
});
