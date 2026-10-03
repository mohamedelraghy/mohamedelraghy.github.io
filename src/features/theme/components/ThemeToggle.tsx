import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import { IconButton, Tooltip, useColorScheme } from '@mui/material';

export const ThemeToggle = () => {

    const { mode, systemMode, setMode } = useColorScheme();

    const resolvedMode = mode === 'system' ? systemMode : mode;
    const isDark = resolvedMode === 'dark';

    const toggleMode = () => {

        setMode(isDark ? 'light' : 'dark');
    };

    return (
        <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
            <IconButton onClick={toggleMode} size='small' aria-label='Toggle theme'>
                {isDark ? <LightModeRounded fontSize='small' /> : <DarkModeRounded fontSize='small' />}
            </IconButton>
        </Tooltip>
    );
};
