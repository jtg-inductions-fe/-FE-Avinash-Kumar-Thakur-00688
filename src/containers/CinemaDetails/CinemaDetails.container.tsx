import { useParams } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import { DataState, DetailsCard } from '@components';
import { MovieSlot } from '@containers/MovieSlot';
import { useCinemaDetailsQuery } from '@services';

/**
 * Container display cinema details with slot details
 */
export const CinemaDetailsContainer = () => {
    /** Hooks */
    const { id = '' } = useParams();
    const { data, isFetching, isError } = useCinemaDetailsQuery(id, {
        skip: !id,
    });

    return (
        <Stack flex={1} py={4} gap={5}>
            <DataState
                isLoading={isFetching}
                isEmpty={!data}
                emptyState={{
                    title: 'Cinema Not Found',
                    subtitle:
                        'We could not find the cinema you are looking for.',
                }}
                isError={isError}
                errorState="Failed to load cinema details. Please try again."
            >
                <Stack py={4} gap={6}>
                    <DetailsCard
                        title={data?.name || ''}
                        subtitle={data?.location || ''}
                    />
                    <Stack gap={2}>
                        <Typography variant="h2">Shows</Typography>
                        <DataState
                            isEmpty={data?.movies?.length === 0}
                            emptyState={{
                                subtitle: 'Oops! No shows available',
                            }}
                        >
                            <MovieSlot key={id} movies={data?.movies || []} />
                        </DataState>
                    </Stack>
                </Stack>
            </DataState>
        </Stack>
    );
};
