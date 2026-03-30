import { useParams } from 'react-router-dom';

import {
    Box,
    Breadcrumbs,
    Button,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import MoviePlaceholder from '@assets/images/movie-placeholder.webp';
import { DataState } from '@components';
import { useMovieDetailsQuery } from '@services';
import { formatDate } from '@utils';

import { StyledBanner, StyledPoster } from './MovieDetails.styles';

/**
 * Container represent the details of the movie.
 */
export const MovieDetailsContainer = () => {
    /** Hooks */
    const { id = '' } = useParams();
    const { palette } = useTheme();
    const { data, isFetching, isError } = useMovieDetailsQuery(id, {
        skip: !id,
    });

    /** Constants */
    const durationParts = data?.duration.split(':') ?? [];
    const formattedDuration =
        durationParts.length >= 2 &&
        `${parseInt(durationParts[0])}h ${parseInt(durationParts[1])}m`;
    const formattedGenres = data?.genres
        ?.map((genre) => genre.genre_name)
        .join(', ');
    const formattedLanguages = data?.languages
        ?.map((language) => language.lang_name)
        .join(', ');

    return (
        <Stack flex={1} py={4} gap={5}>
            <DataState
                isLoading={isFetching}
                isEmpty={!data}
                emptyState={{
                    title: 'Movie Not Found',
                    subtitle:
                        'We could not find the movie you are looking for.',
                }}
                isError={isError}
                errorState="Failed to load movie details."
            >
                <Stack gap={8}>
                    <StyledBanner>
                        <StyledPoster
                            src={data?.poster_url || MoviePlaceholder}
                            alt={data?.name}
                            loading="lazy"
                        />
                        <Stack flex={1} gap={2}>
                            <Typography variant="h2">{data?.name}</Typography>
                            <Breadcrumbs
                                separator="•"
                                sx={{ color: palette.background.default }}
                            >
                                <Typography variant="h4">
                                    {formattedDuration}
                                </Typography>
                                <Typography variant="h4">
                                    {formattedGenres}
                                </Typography>
                                <Typography variant="h4">
                                    {formatDate({
                                        date: data?.release_date || '',
                                        options: { year: 'numeric' },
                                    })}
                                </Typography>
                            </Breadcrumbs>
                            <Typography variant="h4">
                                {formattedLanguages}
                            </Typography>

                            <Button
                                variant="contained"
                                size="large"
                                sx={{ width: 200, mt: 5 }}
                            >
                                Book tickets
                            </Button>
                        </Stack>
                    </StyledBanner>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={4}
                        px={4}
                        maxWidth="lg"
                    >
                        <Typography variant="h3">About the movie</Typography>
                        <Typography
                            variant="body1"
                            letterSpacing={0.5}
                            whiteSpace="pre-line"
                        >
                            {data?.description}
                        </Typography>
                    </Box>
                </Stack>
            </DataState>
        </Stack>
    );
};
