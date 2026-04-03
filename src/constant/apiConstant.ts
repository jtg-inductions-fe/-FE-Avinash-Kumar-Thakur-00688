export const API_URL = {
    REGISTER: '/user/register/',
    LOGIN: '/user/login/',
    REFRESH_TOKEN: '/user/refresh-token/',
    LOGOUT: '/user/logout/',
    PROFILE: '/user/details/',
    MOVIE_LIST: '/movies/',
    MOVIE_LANGUAGES: '/movies/languages/',
    MOVIE_GENRES: '/movies/genres/',
    CINEMAS: '/cinemas/',
} as const;

export const TOKEN_KEY = 'auth_token';

export const ERROR_STATUS = {
    NOT_FOUND: 404,
} as const;
