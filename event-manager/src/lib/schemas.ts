import { z } from "zod";

export const eventSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(1, "Description is required"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date",
    }),
    capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
});

export const attendeeSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});

export type EventFormValues = z.infer<typeof eventSchema>;
export type AttendeeFormValues = z.infer<typeof attendeeSchema>;
