import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), 'VITE_');

	return {
		define: {
			'process.env': env,
		},
		plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
	};
});
