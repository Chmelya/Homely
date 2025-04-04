import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { ROUTES } from '~/routes/paths';
import { authSlice } from '~/store/auth/auth-slice';
import { useAppSelector } from '~/store/hooks/store-hooks';

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
