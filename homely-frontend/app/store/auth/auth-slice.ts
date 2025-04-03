import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import type { AuthToken } from './auth-token';
import type User from '~/models/user';
import type { JwtHomelyPayload } from './jwt-payload';

export const STORAGE_AUTH_KEY = 'homely.credentials';

export interface AuthSliceState {
	authToken?: AuthToken;
	user?: User;
	permissions?: string[];
}

const initialState: AuthSliceState = {};

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	selectors: {
		accessToken: (state) => state.authToken?.access_token,
	},
	reducers: {
		signIn: (
			state,
			action: PayloadAction<{
				accessToken: string;
				expiresIn: number;
			}>
		) => {
			const { accessToken, expiresIn } = action.payload;
			const tokenExpiresInMls = (expiresIn - 30) * 1e3;
			state.authToken = {
				access_token: accessToken,
				expires: new Date(new Date().getTime() + tokenExpiresInMls).getTime(),
			};

			const accessTokenDecoded = jwtDecode<JwtHomelyPayload>(accessToken);

			state.user = {
				id: accessTokenDecoded.homely_user_id,
				email: accessTokenDecoded.homely_email,
			};

			state.permissions = accessTokenDecoded.homely_permissions;

			localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(state));
		},
		signOut: () => {
			localStorage.removeItem(STORAGE_AUTH_KEY);
			return initialState;
		},
		reset: () => initialState,
	},
});
