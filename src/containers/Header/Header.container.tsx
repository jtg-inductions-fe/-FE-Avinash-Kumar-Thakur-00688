import * as React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Container, IconButton, Toolbar } from '@mui/material';

import Logo from '@assets/images/logo.svg';
import { AuthActions, NavLink, NavMenu, UserMenu } from '@components';
import { ROUTES } from '@constant';
import { useAuth } from '@hooks';
import { RootState } from '@store';

import { navItems } from './Header.config';

/**
 * Container represent the app header
 */
export const Header = () => {
    /** States */
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null,
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    );
    const { logout } = useAuth();
    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth,
    );

    /** Functions */
    /**
     * Function to open nav menu in mobile view
     */
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    /**
     * Function to open user menu
     */
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    /**
     * Function to close nav menu in mobile view
     */
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    /**
     * Function to close user menu
     */
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    /**
     * Function that trigger user logout
     */
    const handleLogout = () => {
        handleCloseUserMenu();
        void logout();
    };

    return (
        <AppBar color="default">
            <Container maxWidth="xl">
                <Toolbar
                    sx={{ justifyContent: 'space-between' }}
                    disableGutters
                >
                    {/* NavLinks - Mobile View */}
                    <Box display={{ xs: 'flex', md: 'none' }}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <NavMenu
                            anchorEl={anchorElNav}
                            keepMounted
                            closeNavMenu={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                            navItems={navItems}
                        />
                    </Box>

                    <Link to={ROUTES.HOME}>
                        <img
                            src={Logo}
                            alt="BookMyShow Logo"
                            width={100}
                            fetchPriority="high"
                            draggable="false"
                            style={{ display: 'block' }}
                        />
                    </Link>

                    {/* NavLinks - Desktop View */}
                    <Box
                        flexGrow={1}
                        display={{ xs: 'none', md: 'flex' }}
                        justifyContent="center"
                        gap={8}
                    >
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label}
                                label={item.label}
                                path={item.path}
                            />
                        ))}
                    </Box>

                    {/* User Menu */}
                    <Box>
                        {isAuthenticated ? (
                            <UserMenu
                                avatarAlt={user?.name}
                                avatarSrc={user?.avatar}
                                avatarClick={handleOpenUserMenu}
                                anchorEl={anchorElUser}
                                closeUserMenu={handleCloseUserMenu}
                                handleLogout={handleLogout}
                            />
                        ) : (
                            <AuthActions />
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
