import Box from '@mui/material/Box';

import { DrawLine, Reveal, SectionLabel, Tile, tileGridGap } from '@/app/components';
import { STAGGER_SECONDS } from '@/app/theme';
import { profile } from '@/data';

interface EducationTile {
    key: string;
    label: string;
    text: string;
}

export const Education = () => {
    const { id, title } = profile.sections.education;

    const tiles: EducationTile[] = [
        ...profile.education.map((entry) => ({
            key: `${entry.school}-${entry.years}`,
            label: entry.years,
            text: `${entry.school}, ${entry.degree}`
        })),
        ...profile.achievements.map((achievement) => ({
            key: achievement.title,
            label: achievement.title,
            text: achievement.detail
        }))
    ];

    return (
        <Box component="section" id={id}>
            <SectionLabel>{title}</SectionLabel>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' },
                    gap: tileGridGap
                }}
            >
                {tiles.map((tile, index) => (
                    <Reveal key={tile.key} delaySeconds={(index % 3) * STAGGER_SECONDS}>
                        <Tile label={tile.label} sx={{ height: '100%' }}>
                            <Box component="strong" sx={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.4, overflowWrap: 'anywhere' }}>
                                {tile.text}
                            </Box>
                        </Tile>
                    </Reveal>
                ))}
            </Box>
            <DrawLine />
        </Box>
    );
};
