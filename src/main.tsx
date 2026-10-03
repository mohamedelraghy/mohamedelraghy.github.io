import './index.css';

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { AppThemeProvider } from '@/features/theme';

import { AppContainer } from '@/app/components';

const root = createRoot(document.getElementById('root')!);

root.render(
    <StrictMode>
        <AppThemeProvider>
            <AppContainer />
        </AppThemeProvider>
    </StrictMode>
);
