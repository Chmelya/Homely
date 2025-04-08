export const ROUTES = {
	main: '/',
	signIn: '/signin',

	requestsPrefix: '/requests',
	createRequestPath: '/create',
	editRequestPath: '/edit',

	requestsMain: (id: number) => `${ROUTES.requestsPrefix}/${id}`,
	requestsMainParams: (params: string) =>
		`${ROUTES.requestsPrefix}/sortedList?${params}`,
	createRequest: () => `${ROUTES.requestsPrefix}${ROUTES.createRequestPath}`,
	editRequest: (id: number) =>
		`${ROUTES.requestsPrefix}${ROUTES.editRequestPath}/${id}`,

	notFound: '/404',
	forbidden: '/forbidden',
};
