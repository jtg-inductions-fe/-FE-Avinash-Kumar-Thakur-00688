import { useNavigate } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Skeleton, Stack, Typography } from '@mui/material';

/**
 * This component represent the skeleton of the ticket page
 */
export const TicketSkeleton = () => {
    /** Hooks */
    const navigate = useNavigate();

    return (
        <Stack flex={1} gap={10} py={8}>
            <Box display="flex" alignItems="center" gap={4}>
                <IconButton aria-label="Go back" onClick={() => navigate(-1)}>
                    <ArrowBack fontSize="small" />
                </IconButton>
                <Typography variant="h2">Ticket</Typography>
            </Box>

            <Stack gap={4}>
                <Skeleton variant="rounded" height={300} />
                <Skeleton variant="rounded" height={100} />
            </Stack>
        </Stack>
    );
};
