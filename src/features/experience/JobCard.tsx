import Box from '@mui/material/Box';

import { TechChips, Tile } from '@/app/components';
import { profile } from '@/data';
import type { Job } from '@/data';

interface JobCardProps {
    job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
    const { labels } = profile;
    const isCurrent = job.end === null;

    return (
        <Tile
            sx={(theme) => ({
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr)',
                gap: '4px',
                [theme.breakpoints.up('md')]: {
                    gridTemplateColumns: '150px minmax(0, 1fr)',
                    gap: '16px'
                },
                [theme.breakpoints.up('xl')]: {
                    gridTemplateColumns: '200px minmax(0, 1fr)'
                }
            })}
        >
            <Box
                sx={(theme) => ({
                    fontSize: '13px',
                    fontWeight: 600,
                    color: theme.palette.portfolio.muted
                })}
            >
                {job.start} — {job.end ?? labels.present}
            </Box>
            <Box>
                <Box component="h3" sx={{ margin: 0, fontSize: '18px', letterSpacing: '-.01em', overflowWrap: 'anywhere' }}>
                    {job.company}
                    {isCurrent && (
                        <Box
                            component="span"
                            sx={(theme) => ({
                                fontSize: '11px',
                                fontWeight: 400,
                                letterSpacing: 0,
                                backgroundColor: theme.palette.portfolio.accent,
                                color: theme.palette.common.white,
                                borderRadius: '999px',
                                padding: '2px 8px',
                                marginLeft: '8px',
                                verticalAlign: 'middle'
                            })}
                        >
                            {labels.now}
                        </Box>
                    )}
                </Box>
                <Box
                    sx={(theme) => ({
                        fontSize: '13px',
                        color: theme.palette.portfolio.muted,
                        margin: '2px 0 8px',
                        overflowWrap: 'anywhere'
                    })}
                >
                    {job.role} · {job.location}
                </Box>
                <Box
                    component="p"
                    sx={(theme) => ({
                        margin: '0 0 10px',
                        fontSize: '14px',
                        lineHeight: 1.55,
                        overflowWrap: 'anywhere',
                        [theme.breakpoints.up('xl')]: { fontSize: '15px' }
                    })}
                >
                    {job.summary}
                </Box>
                <TechChips items={job.tech} />
            </Box>
        </Tile>
    );
};
