import { useNavigate } from 'react-router-dom';

import { AccessTimeFilled } from '@mui/icons-material';
import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography,
} from '@mui/material';

import MoviePlaceholder from '@assets/images/movie-placeholder.webp';
import { MOVIE_CARD_POSTER_HEIGHT, ROUTES } from '@constant';
import { formatDate, formatDuration, formatTime } from '@utils';

import { BookingCardProps, StatusResponse } from './BookingCard.types';

/**
 * This component display the bookings of the user with slot and seat details
 * @param item - This consist of slot, movie, cinema and other details
 * @param status - It is to track whether the card is used for cancelled ticket or not
 */
export const BookingCard = ({ item, status }: BookingCardProps) => {
    /** Props */
    const { slot, movie, cinema, date_time: dateTime, location, seats } = item;

    /** Hooks */
    const navigate = useNavigate();

    /** Functions */
    /**
     * It takes row_number and seat_number to generate seat label
     */
    const getSeatLabel = (row_number: number, seat_number: number) =>
        `${String.fromCharCode(64 + row_number)}${seat_number}`;

    /**
     *  It sort the seat on base of seat_number and row_number
     */
    const sortedSeats = [...seats].sort((a, b) => {
        if (a.row_number === b.row_number) {
            return a.seat_number - b.seat_number;
        }
        return a.row_number - b.row_number;
    });

    /**
     * It convert the array of seat into , separated format
     */
    const formattedSeats = sortedSeats
        .map((seat) => getSeatLabel(seat.row_number, seat.seat_number))
        .join(', ');

    /**
     * It takes genres as array and format it
     */
    const formattedGenres = movie.genres
        .map((genre) => genre.genre_name)
        .join(', ');

    /**
     * It takes the date as parameter and returns the booking status
     * @param date - Date of the booking
     */
    const getBookingStatus = (date: string): StatusResponse => {
        if (status === 'CANCELLED')
            return { label: 'Cancelled', color: 'error' };

        const now = new Date();
        const showTime = new Date(date);

        return showTime > now
            ? { label: 'Upcoming', color: 'success' }
            : { label: 'Completed', color: 'warning' };
    };

    /**
     * It takes the date as parameter and check if a ticket can be cancel or not
     * @param date - Date of the booking
     */
    const canCancelBooking = (date: string) => {
        if (status === 'CANCELLED') {
            return false;
        }

        const now = new Date();
        const showTime = new Date(date);

        return showTime > now;
    };

    /**
     * Function which handles the navigation
     */
    const handleNavigation = () => {
        void navigate(
            `${ROUTES.CANCEL_TICKET}/${encodeURIComponent(String(slot))}`,
        );
    };

    /** Constants */
    const bookings = getBookingStatus(dateTime);

    return (
        <Card sx={{ display: { md: 'flex' } }}>
            <CardMedia
                component="img"
                src={movie.poster_url || MoviePlaceholder}
                alt={item?.movie?.name}
                loading="lazy"
                height={MOVIE_CARD_POSTER_HEIGHT}
                sx={{ width: { xs: '100%', md: 250 }, objectFit: 'inherit' }}
            />
            <CardContent>
                <Stack flex={1} height="100%" gap={1}>
                    <Box display="flex" gap={2} flexWrap="wrap">
                        <Typography variant="h2">{movie.name}</Typography>
                        <Chip
                            label={bookings.label}
                            sx={{ width: 'fit-content' }}
                            color={bookings.color}
                        />
                    </Box>

                    <Breadcrumbs separator="•">
                        <Typography variant="body2">
                            {formatDuration(movie.duration)}
                        </Typography>
                        <Typography variant="body2">
                            {formattedGenres}
                        </Typography>
                    </Breadcrumbs>

                    <Box display="flex" gap={2} alignItems="center">
                        <AccessTimeFilled fontSize="small" />
                        <Typography variant="body1">
                            {formatTime(dateTime)},
                        </Typography>
                        <Typography variant="body1">
                            {formatDate({
                                date: dateTime || '',
                                options: { year: 'numeric' },
                            })}
                        </Typography>
                    </Box>

                    <Breadcrumbs separator="|">
                        <Typography variant="body1">{cinema}</Typography>
                        <Typography variant="body1">{location}</Typography>
                    </Breadcrumbs>

                    <Typography>Seats: {formattedSeats}</Typography>

                    {canCancelBooking(dateTime) && (
                        <Button
                            variant="contained"
                            size="medium"
                            sx={{ width: 150, mt: 'auto' }}
                            onClick={handleNavigation}
                        >
                            Cancel Tickets
                        </Button>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};
