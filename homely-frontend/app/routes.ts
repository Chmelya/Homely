import {
	type RouteConfig,
	index,
	layout,
	route,
} from '@react-router/dev/routes';

export default [
	layout('./layouts/main-layout.tsx', [index('routes/mainPage.tsx')]),

	route('signin', './pages/sign-in-page/login-page.tsx'),
] satisfies RouteConfig;
