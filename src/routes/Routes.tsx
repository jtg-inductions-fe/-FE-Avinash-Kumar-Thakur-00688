import { lazy } from 'react';

import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { ROUTES } from '@constant';
import { MainLayout } from '@layout';
import { ErrorPage } from '@pages/index';

import { PublicRoutes } from './PublicRoutes';

// Dynamic pages imports
const NotFoundPage = lazy(() => import('@pages/NotFound'));
const HomePage = lazy(() => import('@pages/Home'));
const RegisterPage = lazy(() => import('@pages/Register'));
const LoginPage = lazy(() => import('@pages/Login'));

const routes: RouteObject[] = [
    {
        path: ROUTES.HOME,
        element: <MainLayout />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        element: <PublicRoutes />,
                        children: [
                            {
                                path: ROUTES.REGISTER,
                                element: <RegisterPage />,
                            },
                            {
                                path: ROUTES.LOGIN,
                                element: <LoginPage />,
                            },
                        ],
                    },
                ],
            },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
];

export const Router = createBrowserRouter(routes);
