export const isAuthTokenValid = (token?: {
	access_token: string;
	expires: number;
}) => {
	return !!(
		token &&
		token.access_token &&
		token.expires > new Date().getTime()
	);
};
