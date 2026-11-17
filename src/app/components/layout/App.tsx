import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';

import { reducedMotionStyles, theme } from '@/app/theme';
import { Header } from '@/features/header';
import { HomePage } from '@/features/home';

export const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={reducedMotionStyles} />
            <main>
                <Header />
                <HomePage />
            </main>
        </ThemeProvider>
    );
};
