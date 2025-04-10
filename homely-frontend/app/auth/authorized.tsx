import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { ROUTES } from '~/routes/paths';
import { authSlice } from '~/store/auth/auth-slice';
import { isAuthTokenValid } from '~/store/auth/auth-util';
import { useAppSelector } from '~/store/hooks/store-hooks';

export const Authorized = ({ children }: PropsWithChildren) => {
	const token = useAppSelector(authSlice.selectors.authToken);

	if (!isAuthTokenValid(token)) {
		return <Navigate to={ROUTES.signIn} replace />;
	}

	return children;
};

export const AuthorizedPermissions = ({
	permissions,
	children,
}: PropsWithChildren<{
	permissions: string[];
}>) => {
	const userPermissions = useAppSelector(authSlice.selectors.permissions);

	const hasAccess = userPermissions?.filter((value) =>
		permissions.includes(value)
	);

	if (!hasAccess) {
		return <Navigate to={ROUTES.forbidden} replace />;
	}

	return children;
};

export const AuthorizedRole = ({
	roles,
	children,
}: PropsWithChildren<{
	roles: string[];
}>) => {
	const userRole = useAppSelector(authSlice.selectors.role);

	const hasAccess = userRole && roles?.includes(userRole);

	if (!hasAccess) {
		return <Navigate to={ROUTES.forbidden} replace />;
	}

	return children;
};

export const useRole = (roles: string[]) => {
	const userRole = useAppSelector(authSlice.selectors.role);

	const hasAccess = userRole && roles?.includes(userRole);

	return { hasAccess };
};
