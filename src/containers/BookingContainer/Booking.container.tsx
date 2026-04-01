import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import {
    Box,
    Breadcrumbs,
    Button,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { DataState, SeatGrid, SeatsLegend } from '@components';
import { NOTIFICATIONS, POLLING_INTERVAL } from '@constant';
import { showSnackbar } from '@features';
import {
    BookingApiErrorType,
    useBookingMutation,
    useSeatsQuery,
    useSlotDetailsQuery,
} from '@services';
import { formatAmount, formatDate, formatTime } from '@utils';

import { BookingSkeleton, SeatGridSkeleton } from './Booking.skeleton';

/**
 * This container display the details about the slot and seat layout.
 * It also provide functionality for ticket booking.
 */
export const BookingContainer = () => {
    /** States */
    const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

    /** Hooks */
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { breakpoints } = useTheme();
    const isSmAndUp = useMediaQuery(breakpoints.up('sm'));
    const {
        data: slotDetails,
        isFetching: slotDetailsFetching,
        isError: slotDetailsError,
    } = useSlotDetailsQuery(id, {
        skip: !id,
    });
    const {
        data: seatsData,
        isLoading: seatsDataLoading,
        isError: seatsDataError,
    } = useSeatsQuery(id, {
        skip: !id,
        pollingInterval: POLLING_INTERVAL,
        skipPollingIfUnfocused: true,
    });
    const [booking, { isLoading: ticketBookingLoading }] = useBookingMutation();

    /** Functions */
    /**
     * Function to handle ticket booking,
     *
     * Trigger booking api and show success messages
     */
    const handleBooking = async () => {
        const seats = Array.from(selectedSeats).map((item) => {
            const [row, seat] = item.split('-');

            return {
                row_number: Number(row),
                seat_number: Number(seat),
            };
        });

        const payload = {
            slot: Number(id),
            seats: seats,
        };

        try {
            await booking(payload).unwrap();
            dispatch(
                showSnackbar({
                    message: NOTIFICATIONS.BOOKING_SUCCESS,
                    severity: 'success',
                }),
            );
        } catch (error: unknown) {
            const err = error as BookingApiErrorType;

            if (err?.status === 403) {
                dispatch(
                    showSnackbar({
                        message: err?.data?.detail || NOTIFICATIONS.ERROR,
                        severity: 'error',
                    }),
                );
            } else if (err?.status === 400) {
                dispatch(
                    showSnackbar({
                        message: NOTIFICATIONS.BOOKING_ERROR,
                        severity: 'error',
                    }),
                );
            } else {
                dispatch(
                    showSnackbar({
                        message: NOTIFICATIONS.ERROR,
                        severity: 'error',
                    }),
                );
            }
        } finally {
            setSelectedSeats(new Set());
        }
    };

    return (
        <Stack flex={1} gap={10} py={8}>
            <DataState
                isLoading={slotDetailsFetching}
                loadingState={<BookingSkeleton />}
                isError={slotDetailsError}
                errorState="We could not find the slot you are looking for."
            >
                <Box
                    display="flex"
                    alignItems="center"
                    gap={{ xs: 4, sm: 10 }}
                    sx={{ cursor: 'pointer' }}
                >
                    <IconButton
                        aria-label="Go back"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Stack>
                        <Typography variant={isSmAndUp ? 'h2' : 'h3'}>
                            {slotDetails?.movie}
                        </Typography>
                        <Breadcrumbs separator="|">
                            <Typography
                                variant={isSmAndUp ? 'h4' : 'h5'}
                                color="textSecondary"
                            >
                                {slotDetails?.cinema}
                            </Typography>
                            <Typography
                                variant={isSmAndUp ? 'h4' : 'h5'}
                                color="textSecondary"
                            >
                                {formatDate({
                                    date: slotDetails?.date_time ?? '',
                                    options: { weekday: 'short' },
                                })}
                            </Typography>
                            <Typography
                                variant={isSmAndUp ? 'h4' : 'h5'}
                                color="textSecondary"
                            >
                                {formatTime(slotDetails?.date_time ?? '')}
                            </Typography>
                        </Breadcrumbs>
                    </Stack>
                </Box>
                <DataState
                    isLoading={seatsDataLoading}
                    loadingState={<SeatGridSkeleton />}
                    isError={seatsDataError}
                    errorState="Not able to load seats in this slot."
                >
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        overflow="auto"
                    >
                        {seatsData && (
                            <SeatGrid
                                seats={seatsData?.seats}
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                            />
                        )}
                    </Box>

                    <SeatsLegend />

                    <Button
                        variant="contained"
                        size="large"
                        sx={{ width: 280, alignSelf: 'center' }}
                        onClick={handleBooking}
                        disabled={selectedSeats.size === 0}
                        loading={ticketBookingLoading}
                    >
                        {selectedSeats.size === 0
                            ? 'Book Now'
                            : `${formatAmount(selectedSeats.size * Number(slotDetails?.price ?? 0))}`}
                    </Button>
                </DataState>
            </DataState>
        </Stack>
    );
};
