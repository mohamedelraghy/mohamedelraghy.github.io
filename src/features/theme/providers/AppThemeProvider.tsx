import type { ReactNode } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { THEME } from '../constants';

interface AppThemeProviderProps {
    children: ReactNode;
}

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => (
    <ThemeProvider theme={THEME} defaultMode='dark'>
        <CssBaseline />
        {children}
    </ThemeProvider>
);
