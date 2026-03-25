import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {},
});

// Inferred type for useSelector
export type RootState = ReturnType<typeof store.getState>;

// Inferred type for dispatch
export type AppDispatch = typeof store.dispatch;
