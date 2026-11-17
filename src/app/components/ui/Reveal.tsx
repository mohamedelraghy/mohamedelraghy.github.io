import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { useInView } from '@/app/hooks';
import { EASE_OUT, fadeUp } from '@/app/theme';

interface RevealProps {
    delaySeconds?: number;
    children: ReactNode;
    sx?: SxProps<Theme>;
}

export const Reveal = ({ delaySeconds = 0, children, sx }: RevealProps) => {
    const { ref, inView } = useInView<HTMLDivElement>();

    return (
        <Box
            ref={ref}
            sx={[
                inView
                    ? { animation: `${fadeUp} 0.7s ${EASE_OUT} ${delaySeconds}s both` }
                    : { opacity: 0, transform: 'translateY(14px)' },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            {children}
        </Box>
    );
};
