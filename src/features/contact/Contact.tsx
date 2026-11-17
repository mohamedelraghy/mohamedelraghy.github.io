import Box from '@mui/material/Box';

import { Reveal, SectionLabel, UnderlineLink } from '@/app/components';
import { profile } from '@/data';

export const Contact = () => {
    const { id, title } = profile.sections.contact;
    const { intro, email, links } = profile.contact;

    return (
        <Box component="footer">
            <Box component="section" id={id}>
                <Reveal>
                    <SectionLabel>{title}</SectionLabel>
                    <Box
                        component="p"
                        sx={{ margin: '0 0 14px', fontSize: '15px', lineHeight: 1.55, overflowWrap: 'anywhere' }}
                    >
                        {intro}
                    </Box>
                    <Box sx={{ fontSize: '20px', margin: '0 0 18px', overflowWrap: 'anywhere' }}>
                        <UnderlineLink href={`mailto:${email}`}>{email}</UnderlineLink>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px 22px', fontSize: '15px' }}>
                        {links.map((link) => (
                            <UnderlineLink key={link.href} href={link.href} external>
                                {link.label}
                            </UnderlineLink>
                        ))}
                        <UnderlineLink href={profile.cvHref} external>
                            {profile.highlights.cv.text}
                        </UnderlineLink>
                    </Box>
                </Reveal>
            </Box>
        </Box>
    );
};
