import { ReactNode } from 'react';

/**
 * Type of empty content displayed when no data available
 */
export interface EmptyData {
    /**
     * Title of the empty content
     */
    title?: string;
    /**
     * Optional subtitle of the empty content
     */
    subtitle?: string;
}

/**
 * Type of the props for the data state component
 */
export interface DataStateProps {
    /**
     * State to check whether data is loading or not
     */
    isLoading?: boolean;
    /**
     * Content displayed when data is loading
     */
    loadingState?: ReactNode;
    /**
     * State to track whether data is available or not
     */
    isEmpty?: boolean;
    /**
     * Content displayed when no data available
     */
    emptyState?: EmptyData;
    /**
     * State to check whether api throw any error
     */
    isError?: boolean;
    /**
     * Content to be displayed when any error occurs
     */
    errorState?: ReactNode;
    /**
     * Children displayed when data is available
     */
    children: ReactNode;
}
