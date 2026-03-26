import { useState } from 'react';

import { MovieFilters } from 'containers/MovieFilters';

import { Box, Stack, Typography } from '@mui/material';

import { GridList, MovieCard, MovieSkeleton } from '@components';
import { MovieApiParamType, useMovieWithFilterQuery } from '@services';

/**
 * Container display movies and their filter panel
 */
export const MovieWithFilters = () => {
    /** States */
    const [applyFilters, setApplyFilters] = useState<MovieApiParamType>({});

    /** Hooks */
    const { data, isFetching } = useMovieWithFilterQuery(applyFilters);

    return (
        <Box
            py={4}
            display="flex"
            gap={4}
            flexDirection={{ xs: 'column', md: 'row' }}
        >
            <MovieFilters setApplyFilters={setApplyFilters} />
            <Stack flex={1} height="100%" gap={4}>
                <Typography variant="h2" pl={2}>
                    Movies
                </Typography>
                {isFetching ? (
                    <GridList
                        itemsList={Array.from({ length: 8 })}
                        renderItem={(_, index) => <MovieSkeleton key={index} />}
                    />
                ) : data?.length === 0 ? (
                    <Stack
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        gap={2}
                        p={4}
                        textAlign="center"
                    >
                        <Typography variant="h2">No movies found</Typography>
                        <Typography variant="h4" color="textSecondary">
                            Try adjusting your filters or clearing them to see
                            more results.
                        </Typography>
                    </Stack>
                ) : (
                    <GridList
                        itemsList={data ?? []}
                        renderItem={(movie) => <MovieCard movie={movie} />}
                    />
                )}
            </Stack>
        </Box>
    );
};
