import { Link as RouterLink } from 'react-router';

import { AppBar, Box, Container, Link, Stack, Toolbar } from '@mui/material';

import { NAV_ITEMS } from '@/app/constants';
import { PROFILE } from '@/features/profile';
import { MONO_FONT_FAMILY, ThemeToggle } from '@/features/theme';
import { PATHS } from '@/router/constants';

export const AppHeader = () => (
    <AppBar
        position='sticky'
        elevation={0}
        sx={{
            bgcolor: 'background.default',
            color: 'text.primary',
            borderBottom: 1,
            borderColor: 'divider'
        }}>
        <Container maxWidth='md'>
            <Toolbar disableGutters sx={{ gap: 2, fontFamily: MONO_FONT_FAMILY }}>
                <Link
                    component={RouterLink}
                    to={PATHS.HOME}
                    underline='none'
                    sx={{ fontWeight: 700, color: 'primary.main' }}>
                    ~/{PROFILE.handle}
                </Link>
                <Box sx={{ flex: 1 }} />
                <Stack
                    component='nav'
                    direction='row'
                    spacing={2}
                    sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    {NAV_ITEMS.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            underline='hover'
                            color='textSecondary'
                            sx={{ fontSize: '0.9rem', '&:hover': { color: 'primary.main' } }}>
                            {item.label}
                        </Link>
                    ))}
                </Stack>
                <ThemeToggle />
            </Toolbar>
        </Container>
    </AppBar>
);
