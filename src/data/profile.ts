import type { Profile } from './types';

export const profile: Profile = {
    name: 'Mohamed EL-Raghy',
    title: 'Senior Backend Engineer',
    location: 'Egypt · Remote',
    stack: ['Node.js', 'NestJS'],
    headline: {
        before: 'I build',
        rotatingWords: ['secure', 'scalable', 'real-time'],
        after: 'backend systems.',
    },
    nav: {
        sectionIds: ['experience', 'projects', 'contact'],
        menuLabel: 'Menu',
        closeLabel: 'Close',
    },
    sections: {
        experience: { id: 'experience', title: 'Experience' },
        projects: { id: 'projects', title: 'Projects' },
        skills: { id: 'skills', title: 'Skills' },
        education: { id: 'education', title: 'Education & achievements' },
        contact: { id: 'contact', title: 'Contact' },
    },
    highlights: {
        about: {
            label: 'About',
            text: 'Backend engineer for systems where reliability and security matter most: banking, government platforms and payments.',
        },
        status: { label: 'Status', text: 'Open to work', show: false },
        cv: { label: 'Résumé', text: 'Download CV' },
        nowAt: { label: 'Now at', text: 'Burgan Bank' },
        lately: { label: 'Lately', text: 'AI voice agents + MCP' },
    },
    // TODO: add public/cv.pdf
    cvHref: '/cv.pdf',
    labels: { present: 'Present', now: 'Now', viewProject: 'View on GitHub' },
    jobs: [
        {
            company: 'Burgan Bank',
            role: 'Senior Full-Stack Engineer',
            location: 'Remote, Kuwait',
            start: 'Sep 2024',
            end: null,
            summary:
                'Request encryption layer, centralized push notifications on Firebase, real-time transaction monitoring with WebSockets, and a NestJS bridge to SAP SuccessFactors.',
            tech: ['NestJS', 'TypeScript', 'WebSockets', 'Elasticsearch'],
        },
        {
            company: 'ConnectX',
            role: 'AI Backend Engineer (Part-Time)',
            location: 'Remote',
            start: 'Mar 2025',
            end: 'Feb 2026',
            summary:
                'Medical intake voice agent with a custom MCP server as memory, so it recognizes returning patients. Follow-ups automated through n8n.',
            tech: ['Vapi AI', 'MCP', 'n8n'],
        },
        {
            company: 'Pharaohsoft',
            role: 'Software Engineer',
            location: 'Cairo, Egypt',
            start: 'Jun 2023',
            end: 'Sep 2024',
            summary:
                'Led the backend of the Shura Council CMS (Bahrain government) and built a NestJS restaurant platform with Stripe and Paymob payments.',
            tech: ['Node.js', 'MariaDB', 'MongoDB', 'Stripe'],
        },
    ],
    projects: [
        // TODO: add href (GitHub URL) once known
        {
            name: 'uptime-monitoring',
            description:
                'RESTful API that lets authenticated users monitor URLs and get uptime reports: availability, average response time, and total uptime/downtime.',
            tech: ['Node.js'],
        },
        // TODO: add href (GitHub URL) once known
        {
            name: 'Book Shop',
            description:
                'Online bookshop where users browse, buy, and manage book orders, with a server-rendered UI (EJS) and a Mongoose-modelled database.',
            tech: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Nodemailer', 'Stripe'],
        },
        // TODO: add href (GitHub URL) once known
        {
            name: 'DN Wallet (graduation project, graded Excellent)',
            description:
                'Back end of a decentralized wallet (web and mobile) for easy, secure payments, with user authentication and authorization.',
            tech: ['TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Nodemailer'],
        },
        {
            name: 'elraghy.dev',
            description: 'This portfolio. Built with React, TypeScript, and MUI, deployed to GitHub Pages.',
            tech: ['React', 'TypeScript', 'Vite', 'MUI', 'GitHub Actions'],
            href: 'https://github.com/mohamedelraghy/mohamedelraghy.github.io',
        },
    ],
    skills: [
        { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Ruby', 'C/C++'] },
        { group: 'Backend', items: ['Node.js', 'NestJS', 'Express.js', 'TypeORM', 'Ruby on Rails'] },
        { group: 'Frontend', items: ['React', 'Vite'] },
        {
            group: 'Databases',
            items: ['MySQL', 'MariaDB', 'MongoDB', 'SQL Server', 'Redis', 'Elasticsearch'],
        },
        {
            group: 'Integrations & Auth',
            items: [
                'Passport (JWT, LDAP, OTP/2FA)',
                'SAP SuccessFactors (OData)',
                'Firebase FCM',
                'WebSockets',
                'Filebeat',
            ],
        },
        {
            group: 'AI',
            items: ['Claude Code', 'MCP servers', 'voice agents (Vapi, ElevenLabs)', 'n8n'],
        },
        { group: 'Tools', items: ['Git', 'GitHub', 'Linux', 'Docker', 'Docker Compose'] },
    ],
    education: [
        {
            school: 'Suez Canal University',
            degree: 'BSc Computer Science, Ismailia, Egypt',
            years: '2016–2020',
        },
    ],
    achievements: [
        { title: 'ECPC 2018', detail: '9th place, Qualifications Round' },
        { title: 'ECPC 2017', detail: '38th place, Qualifications Round' },
    ],
    contact: {
        // TODO: owner to edit
        intro: 'Open to senior backend roles. The fastest way to reach me is email.',
        email: 'elraghy8@gmail.com',
        links: [
            { label: 'GitHub', href: 'https://github.com/mohamedelraghy' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/mohamed-el-raghy' },
        ],
    },
};
