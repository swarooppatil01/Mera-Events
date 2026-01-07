"use client";

import { useQuery } from "@tanstack/react-query";
import { storage } from "@/lib/storage";

export function useEvents() {
    return useQuery({
        queryKey: ["events"],
        queryFn: storage.getEvents,
    });
}
