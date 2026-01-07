"use client";

import { useEvent, useAttendees } from "@/hooks/use-event-details";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { CalendarIcon, Users, Building, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function EventDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: event, isLoading: isLoadingEvent } = useEvent(id);
    const { data: attendees, isLoading: isLoadingAttendees } = useAttendees(id);
    const router = useRouter();

    if (isLoadingEvent) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (!event) {
        return <div>Event not found</div>;
    }

    const isFull = (event._count?.attendees || 0) >= event.capacity;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Event Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{event.description}</p>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{format(new Date(event.date), "PPP")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>Capacity: {event.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <Badge variant={isFull ? "destructive" : "secondary"}>
                                {isFull ? "Fully Booked" : "Registration Open"}
                            </Badge>
                        </div>

                        <div className="pt-4">
                            <Link href={`/events/${id}/register`}>
                                <Button disabled={isFull} className="w-full">
                                    {isFull ? "Event Full" : "Register Attendee"}
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Attendees ({attendees?.length || 0})</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoadingAttendees ? (
                                        Array.from({ length: 3 }).map((_, i) => (
                                            <TableRow key={i}>
                                                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                            </TableRow>
                                        ))
                                    ) : attendees?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">No attendees yet.</TableCell>
                                        </TableRow>
                                    ) : (
                                        attendees?.map((attendee) => (
                                            <TableRow key={attendee.id}>
                                                <TableCell className="font-medium">{attendee.name}</TableCell>
                                                <TableCell>{attendee.email}</TableCell>
                                                <TableCell>{attendee.phone}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
