import { CircularProgress, Stack, Typography } from '@mui/material';

import { DataStateProps } from './DataState.types';

/**
 * This component handle different states of data
 *
 * @param isLoading - State to check whether the data is loading or not
 * @param loadingState - Content displayed when data is loading
 * @param isEmpty - State to check whether the data is empty
 * @param emptyState - Content displayed when there is no data
 * @param children - Content display when there is data available
 */
export const DataState = (props: DataStateProps) => {
    /** Props */
    const {
        isLoading,
        loadingState,
        isEmpty,
        emptyState,
        isError,
        errorState,
        children,
    } = props;

    /** Loading State */
    if (isLoading) {
        return loadingState ? (
            loadingState
        ) : (
            <Stack flex={1} justifyContent="center" alignItems="center">
                <CircularProgress />
            </Stack>
        );
    }

    /** Error state */
    if (isError) {
        return (
            <Stack
                flex={1}
                justifyContent="center"
                alignItems="center"
                textAlign="center"
            >
                <Typography variant="h2" color="error">
                    {errorState}
                </Typography>
            </Stack>
        );
    }

    /** Empty state */
    if (isEmpty) {
        return (
            <Stack
                flex={1}
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                gap={2}
            >
                {emptyState?.title && (
                    <Typography variant="h2">{emptyState.title}</Typography>
                )}
                {emptyState?.subtitle && (
                    <Typography variant="h4" color="textSecondary">
                        {emptyState.subtitle}
                    </Typography>
                )}
            </Stack>
        );
    }

    return <>{children}</>;
};
