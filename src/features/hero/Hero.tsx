import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';

import { DrawLine, Reveal } from '@/app/components';
import { rotateWord } from '@/app/theme';
import { profile } from '@/data';

export const Hero = () => {
    const { headline, name, title, stack, location } = profile;

    return (
        <>
            <Reveal delaySeconds={0.2}>
                <Typography variant="h1" component="h1" sx={{ margin: 0 }}>
                    {headline.before}{' '}
                    <Box component="span" sx={visuallyHidden}>
                        {headline.rotatingWords.join(', ')}
                    </Box>
                    <Box
                        component="span"
                        aria-hidden="true"
                        sx={{
                            display: 'inline-block',
                            height: '1.08em',
                            overflow: 'hidden',
                            verticalAlign: 'bottom'
                        }}
                    >
                        <Box
                            component="span"
                            sx={(theme) => ({
                                display: 'block',
                                color: theme.palette.portfolio.accent,
                                animation: `${rotateWord} 7.5s infinite`
                            })}
                        >
                            {headline.rotatingWords.map((word) => (
                                <Box
                                    key={word}
                                    component="span"
                                    sx={{ display: 'block', lineHeight: '1.08em' }}
                                >
                                    {word}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <br />
                    {headline.after}
                </Typography>
            </Reveal>
            <Reveal delaySeconds={0.35}>
                <Typography
                    sx={(theme) => ({
                        color: theme.palette.portfolio.muted,
                        fontSize: '15px',
                        lineHeight: 1.5,
                        marginTop: '18px',
                        [theme.breakpoints.up('md')]: {
                            fontSize: '16px'
                        },
                        [theme.breakpoints.up('xl')]: {
                            fontSize: '18px'
                        }
                    })}
                >
                    {[name, title, stack.join(' & '), location].join(' · ')}
                </Typography>
            </Reveal>
            <DrawLine delaySeconds={0.5} />
        </>
    );
};
