export interface SocialLink {
    label: string;
    url: string;
}

export interface Profile {
    name: string;
    handle: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    links: SocialLink[];
}
