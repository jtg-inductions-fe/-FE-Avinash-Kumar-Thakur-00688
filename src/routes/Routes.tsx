import { lazy } from 'react';

import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { ROUTES } from '@constant';
import { MainLayout } from '@layout';
import { ErrorPage } from '@pages/index';

import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';

// Dynamic pages imports
const NotFoundPage = lazy(() => import('@pages/NotFound'));
const HomePage = lazy(() => import('@pages/Home'));
const RegisterPage = lazy(() => import('@pages/Register'));
const LoginPage = lazy(() => import('@pages/Login'));
const CinemaListPage = lazy(() => import('@pages/CinemaList'));
const CinemaDetailPage = lazy(() => import('@pages/CinemaDetails'));
const MovieDetailsPage = lazy(() => import('@pages/MovieDetails'));
const MovieShowtimesPage = lazy(() => import('@pages/MovieShowtimes'));
const BookingPage = lazy(() => import('@pages/Booking'));
const ProfilePage = lazy(() => import('@pages/Profile'));
const OrdersPage = lazy(() => import('@pages/Orders'));
const CancelTickets = lazy(() => import('@pages/CancelTickets'));
const TicketPage = lazy(() => import('@pages/Ticket'));

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
                        path: ROUTES.CINEMAS,
                        element: <CinemaListPage />,
                    },
                    {
                        path: `${ROUTES.CINEMAS}/:id`,
                        element: <CinemaDetailPage />,
                    },
                    {
                        path: `${ROUTES.MOVIES}/:id`,
                        element: <MovieDetailsPage />,
                    },
                    {
                        path: `${ROUTES.MOVIE_SHOWTIME}/:id`,
                        element: <MovieShowtimesPage />,
                    },
                    {
                        element: <ProtectedRoutes />,
                        children: [
                            {
                                path: `${ROUTES.BOOKING}/:movie/:id`,
                                element: <BookingPage />,
                            },
                            {
                                path: ROUTES.PROFILE,
                                element: <ProfilePage />,
                            },
                            {
                                path: ROUTES.ORDERS,
                                element: <OrdersPage />,
                            },
                            {
                                path: `${ROUTES.TICKET}/:id`,
                                element: <TicketPage />,
                            },
                            {
                                path: `${ROUTES.CANCEL_TICKET}/:id`,
                                element: <CancelTickets />,
                            },
                        ],
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
