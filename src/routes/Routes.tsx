import { lazy } from 'react';

import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { ROUTES } from '@constant';
import { MainLayout } from '@layout';
import { ErrorPage } from '@pages/index';

// Dynamic pages imports
const NotFoundPage = lazy(() => import('@pages/NotFound'));
const HomePage = lazy(() => import('@pages/Home'));

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
                    { path: '*', element: <NotFoundPage /> },
                ],
            },
        ],
    },
];

export const Router = createBrowserRouter(routes);
