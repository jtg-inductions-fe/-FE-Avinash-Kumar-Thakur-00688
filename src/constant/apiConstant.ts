export const API_URL = {
    REGISTER: '/user/register/',
    LOGIN: '/user/login/',
    REFRESH_TOKEN: '/user/refresh-token/',
    LOGOUT: '/user/logout/',
    PROFILE: '/user/details/',
} as const;

// TODO: Add Api tags in key-value pair
export const API_TAGS = {} as const;

export const TOKEN_KEY = 'auth_token';
