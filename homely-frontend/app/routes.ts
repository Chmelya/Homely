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
			route(':query', './pages/requests/requests-main/requests-main.tsx'),
			route(
				ROUTES.createRequestPath,
				'./pages/requests/requests-form/create-request/create-request.tsx'
			),
			route(
				`${ROUTES.editRequestPath}/:requestId`,
				'./pages/requests/requests-form/edit-request/edit-request.tsx'
			),
			route(
				`${ROUTES.processRequestPath}/:requestId`,
				'./pages/requests/request-process/request-process.tsx'
			),
		]),
	]),

	route(ROUTES.signIn, './pages/sign-in/login-page.tsx'),
] satisfies RouteConfig;
