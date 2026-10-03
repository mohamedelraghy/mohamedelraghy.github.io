import { Box, Typography } from '@mui/material';

import { MONO_FONT_FAMILY } from '@/features/theme';

interface TerminalPromptProps {
    command: string;
}

export const TerminalPrompt = ({ command }: TerminalPromptProps) => (
    <Typography
        component='h2'
        sx={{
            fontFamily: MONO_FONT_FAMILY,
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            fontWeight: 500,
            mb: 3
        }}>
        <Box component='span' sx={{ color: 'primary.main' }}>$ </Box>
        {command}
    </Typography>
);
