import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';

import { Reveal, UnderlineLink } from '@/app/components';
import { profile } from '@/data';

const MENU_ID = 'mobile-menu';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { name, nav, sections } = profile;

    // The section chosen from the drawer. MUI restores focus to the Menu button as the drawer
    // closes (that scrolls the page back to the button), so we only navigate after the exit
    // transition has finished, when that focus restore is already done and cannot undo the scroll.
    const [pendingSectionId, setPendingSectionId] = useState<string | null>(null);

    const openMenu = () => {
        setPendingSectionId(null);
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setPendingSectionId(null);
        setIsMenuOpen(false);
    };

    const chooseSection = (sectionId: string) => {
        setPendingSectionId(sectionId);
        setIsMenuOpen(false);
    };

    const goToPendingSection = () => {
        if (pendingSectionId === null) {
            return;
        }
        const targetHash = `#${pendingSectionId}`;
        if (window.location.hash !== targetHash) {
            window.location.hash = targetHash;
        }
        // Always scroll: the hash may already match, which would not scroll by itself.
        document.getElementById(pendingSectionId)?.scrollIntoView();
        setPendingSectionId(null);
    };

    return (
        <Reveal
            sx={{
                marginBottom: { xs: '36px', md: '44px', lg: '56px', xl: '88px' }
            }}
        >
            <Box
                component="nav"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: { xs: '14px', xl: '15px' }
                }}
            >
                <Box component="strong" sx={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-.01em' }}>
                    {name}
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: { md: '14px', lg: '22px' } }}>
                    {nav.sectionIds.map((sectionId) => (
                        <UnderlineLink key={sectionId} href={`#${sectionId}`}>
                            {sections[sectionId].title}
                        </UnderlineLink>
                    ))}
                </Box>
                <ButtonBase
                    onClick={openMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls={MENU_ID}
                    aria-haspopup="dialog"
                    sx={(theme) => ({
                        display: { xs: 'inline-flex', md: 'none' },
                        gap: '6px',
                        font: 'inherit',
                        fontWeight: 600,
                        color: theme.palette.portfolio.ink,
                        border: `1px solid ${theme.palette.portfolio.line}`,
                        borderRadius: '999px',
                        padding: '6px 12px',
                        backgroundColor: theme.palette.portfolio.tile
                    })}
                >
                    {nav.menuLabel}
                    <span aria-hidden="true">☰</span>
                </ButtonBase>
            </Box>
            <Drawer
                anchor="top"
                id={MENU_ID}
                aria-label={nav.menuLabel}
                open={isMenuOpen}
                onClose={closeMenu}
                slotProps={{
                    transition: { onExited: goToPendingSection },
                    paper: {
                        sx: (theme) => ({
                            backgroundColor: theme.palette.portfolio.background,
                            backgroundImage: 'none',
                            boxShadow: 'none',
                            padding: '20px 16px 28px',
                            gap: '20px'
                        })
                    }
                }}
            >
                <ButtonBase
                    onClick={closeMenu}
                    sx={(theme) => ({
                        alignSelf: 'flex-end',
                        font: 'inherit',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: theme.palette.portfolio.ink,
                        border: `1px solid ${theme.palette.portfolio.line}`,
                        borderRadius: '999px',
                        padding: '6px 12px',
                        backgroundColor: theme.palette.portfolio.tile
                    })}
                >
                    {nav.closeLabel}
                </ButtonBase>
                <Box
                    component="nav"
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', fontSize: '18px' }}
                >
                    {nav.sectionIds.map((sectionId) => (
                        <UnderlineLink
                            key={sectionId}
                            href={`#${sectionId}`}
                            onClick={(event) => {
                                event.preventDefault();
                                chooseSection(sectionId);
                            }}
                        >
                            {sections[sectionId].title}
                        </UnderlineLink>
                    ))}
                </Box>
            </Drawer>
        </Reveal>
    );
};
