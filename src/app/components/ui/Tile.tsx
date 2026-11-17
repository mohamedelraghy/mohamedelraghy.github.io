import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

interface TileProps {
    variant?: 'plain' | 'dark' | 'accent';
    label?: string;
    href?: string;
    download?: boolean;
    sx?: SxProps<Theme>;
    children: ReactNode;
}

export const Tile = ({ variant = 'plain', label, href, download, sx, children }: TileProps) => {
    const isLink = href !== undefined;

    return (
        <Box
            component={isLink ? 'a' : 'div'}
            href={href}
            download={isLink ? download : undefined}
            sx={[
                (theme) => {
                    const { portfolio } = theme.palette;
                    const variantStyles = {
                        plain: {
                            backgroundColor: portfolio.tile,
                            color: 'inherit',
                            border: `1px solid ${portfolio.line}`,
                            labelColor: portfolio.muted
                        },
                        dark: {
                            backgroundColor: portfolio.ink,
                            color: portfolio.background,
                            border: 'none',
                            labelColor: portfolio.darkMuted
                        },
                        accent: {
                            backgroundColor: portfolio.accent,
                            color: theme.palette.common.white,
                            border: 'none',
                            labelColor: portfolio.onAccent
                        }
                    }[variant];

                    return {
                        display: 'block',
                        boxSizing: 'border-box',
                        textDecoration: 'none',
                        cursor: isLink ? 'pointer' : 'default',
                        backgroundColor: variantStyles.backgroundColor,
                        color: variantStyles.color,
                        border: variantStyles.border,
                        borderRadius: '14px',
                        padding: '14px',
                        transition: 'transform .25s, box-shadow .25s, border-color .25s',
                        [theme.breakpoints.up('md')]: {
                            borderRadius: '16px',
                            padding: '16px'
                        },
                        [theme.breakpoints.up('xl')]: {
                            padding: '22px'
                        },
                        '@media (hover: hover)': {
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 12px 28px rgba(12, 10, 9, .07)',
                                ...(variant === 'plain' && { borderColor: portfolio.hoverLine })
                            }
                        },
                        '& .tile-label': {
                            display: 'block',
                            fontSize: '12px',
                            color: variantStyles.labelColor,
                            marginBottom: '6px'
                        }
                    };
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            {label && <Box component="span" className="tile-label">{label}</Box>}
            {children}
        </Box>
    );
};
