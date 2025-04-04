import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	authSlice,
	STORAGE_AUTH_KEY,
	type AuthSliceState,
} from './auth/auth-slice';
import { isAuthTokenValid } from './auth/auth-util';

export const rootReducer = combineReducers({
	[authSlice.name]: authSlice.reducer,
});

export const setupStore = (
	preloadedState?: Partial<ReturnType<typeof rootReducer>>
) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};

const reHydrateStore = () => {
	try {
		if (!window) {
			return undefined;
		}
		const authStateStr = localStorage.getItem(STORAGE_AUTH_KEY);
		if (authStateStr) {
			const parsedState = JSON.parse(authStateStr) as AuthSliceState;

			if (isAuthTokenValid(parsedState.authToken)) {
				return {
					[authSlice.name]: parsedState,
				};
			}
		}
	} catch (e) {
		console.error(e, 'Cannot rehydrate auth state');
	}

	return undefined;
};

export const store = setupStore(reHydrateStore());
