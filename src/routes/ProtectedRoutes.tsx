import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@constant';
import { RootState } from '@store';

/**
 * Route guard for protected pages.
 * It ensures only authenticated user access protected pages
 */
export const ProtectedRoutes = () => {
    /** Hooks */
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={ROUTES.LOGIN} replace />
    );
};
