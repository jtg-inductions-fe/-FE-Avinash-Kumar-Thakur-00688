import { ChangeEvent, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import {
    Box,
    Breadcrumbs,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';

import { ERROR_STATUS, NOTIFICATIONS, ROUTES } from '@constant';
import { showSnackbar } from '@features';
import {
    BookingApiErrorType,
    SeatDataType,
    useCancelBookingMutation,
    useUserBookingsQuery,
} from '@services';
import { formatDate, formatTime } from '@utils';

import { CancelTicketsSkeleton } from './CancelTickets.skeleton';

/**
 * This container represent the cancel ticket layout and its functionality
 */
export const CancelTicketsContainer = () => {
    /** States */
    const [selectedSeats, setSelectedSeats] = useState<SeatDataType[]>([]);

    /** Hooks */
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, isLoading, isError, refetch } = useUserBookingsQuery({
        slot: id,
    });
    const [trigger] = useCancelBookingMutation();

    /** Constants */
    const seats = data?.[0]?.seats ?? [];
    const sortedSeats = [...seats].sort((a, b) => {
        if (a.row_number === b.row_number) {
            return a.seat_number - b.seat_number;
        }
        return a.row_number - b.row_number;
    });
    const isAllSelected =
        seats && seats.length > 0 && selectedSeats.length === seats.length;
    const isIndeterminate =
        seats &&
        selectedSeats.length > 0 &&
        selectedSeats.length < seats.length;

    /** Functions */
    /**
     * This function takes row_number and seat_number, return seat label
     */
    const getSeatLabel = (row_number: number, seat_number: number) =>
        `${String.fromCharCode(64 + row_number)}${seat_number}`;

    /**
     * This function takes seat as parameter and returns new selected states
     * @param seat - New seat which is selected
     */
    const handleChange = (seat: SeatDataType) => {
        setSelectedSeats((prev) =>
            prev.includes(seat)
                ? prev.filter((i) => i !== seat)
                : [...prev, seat],
        );
    };

    /**
     * This function selects all the seats
     */
    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedSeats(event.target.checked ? [...seats] : []);
    };

    /**
     * This function handles the cancellation of tickets
     */
    const handleCancelBooking = async () => {
        const payload = {
            slot: Number(id),
            seats: selectedSeats,
        };

        try {
            await trigger(payload).unwrap();
            dispatch(
                showSnackbar({
                    message: NOTIFICATIONS.BOOKING_CANCEL_SUCCESS,
                    severity: 'success',
                }),
            );
            if (selectedSeats.length === seats.length) {
                void navigate(ROUTES.ORDERS);
            }
            setSelectedSeats([]);
        } catch (error: unknown) {
            const err = error as BookingApiErrorType;

            if (err.status === ERROR_STATUS.FORBIDDEN) {
                dispatch(
                    showSnackbar({
                        message: err?.data?.detail || NOTIFICATIONS.ERROR,
                        severity: 'error',
                    }),
                );
            } else if (err?.status === ERROR_STATUS.BAD_REQUEST) {
                dispatch(
                    showSnackbar({
                        message: NOTIFICATIONS.INVALID_SEAT,
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
        }
    };

    return (
        <Stack flex={1} gap={10} py={8}>
            {isLoading && !data && <CancelTicketsSkeleton />}

            {isError && (
                <Stack
                    flex={1}
                    gap={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h4" color="error" textAlign="center">
                        Failed to load tickets. Please try again.
                    </Typography>
                    <Button variant="contained" onClick={() => refetch()}>
                        Retry
                    </Button>
                </Stack>
            )}

            {data && data.length === 0 && (
                <Stack
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                    p={4}
                    textAlign="center"
                >
                    <Typography variant="h2">Tickets Not Found</Typography>
                    <Typography variant="h4" color="textSecondary">
                        We could not find the tickets you are looking for.
                    </Typography>
                </Stack>
            )}

            {data && data.length > 0 && (
                <>
                    <Box display="flex" alignItems="center" gap={4}>
                        <IconButton
                            aria-label="Go back"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Stack>
                            <Typography variant="h2">
                                {data[0].movie.name}
                            </Typography>
                            <Breadcrumbs separator="|">
                                <Typography variant="h4" color="textSecondary">
                                    {data[0].cinema}
                                </Typography>
                                <Typography variant="h4" color="textSecondary">
                                    {formatDate({
                                        date: data[0].date_time,
                                        options: { weekday: 'short' },
                                    })}
                                </Typography>
                                <Typography variant="h4" color="textSecondary">
                                    {formatTime(data[0].date_time)}
                                </Typography>
                            </Breadcrumbs>
                        </Stack>
                    </Box>
                    <FormControl component="fieldset" variant="standard">
                        <Typography variant="h3">
                            Select seats to cancel
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            You can cancel one or more seats from this booking.
                        </Typography>
                        <FormControlLabel
                            label="Select All"
                            control={
                                <Checkbox
                                    checked={isAllSelected}
                                    indeterminate={isIndeterminate}
                                    onChange={handleSelectAll}
                                />
                            }
                        />
                        <Divider sx={{ my: 1 }} />
                        <FormGroup
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                flexWrap: 'wrap',
                            }}
                        >
                            {sortedSeats.map((seat, index) => (
                                <FormControlLabel
                                    key={index}
                                    sx={{
                                        minWidth: 80,
                                        display: 'flex',
                                        margin: 0,
                                    }}
                                    control={
                                        <Checkbox
                                            checked={selectedSeats.includes(
                                                seat,
                                            )}
                                            onChange={() => handleChange(seat)}
                                            value={JSON.stringify(seat)}
                                            name={getSeatLabel(
                                                seat.row_number,
                                                seat.seat_number,
                                            )}
                                        />
                                    }
                                    label={getSeatLabel(
                                        seat.row_number,
                                        seat.seat_number,
                                    )}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>

                    <Box>
                        <Typography color="textDisabled">
                            {selectedSeats.length} selected
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            disabled={selectedSeats.length === 0}
                            onClick={handleCancelBooking}
                        >
                            Cancel Tickets
                        </Button>
                    </Box>
                </>
            )}
        </Stack>
    );
};
