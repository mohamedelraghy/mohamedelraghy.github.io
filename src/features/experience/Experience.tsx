import Box from '@mui/material/Box';

import { DrawLine, Reveal, SectionLabel } from '@/app/components';
import { useInView } from '@/app/hooks';
import { fillDown, STAGGER_SECONDS } from '@/app/theme';
import { profile } from '@/data';

import { JobCard } from './JobCard';

export const Experience = () => {
    const { id, title } = profile.sections.experience;
    const { ref, inView } = useInView<HTMLDivElement>();

    return (
        <Box component="section" id={id}>
            <SectionLabel>{title}</SectionLabel>
            <Box
                ref={ref}
                sx={(theme) => {
                    const railStyles = {
                        position: 'absolute',
                        left: '5px',
                        top: '6px',
                        width: '2px',
                        [theme.breakpoints.up('md')]: { left: '7px' }
                    };

                    return {
                        position: 'relative',
                        paddingLeft: '22px',
                        [theme.breakpoints.up('md')]: { paddingLeft: '28px' },
                        '&::before': {
                            ...railStyles,
                            content: '""',
                            bottom: '6px',
                            backgroundColor: theme.palette.portfolio.line
                        },
                        '& > .timeline-fill': {
                            ...railStyles,
                            backgroundColor: theme.palette.portfolio.accent,
                            // Static end state: reduced motion removes the animation, so the fill must not depend on it.
                            height: inView ? 'calc(100% - 12px)' : 0,
                            animation: inView ? `${fillDown} 1.8s ease-out both` : 'none'
                        }
                    };
                }}
            >
                <Box className="timeline-fill" />
                {profile.jobs.map((job, index) => (
                    <Reveal
                        key={`${job.company}-${job.start}`}
                        delaySeconds={index * STAGGER_SECONDS}
                        sx={(theme) => ({
                            position: 'relative',
                            marginBottom: '14px',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: '-22px',
                                top: '20px',
                                width: '12px',
                                height: '12px',
                                boxSizing: 'border-box',
                                borderRadius: '50%',
                                backgroundColor: theme.palette.portfolio.background,
                                border: `2px solid ${theme.palette.portfolio.accent}`,
                                // Rail centre is 6px (xs) / 8px (md); the dot is 12px wide, so its left edge sits 6px before the centre.
                                [theme.breakpoints.up('md')]: { left: '-26px' }
                            }
                        })}
                    >
                        <JobCard job={job} />
                    </Reveal>
                ))}
            </Box>
            <DrawLine />
        </Box>
    );
};
