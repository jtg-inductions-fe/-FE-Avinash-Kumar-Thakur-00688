import { useNavigate } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import { Box, Divider, IconButton, Skeleton, Stack } from '@mui/material';

/**
 * This component represent the skeleton of the cancel ticket page
 */
export const CancelTicketsSkeleton = () => {
    /** Hooks */
    const navigate = useNavigate();

    return (
        <Stack flex={1} gap={10} py={8}>
            <Box
                display="flex"
                alignItems="center"
                gap={{ xs: 4, md: 10 }}
                sx={{ cursor: 'pointer' }}
            >
                <IconButton aria-label="Go back" onClick={() => navigate(-1)}>
                    <ArrowBack fontSize="small" />
                </IconButton>
                <Stack flex={1}>
                    <Skeleton variant="text" width="40%" height={50} />

                    <Box display="flex" gap={2} sx={{ width: '100%' }}>
                        <Skeleton variant="text" width={'40%'} height={40} />
                        <Skeleton variant="text" width={'20%'} height={40} />
                        <Skeleton variant="text" width={'20%'} height={40} />
                    </Box>
                </Stack>
            </Box>

            <Box>
                <Skeleton variant="text" width="50%" height={30} />
                <Skeleton variant="text" width="70%" height={20} />
                <Box display="flex" gap={2} alignItems="center">
                    <Skeleton variant="rounded" height={20} width={20} />
                    <Skeleton variant="text" width="20%" />
                </Box>
                <Divider sx={{ my: 1 }} />

                <Skeleton variant="rounded" height={400} />
            </Box>
        </Stack>
    );
};
