export interface NavItem {
    label: string;
    href: string;
}

// Each href points at a <Section id='...'> on the home page
export const NAV_ITEMS: NavItem[] = [
    { label: 'about', href: '#about' },
    { label: 'experience', href: '#experience' },
    { label: 'projects', href: '#projects' },
    { label: 'contact', href: '#contact' }
];
