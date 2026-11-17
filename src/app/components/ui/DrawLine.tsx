import Box from '@mui/material/Box';

import { useInView } from '@/app/hooks';
import { drawLine } from '@/app/theme';

interface DrawLineProps {
    delaySeconds?: number;
}

export const DrawLine = ({ delaySeconds = 0 }: DrawLineProps) => {
    const { ref, inView } = useInView<HTMLDivElement>();

    return (
        <Box
            ref={ref}
            className="draw-line"
            sx={(theme) => ({
                height: '2px',
                backgroundColor: theme.palette.portfolio.ink,
                margin: '28px 0',
                [theme.breakpoints.up('md')]: {
                    margin: '40px 0'
                },
                width: inView ? '100%' : 0,
                animation: inView ? `${drawLine} 1.1s ease ${delaySeconds}s both` : 'none'
            })}
        />
    );
};
