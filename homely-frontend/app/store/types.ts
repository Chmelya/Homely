import type { store } from './store';

export type AppState = ReturnType<typeof store.getState>;
