import {
	type RouteConfig,
	index,
	layout,
	prefix,
	route,
} from '@react-router/dev/routes';
import { ROUTES } from './routes/paths';

export default [
	layout('./layouts/main-layout.tsx', [
		index('./pages/main/main.tsx'),

		...prefix(ROUTES.requestsPrefix, [
			index('./pages/requests/requests-main/requests-main.tsx'),
			route(
				ROUTES.createRequestPath,
				'./pages/requests/create-request/create-request.tsx'
			),
			route(
				`${ROUTES.editRequestPath}/:requestId`,
				'./pages/requests/edit-request/edit-request.tsx'
			),
		]),
	]),

	route(ROUTES.signIn, './pages/sign-in/login-page.tsx'),
] satisfies RouteConfig;
