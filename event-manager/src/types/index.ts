export interface Event {
    id: string;
    title: string;
    description: string;
    date: string; // Date string from JSON
    capacity: number;
    createdAt: string;
    _count?: {
        attendees: number;
    };
    attendees?: Attendee[];
}

export interface Attendee {
    id: string;
    name: string;
    email: string;
    phone: string;
    eventId: string;
}
