export type LinkItem = { label: string; href: string };
export type SectionId = 'experience' | 'projects' | 'skills' | 'education' | 'contact';
export type Section = { id: SectionId; title: string };
export type Job = {
    company: string;
    role: string;
    location: string;
    start: string; // display text, e.g. 'Sep 2024'
    end: string | null; // null = current job → "Present" + Now badge
    summary: string;
    tech: string[];
};
export type Project = { name: string; description: string; tech: string[]; href?: string };
export type SkillGroup = { group: string; items: string[] };
export type Education = { school: string; degree: string; years: string };
export type Achievement = { title: string; detail: string };
export type Profile = {
    name: string;
    title: string;
    location: string;
    stack: string[];
    headline: { before: string; rotatingWords: [string, string, string]; after: string };
    nav: { sectionIds: SectionId[]; menuLabel: string; closeLabel: string };
    sections: Record<SectionId, Section>;
    highlights: {
        about: { label: string; text: string };
        status: { label: string; text: string; show: boolean };
        cv: { label: string; text: string };
        nowAt: { label: string; text: string };
        lately: { label: string; text: string };
    };
    cvHref: string;
    labels: { present: string; now: string; viewProject: string };
    jobs: Job[];
    projects: Project[];
    skills: SkillGroup[];
    education: Education[];
    achievements: Achievement[];
    contact: { intro: string; email: string; links: LinkItem[] };
};
