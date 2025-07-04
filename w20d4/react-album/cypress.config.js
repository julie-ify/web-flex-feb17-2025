import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:5173',
		viewportHeight: 1500,
		viewportWidth: 1500,
		experimentalRunAllSpecs: true,
	},
});
