import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': '/src',
			'@api': '/src/api',
			'@assets': '/src/assets',
			'@pages': '/src/pages',
			'@components': '/src/components',
			'@styles': '/src/styles',
			'@routers': '/src/routers',
			'@contexts': '/src/contexts',
			'@lib': '/src/lib',
			'@utils': '/src/utils',
			'@layouts': '/src/layouts',
		},
	},
	build: {
		chunkSizeWarningLimit: 1000,
	},
});
