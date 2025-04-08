export const ROUTES = {
	main: '/',
	signIn: '/signin',

	requestsPrefix: '/requests',
	createRequestPath: '/create',
	editRequestPath: '/edit',

	requestsMain: (params: string) =>
		`${ROUTES.requestsPrefix}/sortedList?${params}`,
	requestsMainDefault: () =>
		`${ROUTES.requestsPrefix}/sortedList?pageNumber=1&pageSize=10`,
	createRequest: () => `${ROUTES.requestsPrefix}${ROUTES.createRequestPath}`,
	editRequest: (id: number) =>
		`${ROUTES.requestsPrefix}${ROUTES.editRequestPath}/${id}`,

	notFound: '/404',
	forbidden: '/forbidden',
};
