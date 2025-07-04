describe('Typing into the search field', () => {
	beforeEach(() => {
		// - Visits the root of the app
		cy.visit('/');

		// alias
		cy.get('.search__form').find('input').as('searchBox');
	});

	it('should be able to type in the search field', () => {
		// - Finds the search input field and type 'Bruno Mars'
		cy.get('@searchBox').type('Bruno Mars').should('have.value', 'Bruno Mars');
	});

	// - Makes correction using backspace
	it('should allow users to make correction', () => {
		cy.get('@searchBox')
			.type('Lucas{backspace}{backspace}{backspace}kas Graham', { delay: 150 })
			.should('have.value', 'Lukas Graham');
	});
});
