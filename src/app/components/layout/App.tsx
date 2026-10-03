import { Suspense } from 'react';

import { Outlet } from 'react-router';

import { Container, Stack } from '@mui/material';

import { Loading } from '../feedback/Loading';
import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';

export const App = () => (
    <Stack sx={{ minHeight: '100vh' }}>
        <AppHeader />
        <Container component='main' maxWidth='md' sx={{ flex: 1 }}>
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
        </Container>
        <AppFooter />
    </Stack>
);
