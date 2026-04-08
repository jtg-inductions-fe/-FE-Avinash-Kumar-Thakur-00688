import { ChangeEvent, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import {
    Box,
    Button,
    FormControlLabel,
    Stack,
    Switch,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { BookingCard, BookingCardSkeleton } from '@components';
import { SKELETON_COUNT } from '@constant';
import { useUserBookingsQuery } from '@services';

/**
 * This container display bookings and cancelled bookings
 */
export const OrdersContainer = () => {
    /** States */
    const [searchParams, setSearchParams] = useSearchParams();
    const [cancelled, setCancelled] = useState<boolean>(
        searchParams.get('status') === 'cancelled',
    );

    /** Hooks */
    const { breakpoints } = useTheme();
    const isMobile = useMediaQuery(breakpoints.down('sm'));
    const { data, isLoading, isError, refetch } = useUserBookingsQuery({
        status: cancelled ? 'cancelled' : undefined,
    });

    /** Function */
    /**
     * This function handles the checked state of checkbox
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSearchParams({ status: 'cancelled' }, { replace: true });
        } else {
            setSearchParams({}, { replace: true });
        }
        setCancelled(isChecked);
    };

    return (
        <Stack gap={6} py={4} sx={{ width: '100%' }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant={isMobile ? 'h3' : 'h2'}>
                    {cancelled ? 'Cancelled Bookings' : 'My Bookings'}
                </Typography>
                <FormControlLabel
                    control={
                        <Switch checked={cancelled} onChange={handleChange} />
                    }
                    label="Cancelled"
                    sx={{ mr: 0 }}
                />
            </Box>
            {isLoading &&
                !data &&
                Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                    <BookingCardSkeleton key={index} />
                ))}

            {isError && !data && (
                <Stack
                    flex={1}
                    gap={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h2" color="error" textAlign="center">
                        Failed to load your bookings. Please try again.
                    </Typography>
                    <Button variant="contained" onClick={() => refetch()}>
                        Retry
                    </Button>
                </Stack>
            )}

            {data && data.length === 0 && (
                <Stack textAlign="center">
                    {cancelled ? (
                        <Typography variant="h2">
                            You haven&apos;t cancelled any tickets.
                        </Typography>
                    ) : (
                        <Typography variant="h2">
                            Looks like you haven&apos;t booked anything yet.
                        </Typography>
                    )}
                </Stack>
            )}

            {data &&
                data.length > 0 &&
                !isLoading &&
                data.map((item) => (
                    <BookingCard
                        key={item?.slot}
                        item={item}
                        status={cancelled ? 'CANCELLED' : 'BOOKED'}
                    />
                ))}
        </Stack>
    );
};
