import { baseApi } from 'services/BaseApi';

import { API_URL } from '@constant';

import {
    FilterOptionType,
    GenreApiResponseType,
    LanguageApiResponseType,
    MovieApiParamType,
    MovieApiResponseType,
} from './Movie.types';

/**
 * Consist of movie endpoints
 */
export const movieApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Takes params and return the list of movies with filters
         */
        movieWithFilter: builder.query<MovieApiResponseType, MovieApiParamType>(
            {
                query: (params) => ({
                    url: API_URL.MOVIE_LIST,
                    method: 'GET',
                    params: params,
                }),
            },
        ),
        /**
         * Endpoint to fetch languages of movies
         */
        languages: builder.query<FilterOptionType, void>({
            query: () => ({
                url: API_URL.MOVIE_LANGUAGES,
                method: 'GET',
            }),
            transformResponse: (response: LanguageApiResponseType) =>
                response.map((lang) => ({
                    label: lang.lang_name,
                    id: lang.id,
                })),
            keepUnusedDataFor: Infinity,
        }),
        /**
         * Endpoint to fetch genres of movies
         */
        genres: builder.query<FilterOptionType, void>({
            query: () => ({
                url: API_URL.MOVIE_GENRES,
                method: 'GET',
            }),
            transformResponse: (response: GenreApiResponseType) =>
                response.map((lang) => ({
                    label: lang.genre_name,
                    id: lang.id,
                })),
            keepUnusedDataFor: Infinity,
        }),
    }),
});

export const { useMovieWithFilterQuery, useLanguagesQuery, useGenresQuery } =
    movieApi;
