import { SetURLSearchParams } from 'react-router-dom';

import { FilterOptionsType, MovieApiParamType } from '@services';

/**
 * Type of the query state
 */
export type QueryState<T> = {
    /**
     * Data of the query result
     */
    data: T | undefined;
    /**
     * Loading state of the query result
     */
    isLoading: boolean;
    /**
     * Error state of the query result
     */
    isError: boolean;
};

/**
 * Type of the movie filter props
 */
export interface MovieFiltersProps {
    /**
     * Language object that need to be used in filters
     */
    languageObj: QueryState<FilterOptionsType>;
    /**
     * Genres object that need to be used in filters
     */
    genreObj: QueryState<FilterOptionsType>;
    /**
     * Filters that applied
     */
    appliedFilters: MovieApiParamType;
    /**
     * Function used to applied when click the apply filter button
     */
    setApplyFilters: (data: MovieApiParamType) => void;
    /**
     * Function that triggers refetch filters when there occurs any error
     */
    handleRefetchFilters: () => void;
    /**
     * State that used to remove filters from url params
     */
    setSearchParams: SetURLSearchParams;
    /**
     * Optional function to close filter modal
     */
    onClose?: () => void;
}
