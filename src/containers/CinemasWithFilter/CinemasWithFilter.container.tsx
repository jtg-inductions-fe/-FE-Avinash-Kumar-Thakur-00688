import { useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import {
    Box,
    Button,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { CinemaCard, CinemaSkeleton, GridList, Search } from '@components';
import { SKELETON_COUNT } from '@constant';
import { useCinemaWithFilterQuery } from '@services';

/**
 * Container display cinema list with filter functionality
 */
export const CinemasWithFilter = () => {
    /** States */
    const [searchParams, setSearchParams] = useSearchParams();
    const [city, setCity] = useState<string>(searchParams.get('city') || '');

    /** Hooks */
    const { breakpoints, palette } = useTheme();
    const isDesktop = useMediaQuery(breakpoints.up('sm'));
    const { data, isLoading, isError, refetch } = useCinemaWithFilterQuery({
        city: city.trim() || undefined,
    });

    const handleSearch = (value: string) => {
        if (value) {
            setSearchParams(
                { city: encodeURIComponent(value) },
                { replace: true },
            );
        } else {
            setSearchParams({}, { replace: true });
        }
        setCity(value);
    };

    return (
        <Stack py={4} gap={5} flex={1}>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={2}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                sx={{ background: palette.background.paper }}
            >
                <Typography variant="h2">Cinemas</Typography>
                {!isLoading && data && (
                    <Box width={isDesktop ? 350 : '100%'}>
                        <Search
                            placeholder="Search by city name"
                            data={city}
                            setData={handleSearch}
                            size="small"
                        />
                    </Box>
                )}
            </Box>

            {isLoading && !data && (
                <GridList
                    itemsList={Array.from({ length: SKELETON_COUNT })}
                    renderItem={(_, index) => <CinemaSkeleton key={index} />}
                />
            )}

            {isError && (
                <Stack
                    flex={1}
                    gap={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h4" color="error" textAlign="center">
                        Failed to load cinemas. Please try again.
                    </Typography>
                    <Button variant="contained" onClick={() => refetch()}>
                        Retry
                    </Button>
                </Stack>
            )}

            {data && data?.length === 0 && (
                <Stack
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                    p={4}
                    textAlign="center"
                >
                    <Typography variant="h2">No cinemas available</Typography>
                    <Typography variant="h4" color="textSecondary">
                        Try adjusting your location or clearing them to see more
                        results.
                    </Typography>
                </Stack>
            )}

            {data && data.length > 0 && (
                <GridList
                    itemsList={data}
                    renderItem={(cinema) => <CinemaCard cinema={cinema} />}
                />
            )}
        </Stack>
    );
};
