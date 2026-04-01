import { ROUTES } from '@constant';

/**
 * Represent the items that need to be displayed in navbar
 */
export const navItems = [
    {
        label: 'Home',
        path: ROUTES.HOME,
        isAuthenticated: false,
    },
    {
        label: 'Cinemas',
        path: ROUTES.CINEMAS,
        isAuthenticated: false,
    },
    {
        label: 'Your Orders',
        path: ROUTES.ORDERS,
        isAuthenticated: true,
    },
];
