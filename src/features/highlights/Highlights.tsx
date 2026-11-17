import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { DrawLine, Reveal, Tile, tileGridGap } from '@/app/components';
import { pulse } from '@/app/theme';
import { profile } from '@/data';

interface SmallTile {
    key: string;
    label: string;
    delaySeconds: number;
    variant?: 'plain' | 'accent';
    href?: string;
    download?: boolean;
    content: ReactNode;
}

const textStyles: SxProps<Theme> = { fontSize: '15px', fontWeight: 700 };

export const Highlights = () => {
    const { about, status, cv, nowAt, lately } = profile.highlights;

    const smallTiles: SmallTile[] = [
        ...(status.show
            ? [{
                key: 'status',
                label: status.label,
                delaySeconds: 0.5,
                content: (
                    <Box component="strong" sx={textStyles}>
                        <Box
                            component="span"
                            sx={(theme) => ({
                                display: 'inline-block',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: theme.palette.portfolio.statusDot,
                                marginRight: '8px',
                                animation: `${pulse} 1.6s infinite`
                            })}
                        />
                        {status.text}
                    </Box>
                )
            }]
            : []),
        {
            key: 'cv',
            label: cv.label,
            delaySeconds: 0.5,
            variant: 'accent',
            href: profile.cvHref,
            download: true,
            content: <Box component="strong" sx={{ fontSize: '19px', fontWeight: 800 }}>{cv.text}</Box>
        },
        {
            key: 'nowAt',
            label: nowAt.label,
            delaySeconds: 0.65,
            content: <Box component="strong" sx={textStyles}>{nowAt.text}</Box>
        },
        {
            key: 'lately',
            label: lately.label,
            delaySeconds: 0.65,
            content: <Box component="strong" sx={textStyles}>{lately.text}</Box>
        }
    ];

    // An odd number of small tiles would leave a hole next to the last one,
    // so that tile spans both columns (from sm up, where there are two columns).
    const hasOddSmallTiles = smallTiles.length % 2 === 1;

    return (
        <>
            <Box
                sx={(theme) => ({
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'minmax(0, 1fr)',
                        sm: 'repeat(2, minmax(0, 1fr))',
                        md: 'repeat(2, minmax(0, 1fr))',
                        lg: 'repeat(4, minmax(0, 1fr))'
                    },
                    gap: tileGridGap,
                    gridAutoRows: 'minmax(84px, auto)',
                    [theme.breakpoints.up('md')]: {
                        gridAutoRows: 'minmax(96px, auto)'
                    },
                    [theme.breakpoints.up('xl')]: {
                        gridAutoRows: 'minmax(120px, auto)'
                    }
                })}
            >
                <Reveal
                    delaySeconds={0.35}
                    sx={{
                        gridColumn: { xs: 'auto', sm: '1 / -1', lg: 'span 2' },
                        gridRow: { xs: 'auto', lg: 'span 2' }
                    }}
                >
                    <Tile
                        variant="dark"
                        label={about.label}
                        sx={(theme) => ({
                            height: '100%',
                            '& strong': {
                                fontSize: '16px',
                                fontWeight: 600,
                                lineHeight: 1.4,
                                overflowWrap: 'anywhere',
                                [theme.breakpoints.up('md')]: { fontSize: '18px' },
                                [theme.breakpoints.up('xl')]: { fontSize: '22px' }
                            }
                        })}
                    >
                        <strong>{about.text}</strong>
                    </Tile>
                </Reveal>
                {smallTiles.map((tile, index) => {
                    const isLast = index === smallTiles.length - 1;

                    return (
                        <Reveal
                            key={tile.key}
                            delaySeconds={tile.delaySeconds}
                            sx={isLast && hasOddSmallTiles ? { gridColumn: { sm: 'span 2' } } : undefined}
                        >
                            <Tile
                                variant={tile.variant}
                                label={tile.label}
                                href={tile.href}
                                download={tile.download}
                                sx={{ height: '100%' }}
                            >
                                {tile.content}
                            </Tile>
                        </Reveal>
                    );
                })}
            </Box>
            <DrawLine delaySeconds={1.1} />
        </>
    );
};
