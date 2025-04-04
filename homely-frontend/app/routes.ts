import {
	type RouteConfig,
	index,
	layout,
	route,
} from '@react-router/dev/routes';
import { ROUTES } from './routes/paths';

export default [
	layout('./layouts/main-layout.tsx', [
		index('./pages/main/main.tsx'),
		route(ROUTES.createRequest, './pages/create-request/create-request.tsx'),
	]),

	route(ROUTES.signIn, './pages/sign-in/login-page.tsx'),
] satisfies RouteConfig;
