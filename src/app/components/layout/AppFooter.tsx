import { Box, Container, Typography } from '@mui/material';

import { PROFILE } from '@/features/profile';
import { MONO_FONT_FAMILY } from '@/features/theme';

export const AppFooter = () => (
    <Box component='footer' sx={{ borderTop: 1, borderColor: 'divider', py: 4 }}>
        <Container maxWidth='md'>
            <Typography variant='body2' color='textSecondary' sx={{ fontFamily: MONO_FONT_FAMILY }}>
                © {new Date().getFullYear()} {PROFILE.name} · built with React + MUI
            </Typography>
        </Container>
    </Box>
);
