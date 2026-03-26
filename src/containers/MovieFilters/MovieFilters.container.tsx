import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import { Dayjs } from 'dayjs';

import { Button, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { Filter } from '@components';
import {
    FilterOptionType,
    MovieApiParamType,
    useGenresQuery,
    useLanguagesQuery,
} from '@services';

/**
 * Container consist of different movie filters
 *
 * @param setApplyFilters - Function to set the filter value which trigger the movie filter api
 */
export const MovieFilters = ({
    setApplyFilters,
}: {
    setApplyFilters: Dispatch<SetStateAction<MovieApiParamType>>;
}) => {
    /** States */
    const [languages, setLanguages] = useState<FilterOptionType>([]);
    const [genres, setGenres] = useState<FilterOptionType>([]);
    const [date, setDate] = useState<Dayjs | null>(null);

    /** Hooks */
    const { data: languageData, isLoading: languageLoading } =
        useLanguagesQuery();
    const { data: genreData, isLoading: genreLoading } = useGenresQuery();

    /** Functions */
    /**
     * Function handle apply filters
     */
    const handleApplyFilters = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setApplyFilters({
            languages: languages?.map((lang) => lang.id).join(','),
            genres: genres?.map((genre) => genre.id).join(','),
            date: date?.format('YYYY-MM-DD'),
        });
    };

    /**
     * Function that remove all the filters
     */
    const handleRemoveFilters = () => {
        setLanguages([]);
        setGenres([]);
        setDate(null);
        setApplyFilters({});
    };

    /** Constants */
    const isFilterSEmpty =
        languages.length === 0 && genres.length === 0 && !date;

    return (
        <Stack
            component="form"
            onSubmit={handleApplyFilters}
            width={{ xs: '100%', md: 280 }}
            gap={4}
        >
            <Typography variant="h2">Filters</Typography>
            <Filter
                listItems={languageData || []}
                value={languages}
                setValue={setLanguages}
                label="Languages"
                isMultiple={true}
                onLoading={languageLoading}
            />
            <Filter
                listItems={genreData || []}
                value={genres}
                setValue={setGenres}
                label="Genres"
                isMultiple={true}
                onLoading={genreLoading}
            />
            <DatePicker
                label="Date"
                value={date ?? null}
                slotProps={{ textField: { readOnly: true } }}
                onChange={(newDate) => setDate(newDate)}
                disablePast
            />
            <Stack gap={1}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ py: 3, mt: 3 }}
                    disabled={isFilterSEmpty}
                >
                    Apply Filters
                </Button>
                <Button
                    variant="outlined"
                    sx={{ py: 3, mt: 3 }}
                    onClick={handleRemoveFilters}
                    disabled={isFilterSEmpty}
                >
                    Remove Filters
                </Button>
            </Stack>
        </Stack>
    );
};
