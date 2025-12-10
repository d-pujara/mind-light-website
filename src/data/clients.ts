export interface Client {
    id: string;
    name: string;
    category: string;
    description: string;
    location: string; // City, State string for display
    coordinates: [number, number]; // [lat, long] for map
    logoUrl: string;
    websiteUrl: string;
    donationUrl: string;
    videoUrl: string;
    instagramUrl: string;
    foundedYear: number;
    review: string;
    issue: string;
    solution: string;
    phone?: string;
    executiveDirector: {
        name: string;
        imageUrl: string;
    };
}

export const clients: Client[] = [];
