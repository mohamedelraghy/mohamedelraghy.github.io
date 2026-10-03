import { createTheme } from '@mui/material/styles';

const MONO_FONT = ['JetBrains Mono', 'ui-monospace', 'monospace'].join(',');
const SANS_FONT = ['Inter', 'system-ui', 'sans-serif'].join(',');

export const THEME = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class'
    },
    colorSchemes: {
        dark: {
            palette: {
                primary: { main: '#3fb950' },
                secondary: { main: '#58a6ff' },
                background: {
                    default: '#0d1117',
                    paper: '#161b22'
                },
                text: {
                    primary: '#e6edf3',
                    secondary: '#8b949e'
                },
                divider: '#30363d'
            }
        },
        light: {
            palette: {
                primary: { main: '#1a7f37' },
                secondary: { main: '#0969da' },
                background: {
                    default: '#ffffff',
                    paper: '#f6f8fa'
                },
                text: {
                    primary: '#1f2328',
                    secondary: '#59636e'
                },
                divider: '#d1d9e0'
            }
        }
    },
    typography: {
        fontFamily: SANS_FONT,
        h1: { fontFamily: MONO_FONT, fontWeight: 700 },
        h2: { fontFamily: MONO_FONT, fontWeight: 700 },
        h3: { fontFamily: MONO_FONT, fontWeight: 500 },
        h4: { fontFamily: MONO_FONT, fontWeight: 500 },
        button: { fontFamily: MONO_FONT, textTransform: 'none' }
    },
    shape: {
        borderRadius: 6
    }
});

export const MONO_FONT_FAMILY = MONO_FONT;
