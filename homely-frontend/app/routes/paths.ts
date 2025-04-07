export const ROUTES = {
	main: '/',
	signIn: '/signin',

	requestsPrefix: '/requests',
	createRequestPath: '/create',
	editRequestPath: '/edit',

	requestsMain: (id: number) => `${ROUTES.requestsPrefix}/${id}`,
	createRequest: () => `${ROUTES.requestsPrefix}${ROUTES.createRequestPath}`,
	editRequest: (id: number) =>
		`${ROUTES.requestsPrefix}${ROUTES.editRequestPath}/${id}`,

	notFound: '/404',
	forbidden: '/forbidden',
};
