import { baseApi } from 'services/BaseApi';

import { API_URL } from '@constant';
import { removeAuthCredentials, setAuthCredentials, setUser } from '@features';
import { User } from '@types';

import {
    AuthApiResponseType,
    LoginRequestType,
    RefreshApiResponseType,
    RegisterApiRequestType,
} from './Auth.types';

/**
 * Represent the authentication endpoints
 */
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Register endpoint to call the register API.
         *
         * It take request data from user and return access token and user details as response
         */
        register: builder.mutation<AuthApiResponseType, RegisterApiRequestType>(
            {
                query: (data) => ({
                    url: API_URL.REGISTER,
                    method: 'POST',
                    body: data,
                }),
                onQueryStarted(_, { dispatch, queryFulfilled }) {
                    void queryFulfilled
                        .then((response) => {
                            dispatch(setAuthCredentials(response.data.access));
                            dispatch(setUser(response.data.user));
                        })
                        .catch(() => {});
                },
            },
        ),
        /**
         * Login endpoint to call the login API.
         *
         * It take email and password as data and return access token and user details as response
         */
        login: builder.mutation<AuthApiResponseType, LoginRequestType>({
            query: (data) => ({
                url: API_URL.LOGIN,
                method: 'POST',
                body: data,
            }),
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                void queryFulfilled
                    .then((response) => {
                        dispatch(setAuthCredentials(response.data.access));
                        dispatch(setUser(response.data.user));
                    })
                    .catch(() => {});
            },
        }),
        /**
         * Refresh token endpoint, to generate the new access token when old access token expired
         */
        refreshToken: builder.mutation<RefreshApiResponseType, void>({
            query: () => ({
                url: API_URL.REFRESH_TOKEN,
                method: 'POST',
                credentials: 'include',
            }),
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                void queryFulfilled
                    .then((response) => {
                        dispatch(setAuthCredentials(response.data.access));
                    })
                    .catch(() => {
                        dispatch(removeAuthCredentials());
                    });
            },
        }),
        /**
         * Logout endpoint to call the logout user and delete access and refresh tokens
         */
        logout: builder.mutation({
            query: () => ({
                url: API_URL.LOGOUT,
                method: 'POST',
            }),
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                void queryFulfilled.then(() => {
                    dispatch(removeAuthCredentials());
                });
            },
        }),
        /**
         * Profile endpoint to get the user details
         */
        profile: builder.query<User, void>({
            query: () => ({
                url: API_URL.PROFILE,
                method: 'GET',
            }),
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                void queryFulfilled
                    .then((response) => {
                        dispatch(setUser(response.data));
                    })
                    .catch(() => dispatch(removeAuthCredentials()));
            },
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useRefreshTokenMutation,
    useLogoutMutation,
    useProfileQuery,
} = authApi;
