import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface SectionLabelProps {
    children: ReactNode;
    id?: string;
}

export const SectionLabel = ({ children, id }: SectionLabelProps) => {

    return (
        <Typography
            component="h2"
            id={id}
            sx={(theme) => ({
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: theme.palette.portfolio.muted,
                margin: '0 0 14px'
            })}
        >
            {children}
        </Typography>
    );
};
