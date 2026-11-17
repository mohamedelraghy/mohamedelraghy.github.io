import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';

import { printStyles, reducedMotionStyles, theme } from '@/app/theme';
import { Contact } from '@/features/contact';
import { Education } from '@/features/education';
import { Experience } from '@/features/experience';
import { Header } from '@/features/header';
import { Hero } from '@/features/hero';
import { Highlights } from '@/features/highlights';
import { Projects } from '@/features/projects';
import { Skills } from '@/features/skills';

export const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={reducedMotionStyles} />
            <GlobalStyles styles={printStyles} />
            <Box
                sx={{
                    boxSizing: 'border-box',
                    width: '100%',
                    maxWidth: { lg: '1040px', xl: '1240px' },
                    margin: '0 auto',
                    padding: {
                        xs: '20px 16px 60px',
                        md: '28px 24px 80px',
                        xl: '44px 40px 120px'
                    }
                }}
            >
                <Header />
                <main>
                    <Hero />
                    <Highlights />
                    <Experience />
                    <Projects />
                    <Skills />
                    <Education />
                </main>
                <Contact />
            </Box>
        </ThemeProvider>
    );
};
