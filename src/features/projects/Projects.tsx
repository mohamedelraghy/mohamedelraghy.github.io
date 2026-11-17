import Box from '@mui/material/Box';

import { DrawLine, Reveal, SectionLabel, TechChips, Tile, UnderlineLink } from '@/app/components';
import { STAGGER_SECONDS } from '@/app/theme';
import { profile } from '@/data';

export const Projects = () => {
    const { id, title } = profile.sections.projects;
    const { projects, labels } = profile;

    return (
        <Box component="section" id={id}>
            <SectionLabel>{title}</SectionLabel>
            <Box
                sx={(theme) => ({
                    display: 'grid',
                    // Stays at 2 columns on xl: 4 columns at 1240px would squeeze the descriptions.
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: '10px',
                    [theme.breakpoints.up('md')]: { gap: '12px' },
                    [theme.breakpoints.up('xl')]: { gap: '16px' }
                })}
            >
                {projects.map((project, index) => (
                    <Reveal key={project.name} delaySeconds={(index % 2) * STAGGER_SECONDS}>
                        <Tile
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}
                        >
                            <Box component="h3" sx={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                                {project.name}
                            </Box>
                            <Box component="p" sx={{ margin: 0, fontSize: '14px', lineHeight: 1.55 }}>
                                {project.description}
                            </Box>
                            <TechChips items={project.tech} />
                            {project.href && (
                                <Box sx={{ fontSize: '14px' }}>
                                    <UnderlineLink href={project.href} external>
                                        {labels.viewProject}
                                    </UnderlineLink>
                                </Box>
                            )}
                        </Tile>
                    </Reveal>
                ))}
            </Box>
            <DrawLine />
        </Box>
    );
};
