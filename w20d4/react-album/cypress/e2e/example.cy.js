it('should add 2 + 2', () => {
	const sum = 2 + 2;
	expect(sum).to.equal(4);
});

it('shoud visit lighthouselabs website', () => {
	cy.visit('https://lighthouselabs.ca');
});
