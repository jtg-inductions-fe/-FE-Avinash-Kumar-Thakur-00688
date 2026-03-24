import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@types';
import { getToken, removeToken, setToken } from '@utils';

import { AuthSlice } from './Auth.types';

/**
 * Constant token key name which is used to store token in localstorage
 */
const tokenKey = 'auth_token';

/**
 * Token stored in the localstorage
 */
const storedToken = getToken(tokenKey);

/**
 * Initial state of the user authentication
 */
const initialState: AuthSlice = {
    token: storedToken,
    isAuthenticated: !!storedToken,
    user: null,
};

/**
 * Slice responsible for the user authentication state
 */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * Used to set the token and isAuthenticated state
         */
        setAuthCredentials(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isAuthenticated = true;
            setToken(tokenKey, action.payload);
        },
        /**
         * Used to set the user data
         */
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        /**
         * Clears the user authentication state
         */
        removeAuthCredentials(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            removeToken(tokenKey);
        },
    },
});

export const { setAuthCredentials, removeAuthCredentials, setUser } =
    userSlice.actions;
export const authReducer = userSlice.reducer;
