import { useParams } from 'react-router-dom';

import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

import { DataState, MovieSlot } from '@components';
import { useMovieShowtimesQuery } from '@services';

/**
 * Container used to display slots per cinema for a particular movie
 */
export const MovieShowtimesContainer = () => {
    /** Hooks */
    const { id = '' } = useParams();
    const { data, isFetching, isError } = useMovieShowtimesQuery(id, {
        skip: !id,
    });

    /** Constants */
    const durationParts = data?.duration.split(':') ?? [];
    const formattedDuration =
        durationParts.length >= 2 &&
        `${parseInt(durationParts[0])}h ${parseInt(durationParts[1])}m`;

    return (
        <Stack flex={1} py={4} gap={6}>
            <DataState
                isLoading={isFetching}
                isEmpty={!data}
                emptyState={{
                    title: 'Movie Not Found',
                    subtitle:
                        'We could not find the movie you are looking for.',
                }}
                isError={isError}
                errorState="Failed to load booking details. Please try again."
            >
                <Stack gap={6}>
                    <Card>
                        <CardContent>
                            <Stack gap={4}>
                                <Typography variant="h2">
                                    {data?.name}
                                </Typography>
                                <Box display="flex" gap={2} flexWrap="wrap">
                                    <Chip
                                        label={`Movie runtime: ${formattedDuration}`}
                                    />
                                    {data?.genres.map((genre) => (
                                        <Chip
                                            key={genre.id}
                                            label={genre.genre_name}
                                        />
                                    ))}
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Stack gap={2}>
                        <Typography variant="h2">Shows</Typography>
                        <DataState
                            isEmpty={data?.cinemas?.length === 0}
                            emptyState={{
                                subtitle: 'Oops! No shows available',
                            }}
                        >
                            <Stack gap={4}>
                                {data?.cinemas.map((cinema) => (
                                    <MovieSlot
                                        key={cinema.id}
                                        title={cinema.name}
                                        subtitle={cinema.location}
                                        slots={cinema.slots}
                                    />
                                ))}
                            </Stack>
                        </DataState>
                    </Stack>
                </Stack>
            </DataState>
        </Stack>
    );
};
