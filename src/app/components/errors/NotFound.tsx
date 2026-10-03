import { Link as RouterLink } from 'react-router';

import { Button, Stack, Typography } from '@mui/material';

import { TerminalPrompt } from '@/components';
import { MONO_FONT_FAMILY } from '@/features/theme';
import { PATHS } from '@/router/constants';

export const NotFound = () => (
    <Stack spacing={2} sx={{ py: 10, alignItems: 'flex-start' }}>
        <TerminalPrompt command={`cd ${window.location.pathname}`} />
        <Typography color='error' sx={{ fontFamily: MONO_FONT_FAMILY }}>
            bash: cd: {window.location.pathname}: No such file or directory (404)
        </Typography>
        <Button variant='outlined' component={RouterLink} to={PATHS.HOME}>
            cd ~
        </Button>
    </Stack>
);
