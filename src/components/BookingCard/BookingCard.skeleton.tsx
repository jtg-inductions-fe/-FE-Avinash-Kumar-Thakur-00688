import { Card, Skeleton, Stack } from '@mui/material';

import { MOVIE_CARD_POSTER_HEIGHT } from '@constant';

/**
 * This represent the skeleton of booking card
 */
export const BookingCardSkeleton = () => (
    <Card sx={{ display: { md: 'flex' }, gap: 4 }}>
        <Skeleton
            variant="rectangular"
            height={MOVIE_CARD_POSTER_HEIGHT}
            width={250}
        />

        <Stack flex={1} p={4}>
            <Skeleton variant="text" width="20%" height={50} />
            <Skeleton variant="text" width="20%" height={20} />
            <Skeleton variant="text" width="30%" height={40} />
            <Skeleton variant="text" width="50%" height={40} />
            <Skeleton variant="text" width="20%" height={30} />
            <Skeleton
                variant="rounded"
                width="20%"
                height={40}
                sx={{ mt: 'auto' }}
            />
        </Stack>
    </Card>
);
