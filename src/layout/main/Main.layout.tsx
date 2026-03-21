import { Outlet } from 'react-router-dom';

import { Container, Stack } from '@mui/material';

export const MainLayout = () => (
    <Container maxWidth="xl" disableGutters>
        <Stack height="100dvh">
            <Outlet />
        </Stack>
    </Container>
);
