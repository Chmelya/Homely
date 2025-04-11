export const ROUTES = {
	main: '/',
	signIn: '/signIn',
	signUp: '/signUp',

	requestsPrefix: '/requests',
	createRequestPath: '/create',
	editRequestPath: '/edit',
	processRequestPath: '/process',

	requestsMain: (params: string) =>
		`${ROUTES.requestsPrefix}/sortedList?${params}`,
	requestsMainDefault: () =>
		`${ROUTES.requestsPrefix}/sortedList?pageNumber=1&pageSize=10`,
	createRequest: () => `${ROUTES.requestsPrefix}${ROUTES.createRequestPath}`,
	editRequest: (id: number) =>
		`${ROUTES.requestsPrefix}${ROUTES.editRequestPath}/${id}`,
	processRequest: (id: number) =>
		`${ROUTES.requestsPrefix}${ROUTES.processRequestPath}/${id}`,

	notFound: '/404',
	forbidden: '/forbidden',
};
