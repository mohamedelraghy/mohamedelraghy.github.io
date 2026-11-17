import { createTheme, type Shadows } from '@mui/material/styles';

interface PortfolioPalette {
    background: string;
    ink: string;
    muted: string;
    line: string;
    tile: string;
    accent: string;
    statusDot: string;
    onAccent: string;
    darkMuted: string;
    chipText: string;
    hoverLine: string;
}

declare module '@mui/material/styles' {
    interface Palette {
        portfolio: PortfolioPalette;
    }
    interface PaletteOptions {
        portfolio?: PortfolioPalette;
    }
}

const portfolio: PortfolioPalette = {
    background: '#fafaf9',
    ink: '#0c0a09',
    muted: '#78716c',
    line: '#e7e5e4',
    tile: '#ffffff',
    accent: '#059669',
    statusDot: '#16a34a',
    onAccent: '#d1fae5',
    darkMuted: '#a8a29e',
    chipText: '#44403c',
    hoverLine: '#d6d3d1'
};

export const theme = createTheme({
    breakpoints: {
        values: { xs: 0, sm: 360, md: 600, lg: 1024, xl: 1440 }
    },
    palette: {
        primary: { main: portfolio.accent },
        background: { default: portfolio.background },
        text: { primary: portfolio.ink, secondary: portfolio.muted },
        portfolio
    },
    shape: { borderRadius: 16 },
    typography: {
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        h1: {
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.08,
            fontSize: 'clamp(34px, 7vw, 84px)'
        }
    },
    shadows: Array(25).fill('none') as Shadows,
    components: {
        MuiButtonBase: {
            defaultProps: { disableRipple: true }
        },
        MuiCssBaseline: {
            styleOverrides: {
                html: { scrollBehavior: 'smooth' },
                '[id]': { scrollMarginTop: '24px' },
                ':focus-visible': {
                    outline: `2px solid ${portfolio.accent}`,
                    outlineOffset: '3px'
                }
            }
        }
    }
});
