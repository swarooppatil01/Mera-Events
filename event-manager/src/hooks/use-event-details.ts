"use client";

import { useQuery } from "@tanstack/react-query";
import { storage } from "@/lib/storage";

export function useEvent(id: string) {
    return useQuery({
        queryKey: ["events", id],
        queryFn: () => storage.getEvent(id),
    });
}

export function useAttendees(eventId: string) {
    return useQuery({
        queryKey: ["events", eventId, "attendees"],
        queryFn: () => storage.getAttendees(eventId),
    });
}
