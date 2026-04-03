import { baseApi } from 'services/BaseApi';

import { API_URL } from '@constant';

/**
 * Consist of Cinemas endpoints
 */
export const cinemaApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Endpoint to fetch all cinemas.
         *
         * It also consist of params to filter cinemas
         */
        cinemaWithFilter: builder.query({
            query: () => ({
                url: API_URL.CINEMA_LIST,
                method: 'GET',
            }),
        }),
    }),
});

export const { useCinemaWithFilterQuery } = cinemaApi;
