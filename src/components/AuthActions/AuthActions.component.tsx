import { useNavigate } from 'react-router-dom';

import { Box, Button, useMediaQuery, useTheme } from '@mui/material';

import { ROUTES } from '@constant';

/**
 * This component display login and register button when user is not authenticated
 */
export const AuthActions = () => {
    /** Hooks */
    const { breakpoints } = useTheme();
    const isMobile = useMediaQuery(breakpoints.down('sm'));
    const navigate = useNavigate();

    return (
        <Box display="flex" gap={2} alignItems="center">
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(ROUTES.LOGIN)}
            >
                Sign in
            </Button>
            {!isMobile && (
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(ROUTES.REGISTER)}
                >
                    Sign up
                </Button>
            )}
        </Box>
    );
};
