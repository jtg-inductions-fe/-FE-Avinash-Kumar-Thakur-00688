import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Router } from 'routes';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { PageLoader } from '@components';
import { store } from '@store';
import { theme } from '@theme';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<PageLoader />}>
                <Provider store={store}>
                    <RouterProvider router={Router} />
                </Provider>
            </Suspense>
        </ThemeProvider>
    </StrictMode>,
);
