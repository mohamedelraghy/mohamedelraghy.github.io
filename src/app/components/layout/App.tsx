import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';

import { reducedMotionStyles, theme } from '@/app/theme';
import { Education } from '@/features/education';
import { Experience } from '@/features/experience';
import { Header } from '@/features/header';
import { Hero } from '@/features/hero';
import { Highlights } from '@/features/highlights';
import { HomePage } from '@/features/home';
import { Projects } from '@/features/projects';
import { Skills } from '@/features/skills';

export const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={reducedMotionStyles} />
            <main>
                <Header />
                <Hero />
                <Highlights />
                <Experience />
                <Projects />
                <Skills />
                <Education />
                <HomePage />
            </main>
        </ThemeProvider>
    );
};
