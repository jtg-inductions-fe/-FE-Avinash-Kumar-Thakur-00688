export const API_URL = {
    REGISTER: '/user/register/',
    LOGIN: '/user/login/',
    REFRESH_TOKEN: '/user/refresh-token/',
    LOGOUT: '/user/logout/',
    PROFILE: '/user/details/',
    MOVIE_LIST: '/movies/',
    MOVIE_LANGUAGES: '/movies/languages/',
    MOVIE_GENRES: '/movies/genres/',
    CINEMA_LIST: '/cinemas/',
} as const;

export const TOKEN_KEY = 'auth_token';
