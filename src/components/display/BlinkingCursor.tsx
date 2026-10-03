import { Box } from '@mui/material';
import { keyframes } from '@mui/material/styles';

const blink = keyframes`
    50% { opacity: 0; }
`;

export const BlinkingCursor = () => (
    <Box
        component='span'
        aria-hidden
        sx={{
            display: 'inline-block',
            width: '0.6em',
            height: '1em',
            ml: 0.5,
            verticalAlign: 'text-bottom',
            bgcolor: 'primary.main',
            animation: `${blink} 1s step-end infinite`,
            '@media (prefers-reduced-motion: reduce)': {
                animation: 'none'
            }
        }}
    />
);
