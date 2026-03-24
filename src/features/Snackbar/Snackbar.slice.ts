import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SnackbarPayload, SnackbarStateType } from './Snackbar.types';

/**
 * Initial state of the snackbar
 */
const initialState: SnackbarStateType = {
    open: false,
    message: '',
    severity: 'info',
};

/**
 * Slice represent the snackbar state
 */
const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        /**
         * To show the snackbar on some action
         */
        showSnackbar: (state, action: PayloadAction<SnackbarPayload>) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity || 'info';
        },
        /**
         * Hide snackbar from the page
         */
        hideSnackbar: (state) => {
            state.open = false;
        },
    },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export const snackbarReducer = snackbarSlice.reducer;
