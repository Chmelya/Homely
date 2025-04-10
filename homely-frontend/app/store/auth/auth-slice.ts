import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import type { AuthToken } from './auth-token';
import type User from '~/models/user';
import type { JwtHomelyPayload } from './jwt-payload';
import { isAuthTokenValid } from './auth-util';

export const STORAGE_AUTH_KEY = 'homely.credentials';

export interface AuthSliceState {
	authToken?: AuthToken;
	user?: User;
	permissions?: string[];
	role?: string;
}

const initialState: AuthSliceState = {};

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	selectors: {
		authToken: (state) => state.authToken,
		isAuthenticated: (state) => isAuthTokenValid(state.authToken),
		user: (state) => state.user,
		permissions: (state) => state.permissions,
		role: (state) => state.role,
	},
	reducers: {
		signIn: (
			state,
			action: PayloadAction<{
				accessToken: string;
			}>
		) => {
			const { accessToken } = action.payload;

			const accessTokenDecoded = jwtDecode<JwtHomelyPayload>(
				action.payload.accessToken
			);

			state.authToken = {
				access_token: accessToken,
				expires: accessTokenDecoded.exp! * 1000 - 30,
			};

			state.user = {
				id: accessTokenDecoded.homely_user_id,
				email: accessTokenDecoded.homely_email,
			};

			state.permissions = accessTokenDecoded.homely_permissions;
			state.role = accessTokenDecoded.homely_role;

			localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(state));
		},
		signOut: () => {
			localStorage.removeItem(STORAGE_AUTH_KEY);
			return initialState;
		},
		reset: () => initialState,
	},
});
