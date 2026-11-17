import Box from '@mui/material/Box';
import type { MouseEvent, ReactNode } from 'react';

interface UnderlineLinkProps {
    href: string;
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    external?: boolean;
    download?: boolean;
}

export const UnderlineLink = ({ href, children, onClick, external, download }: UnderlineLinkProps) => {

    return (
        <Box
            component="a"
            href={href}
            download={download}
            onClick={onClick}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            sx={(theme) => ({
                position: 'relative',
                fontWeight: 600,
                color: theme.palette.portfolio.ink,
                textDecoration: 'none',
                cursor: 'pointer',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: '-3px',
                    height: '2px',
                    width: '100%',
                    backgroundColor: theme.palette.portfolio.accent,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform .3s'
                },
                '&:hover::after, &:focus-visible::after': {
                    transform: 'scaleX(1)'
                }
            })}
        >
            {children}
        </Box>
    );
};
