import Box from '@mui/material/Box';

import { DrawLine, Reveal, SectionLabel, TechChips, Tile } from '@/app/components';
import { STAGGER_SECONDS } from '@/app/theme';
import { profile } from '@/data';

export const Skills = () => {
    const { id, title } = profile.sections.skills;

    return (
        <Box component="section" id={id}>
            <SectionLabel>{title}</SectionLabel>
            <Box
                sx={(theme) => ({
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                    gap: '10px',
                    [theme.breakpoints.up('md')]: { gap: '12px' },
                    [theme.breakpoints.up('xl')]: { gap: '16px' }
                })}
            >
                {profile.skills.map((skillGroup, index) => (
                    <Reveal key={skillGroup.group} delaySeconds={(index % 3) * STAGGER_SECONDS}>
                        <Tile label={skillGroup.group} sx={{ height: '100%' }}>
                            <TechChips items={skillGroup.items} />
                        </Tile>
                    </Reveal>
                ))}
            </Box>
            <DrawLine />
        </Box>
    );
};
