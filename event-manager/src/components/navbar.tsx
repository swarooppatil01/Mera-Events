import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="glass-navbar sticky top-0 z-50">
            <div className="flex h-16 items-center px-4 container mx-auto">
                <div className="mr-8 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold text-lg sm:inline-block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Event Manager
                        </span>
                    </Link>
                    <div className="flex gap-6 md:gap-10">
                        <Link
                            href="/"
                            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground spring-smooth"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/events"
                            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground spring-smooth"
                        >
                            Events
                        </Link>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search or other controls */}
                    </div>
                    <Link href="/events/new">
                        <Button size="sm">Create Event</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

