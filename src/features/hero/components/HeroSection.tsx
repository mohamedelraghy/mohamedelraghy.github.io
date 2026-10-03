import { Box, Button, Stack, Typography } from '@mui/material';

import { BlinkingCursor, Section, TerminalPrompt } from '@/components';
import { PROFILE } from '@/features/profile';
import { MONO_FONT_FAMILY } from '@/features/theme';

export const HeroSection = () => (
    <Section id='home'>
        <TerminalPrompt command='whoami' />
        <Stack spacing={2} sx={{ fontFamily: MONO_FONT_FAMILY }}>
            <Typography variant='h1' sx={{ fontSize: { xs: '2.25rem', md: '3.5rem' } }}>
                {PROFILE.name}
            </Typography>
            <Typography variant='h4' component='p' color='primary' sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
                {PROFILE.title}
            </Typography>
            <Typography color='textSecondary' sx={{ maxWidth: 560, fontSize: '1.05rem' }}>
                {PROFILE.tagline}
                <BlinkingCursor />
            </Typography>
            <Box sx={{ pt: 2 }}>
                <Stack direction='row' spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    <Button variant='contained' href={`mailto:${PROFILE.email}`}>
                        ./contact-me
                    </Button>
                    {PROFILE.links.map(link => (
                        <Button
                            key={link.url}
                            variant='outlined'
                            href={link.url}
                            target='_blank'
                            rel='noopener noreferrer'>
                            {link.label}
                        </Button>
                    ))}
                </Stack>
            </Box>
        </Stack>
    </Section>
);
