"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { attendeeSchema, AttendeeFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEvent } from "@/hooks/use-event-details";
import { storage } from "@/lib/storage";

export default function RegisterAttendeePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const queryClient = useQueryClient();
    const { data: event } = useEvent(id);

    const form = useForm<AttendeeFormValues>({
        resolver: zodResolver(attendeeSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: AttendeeFormValues) => {
            return storage.addAttendee(id, values);
        },
        onMutate: async (newAttendee) => {
            // Optimistic Update Example
            await queryClient.cancelQueries({ queryKey: ["events", id, "attendees"] });
            const previousAttendees = queryClient.getQueryData(["events", id, "attendees"]);

            // We can't fully optimistically update the list without a real ID, 
            // but we can show success immediately if we wanted.
            // For now, Shadcn toast is good feedback.
            return { previousAttendees };
        },
        onSuccess: () => {
            toast.success("Registration successful!");
            queryClient.invalidateQueries({ queryKey: ["events", id] }); // Update count
            queryClient.invalidateQueries({ queryKey: ["events", id, "attendees"] });
            router.push(`/events/${id}`);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: AttendeeFormValues) {
        mutate(values);
    }

    if (!event) return null;

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Register Attendee</h1>
                <p className="text-muted-foreground">Register for {event.title}</p>
            </div>

            <div className="border p-6 rounded-lg bg-card">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="1234567890" {...field} />
                                    </FormControl>
                                    <FormDescription>10 digits only</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Register
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
