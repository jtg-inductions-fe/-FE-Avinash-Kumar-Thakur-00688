import { Search } from '@mui/icons-material';
import { AutocompleteRenderInputParams, InputAdornment } from '@mui/material';

import { StyledTextField } from './Search.styles';

/**
 * Custom search field for the autocomplete inputs
 *
 * @param params - Render input params
 */
export const SearchField = (params: AutocompleteRenderInputParams) => (
    <StyledTextField
        placeholder="Search"
        {...params}
        slotProps={{
            input: {
                ...params.InputProps,
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
            },
        }}
    />
);
