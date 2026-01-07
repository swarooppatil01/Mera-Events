import { Event, Attendee } from "@/types";

const STORAGE_KEYS = {
    EVENTS: "event-manager-events",
    ATTENDEES: "event-manager-attendees",
};

// Mock delay to simulate network
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const storage = {
    getEvents: async (): Promise<Event[]> => {
        await delay(500);
        if (typeof window === "undefined") return [];

        const eventsJson = localStorage.getItem(STORAGE_KEYS.EVENTS);
        if (!eventsJson) return [];

        // Calculate counts dynamically
        const events: Event[] = JSON.parse(eventsJson);
        const attendees = await storage.getAllAttendees();

        return events.map(event => ({
            ...event,
            _count: {
                attendees: attendees.filter(a => a.eventId === event.id).length
            }
        })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    },

    getEvent: async (id: string): Promise<Event | null> => {
        await delay(500);
        if (typeof window === "undefined") return null;

        const events = await storage.getEvents();
        const event = events.find((e) => e.id === id);
        return event || null;
    },

    createEvent: async (data: any): Promise<Event> => {
        await delay(800);
        const events = await storage.getEventsRAW();

        const newEvent: Event = {
            id: crypto.randomUUID(),
            title: data.title,
            description: data.description,
            date: data.date,
            capacity: data.capacity,
            createdAt: new Date().toISOString(),
        };

        events.push(newEvent);
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
        return newEvent;
    },

    deleteEvent: async (id: string): Promise<void> => {
        await delay(500);
        const events = await storage.getEventsRAW();
        const filtered = events.filter((e) => e.id !== id);
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(filtered));
    },

    // Attendees
    getAllAttendees: async (): Promise<Attendee[]> => {
        if (typeof window === "undefined") return [];
        const json = localStorage.getItem(STORAGE_KEYS.ATTENDEES);
        return json ? JSON.parse(json) : [];
    },

    getAttendees: async (eventId: string): Promise<Attendee[]> => {
        await delay(500);
        const all = await storage.getAllAttendees();
        return all.filter(a => a.eventId === eventId);
    },

    addAttendee: async (eventId: string, data: any): Promise<Attendee> => {
        await delay(800);
        const all = await storage.getAllAttendees();

        // Validation: Check duplicate email
        if (all.some(a => a.eventId === eventId && a.email === data.email)) {
            throw new Error("Email already registered for this event");
        }

        // Validation: Check capacity
        const event = await storage.getEvent(eventId);
        if (!event) throw new Error("Event not found");
        const currentCount = all.filter(a => a.eventId === eventId).length;
        if (currentCount >= event.capacity) {
            throw new Error("Event is full");
        }

        const newAttendee: Attendee = {
            id: crypto.randomUUID(),
            eventId,
            name: data.name,
            email: data.email,
            phone: data.phone
        };

        all.push(newAttendee);
        localStorage.setItem(STORAGE_KEYS.ATTENDEES, JSON.stringify(all));
        return newAttendee;
    },

    // Helper to get raw events without calculated fields to avoid circular dependency/double counting in save
    getEventsRAW: async (): Promise<Event[]> => {
        if (typeof window === "undefined") return [];
        const eventsJson = localStorage.getItem(STORAGE_KEYS.EVENTS);
        return eventsJson ? JSON.parse(eventsJson) : [];
    }
};
