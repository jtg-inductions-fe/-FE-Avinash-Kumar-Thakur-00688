import { useNavigate, useParams } from 'react-router-dom';

import { ArrowBack, LocationOn } from '@mui/icons-material';
import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    IconButton,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import MoviePlaceholder from '@assets/images/movie-placeholder.webp';
import { ROUTES } from '@constant';
import { useUserBookingsQuery } from '@services';
import { formatDate, formatDuration, formatTime } from '@utils';

import { TicketSkeleton } from './Ticket.skeleton';

/**
 * This container display the ticket of any particular slot with movie and cinema details
 */
export const TicketContainer = () => {
    /** Hooks */
    const { id } = useParams();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const { data, isLoading, isError, refetch } = useUserBookingsQuery({
        slot: id,
    });

    /** Constants */
    const seats = data?.[0]?.seats ?? [];
    const sortedSeats = [...seats].sort((a, b) => {
        if (a.row_number === b.row_number) {
            return a.seat_number - b.seat_number;
        }
        return a.row_number - b.row_number;
    });

    /** Functions */
    /**
     * This function takes row_number and seat_number, return seat label
     */
    const getSeatLabel = (row_number: number, seat_number: number) =>
        `${String.fromCharCode(64 + row_number)}${seat_number}`;

    /**
     * Function trigger when click the cancel ticket button
     */
    const handleNavigation = () => {
        void navigate(`${ROUTES.CANCEL_TICKET}/${id}`);
    };

    return (
        <Stack flex={1} gap={10} py={8}>
            {isLoading && !data && <TicketSkeleton />}

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
                <Stack gap={4}>
                    <Box display="flex" alignItems="center" gap={4}>
                        <IconButton
                            aria-label="Go back"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h2">Ticket</Typography>
                    </Box>

                    <Card>
                        <CardContent>
                            <Box
                                display="flex"
                                flexDirection={{ xs: 'column', md: 'row' }}
                                gap={1}
                            >
                                <CardMedia
                                    component="img"
                                    height={300}
                                    src={
                                        data[0].movie.poster_url ||
                                        MoviePlaceholder
                                    }
                                    alt={data[0].movie.name}
                                    sx={{
                                        background: palette.text.secondary,
                                        width: 280,
                                        objectFit: 'inherit',
                                        borderRadius: 2,
                                    }}
                                    loading="lazy"
                                />

                                <Stack flex={1} px={{ md: 3 }} py={2} gap={4}>
                                    <Stack gap={2}>
                                        <Box
                                            display="flex"
                                            gap={2}
                                            flexWrap="wrap"
                                        >
                                            <Typography variant="h2">
                                                {data[0].movie.name}
                                            </Typography>
                                        </Box>

                                        <Breadcrumbs separator="•">
                                            <Typography variant="h4">
                                                {formatDuration(
                                                    data[0].movie.duration,
                                                )}
                                            </Typography>
                                            <Typography variant="h4">
                                                {data[0].movie.genres
                                                    .map(
                                                        (genre) =>
                                                            genre.genre_name,
                                                    )
                                                    .join(', ')}
                                            </Typography>
                                        </Breadcrumbs>

                                        <Box
                                            display="flex"
                                            gap={2}
                                            alignItems="center"
                                        >
                                            <Typography variant="h4">
                                                Timing:{' '}
                                            </Typography>
                                            <Typography variant="h4">
                                                {formatTime(data[0].date_time)},
                                            </Typography>
                                            <Typography variant="h4">
                                                {formatDate({
                                                    date:
                                                        data[0].date_time || '',
                                                    options: {
                                                        year: 'numeric',
                                                    },
                                                })}
                                            </Typography>
                                        </Box>

                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={2}
                                            flexWrap="wrap"
                                        >
                                            <Typography variant="h3">
                                                Seats:{' '}
                                            </Typography>
                                            {sortedSeats.map((seat, index) => (
                                                <Chip
                                                    key={index}
                                                    label={getSeatLabel(
                                                        seat.row_number,
                                                        seat.seat_number,
                                                    )}
                                                    sx={{ minWidth: 60 }}
                                                    variant="outlined"
                                                    color="primary"
                                                />
                                            ))}
                                        </Box>
                                    </Stack>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                        mt="auto"
                                    >
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            onClick={handleNavigation}
                                        >
                                            Cancel Tickets
                                        </Button>
                                    </Box>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Stack gap={3}>
                                <Typography variant="h2">
                                    {data[0].cinema}
                                </Typography>

                                <Box display="flex" gap={2}>
                                    <LocationOn />
                                    <Typography variant="h3">
                                        {data[0].location}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            )}
        </Stack>
    );
};
