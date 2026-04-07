import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

import { FilterAlt } from '@mui/icons-material';
import {
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { CustomModal, GridList, MovieCard, MovieSkeleton } from '@components';
import { SKELETON_COUNT } from '@constant';
import { MovieFilters } from '@containers/MovieFilters';
import {
    MovieApiParamType,
    useGenresQuery,
    useLanguagesQuery,
    useMovieWithFilterQuery,
} from '@services';

/**
 * Container display movies and their filter panel
 */
export const MovieWithFilters = () => {
    /** States */
    const [applyFilters, setApplyFilters] = useState<MovieApiParamType>({});
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [hydrated, setHydrated] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    /** Hooks */
    const { breakpoints } = useTheme();
    const isMobile = useMediaQuery(breakpoints.down('lg'));
    const languages = useLanguagesQuery();
    const genres = useGenresQuery();
    const { data, isLoading, isError, refetch } = useMovieWithFilterQuery(
        applyFilters,
        { skip: !hydrated },
    );

    /** Constants */
    const languageObj = {
        data: languages.data,
        isError: languages.isError,
        isLoading: languages.isLoading,
    };
    const genreObj = {
        data: genres.data,
        isError: genres.isError,
        isLoading: genres.isLoading,
    };

    /**
     * Functions
     */
    /**
     * Function that used to set the params in the url and set the filter states
     */
    const handleApplyFilters = (filters: MovieApiParamType) => {
        const params = new URLSearchParams();

        if (filters.languages) {
            params.append(
                'languages',
                filters.languages.map((lang) => lang.label).join(','),
            );
        }

        if (filters.genres) {
            params.append(
                'genres',
                filters.genres.map((genre) => genre.label).join(','),
            );
        }

        if (filters.date) {
            params.set('date', filters.date);
        }

        setSearchParams(params, { replace: true });
        setApplyFilters(filters);
    };

    /**
     * Function that handle refetching of filters
     */
    const handleRefetchFilters = async () => {
        await languages.refetch();
        await genres.refetch();
    };

    /**
     * Function that trigger when modal opens
     */
    const handleOpen = () => setModalOpen(true);

    /**
     * Function that trigger when modal closes
     */
    const handleClose = () => setModalOpen(false);

    /** Effects */
    useEffect(() => {
        const languageData = languages.data;
        const genreData = genres.data;

        if (!languageData || !genreData) return;

        const languagesParam = searchParams.get('languages')?.split(',') || [];
        const genresParam = searchParams.get('genres')?.split(',') || [];
        const dateParam = searchParams.get('date');

        const selectedLanguages =
            languageData?.filter((lang) =>
                languagesParam.includes(lang.label),
            ) || [];

        const selectedGenres =
            genreData?.filter((genre) => genresParam.includes(genre.label)) ||
            [];

        const selectedDate = dateParam ? dayjs(dateParam) : null;

        const nextFilters: MovieApiParamType = {};

        if (selectedLanguages.length > 0) {
            nextFilters.languages = selectedLanguages;
        }

        if (selectedGenres.length > 0) {
            nextFilters.genres = selectedGenres;
        }

        if (selectedDate) {
            nextFilters.date = selectedDate.format('YYYY-MM-DD');
        }

        setApplyFilters(nextFilters);
        setHydrated(true);
    }, [searchParams, languages, genres, setApplyFilters]);

    return (
        <Box
            py={4}
            display="flex"
            gap={4}
            flexDirection={{ xs: 'column', md: 'row' }}
        >
            <Stack flex={1} height="100%" gap={4}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h2" pl={2}>
                        Movies
                    </Typography>
                    {isMobile && (
                        <IconButton
                            onClick={handleOpen}
                            aria-label="open movie filters"
                        >
                            <FilterAlt />
                        </IconButton>
                    )}
                </Box>

                {isLoading && !data && (
                    <GridList
                        itemSize={{ xs: 12, sm: 6, md: 4, xl: 3 }}
                        itemsList={Array.from({ length: SKELETON_COUNT })}
                        renderItem={(_, index) => <MovieSkeleton key={index} />}
                    />
                )}

                {isError && (
                    <Stack
                        flex={1}
                        gap={2}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography
                            variant="h4"
                            color="error"
                            textAlign="center"
                        >
                            Failed to load movies. Please try again.
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
                        <Typography variant="h2">No movies found</Typography>
                        <Typography variant="h4" color="textSecondary">
                            Try adjusting your filters or clearing them to see
                            more results.
                        </Typography>
                    </Stack>
                )}

                {data && data.length > 0 && (
                    <GridList
                        itemSize={{ xs: 12, sm: 6, md: 4, xl: 3 }}
                        itemsList={data ?? []}
                        renderItem={(movie) => <MovieCard movie={movie} />}
                    />
                )}
            </Stack>

            {isMobile ? (
                <CustomModal open={modalOpen} onClose={handleClose}>
                    <MovieFilters
                        languageObj={languageObj}
                        genreObj={genreObj}
                        appliedFilters={applyFilters}
                        setApplyFilters={handleApplyFilters}
                        handleRefetchFilters={handleRefetchFilters}
                        setSearchParams={setSearchParams}
                        onClose={handleClose}
                    />
                </CustomModal>
            ) : (
                <MovieFilters
                    languageObj={languageObj}
                    genreObj={genreObj}
                    appliedFilters={applyFilters}
                    setApplyFilters={handleApplyFilters}
                    handleRefetchFilters={handleRefetchFilters}
                    setSearchParams={setSearchParams}
                />
            )}
        </Box>
    );
};
