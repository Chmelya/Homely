import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice, STORAGE_AUTH_KEY, type AuthSliceState } from './auth-slice';
import { isAuthTokenValid } from './auth-util';

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
	const authStateStr = localStorage.getItem(STORAGE_AUTH_KEY);
	try {
		if (authStateStr) {
			const parsedState = JSON.parse(authStateStr) as AuthSliceState;

			if (isAuthTokenValid(parsedState.authToken)) {
				return {
					auth: parsedState,
				};
			}
		}
	} catch (e) {
		console.error(e, 'Cannot rehydrate auth state');
	}

	return undefined;
};

export const store = setupStore(reHydrateStore());
