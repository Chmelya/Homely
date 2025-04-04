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
