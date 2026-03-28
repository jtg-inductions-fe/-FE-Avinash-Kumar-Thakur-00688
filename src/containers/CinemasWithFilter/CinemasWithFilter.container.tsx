import { useState } from 'react';

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import {
    CinemaCard,
    CinemaSkeleton,
    DataState,
    GridList,
    Search,
} from '@components';
import { useCinemaWithFilterQuery } from '@services';

/**
 * Container display cinema list with filter functionality
 */
export const CinemasWithFilter = () => {
    /** States */
    const [city, setCity] = useState<string>('');

    /** Hooks */
    const { breakpoints, palette } = useTheme();
    const isMobile = useMediaQuery(breakpoints.up('sm'));
    const { data, isLoading, isError } = useCinemaWithFilterQuery({ city });

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
                <Box width={!isMobile ? '100%' : 350}>
                    <Search
                        placeholder="Search by city name"
                        setData={setCity}
                        size="small"
                    />
                </Box>
            </Box>

            <DataState
                isLoading={isLoading}
                loadingState={
                    <GridList
                        itemsList={Array.from({ length: 8 })}
                        renderItem={(_, index) => (
                            <CinemaSkeleton key={index} />
                        )}
                    />
                }
                isEmpty={data?.length === 0}
                emptyState={{
                    title: ' No cinemas available',
                }}
                isError={isError}
                errorState="Failed to load cinemas. Please try again."
            >
                <GridList
                    itemsList={data ?? []}
                    renderItem={(cinema) => <CinemaCard cinema={cinema} />}
                />
            </DataState>
        </Stack>
    );
};
