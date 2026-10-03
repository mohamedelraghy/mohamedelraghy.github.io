import type { ReactNode } from 'react';

import { Box } from '@mui/material';

import { TerminalPrompt } from '../display/TerminalPrompt';

interface SectionProps {
    id: string;
    command?: string;
    children: ReactNode;
}

export const Section = ({ id, command, children }: SectionProps) => (
    <Box
        component='section'
        id={id}
        sx={{
            py: { xs: 6, md: 10 },
            scrollMarginTop: 64
        }}>
        {command && <TerminalPrompt command={command} />}
        {children}
    </Box>
);
