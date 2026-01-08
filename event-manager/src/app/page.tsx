import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users, TrendingUp, UserCheck, FileText, Settings, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Welcome back! Here's your event overview.</p>
        </div>
        <Link href="/events/new">
          <Button size="lg" className="shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all hover:scale-105 active:scale-95">
            Create New Event
          </Button>
        </Link>
      </div>

      {/* Stats Cards Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Total Events */}
        <Card className="relative overflow-hidden border-none shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 hover:shadow-2xl transition-all duration-300 animate-fade-in-up stagger-1 group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CalendarDays className="w-24 h-24 text-blue-600" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-blue-900 dark:text-blue-100 uppercase tracking-wider">Total Events</CardTitle>
            <div className="p-2 bg-blue-100/50 dark:bg-blue-900/30 rounded-full backdrop-blur-sm">
              <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mt-2">12</div>
            <p className="text-xs font-medium text-blue-600/80 dark:text-blue-300 mt-1 flex items-center bg-blue-100/50 dark:bg-blue-900/30 w-fit px-2 py-1 rounded-full">
              <span className="text-blue-700 dark:text-blue-300 font-bold mr-1">+2</span> from last month
            </p>
          </CardContent>
        </Card>

        {/* Total Attendees */}
        <Card className="relative overflow-hidden border-none shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 hover:shadow-2xl transition-all duration-300 animate-fade-in-up stagger-2 group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-24 h-24 text-emerald-600" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 uppercase tracking-wider">
              Total Attendees
            </CardTitle>
            <div className="p-2 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-full backdrop-blur-sm">
              <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mt-2">2,350</div>
            <p className="text-xs font-medium text-emerald-600/80 dark:text-emerald-300 mt-1 flex items-center bg-emerald-100/50 dark:bg-emerald-900/30 w-fit px-2 py-1 rounded-full">
              <span className="text-emerald-700 dark:text-emerald-300 font-bold mr-1">+180</span> from last month
            </p>
          </CardContent>
        </Card>

        {/* Engagement Rate */}
        <Card className="relative overflow-hidden border-none shadow-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 hover:shadow-2xl transition-all duration-300 animate-fade-in-up stagger-3 group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-24 h-24 text-amber-600" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-amber-900 dark:text-amber-100 uppercase tracking-wider">
              Engagement Rate
            </CardTitle>
            <div className="p-2 bg-amber-100/50 dark:bg-amber-900/30 rounded-full backdrop-blur-sm">
              <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mt-2">12.2%</div>
            <p className="text-xs font-medium text-amber-600/80 dark:text-amber-300 mt-1 flex items-center bg-amber-100/50 dark:bg-amber-900/30 w-fit px-2 py-1 rounded-full">
              <span className="text-amber-700 dark:text-amber-300 font-bold mr-1">+4.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Events Card */}
        <Card className="col-span-4 border-none shadow-lg animate-fade-in-up stagger-4 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex flex-col items-center justify-center text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-secondary mb-6">
              <p>Recent events data will appear here.</p>
            </div>
            <Link href="/events" className="block">
              <Button variant="outline" className="w-full sm:w-auto font-medium hover:bg-secondary/80 transition-colors">View All Events</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="col-span-3 border-none shadow-lg animate-fade-in-up stagger-4 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/attendees/check-in" className="w-full">
              <Button variant="secondary" className="w-full justify-between h-14 px-6 text-base font-medium shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 group border border-transparent hover:border-gray-100 dark:hover:border-slate-700">
                <span className="flex items-center gap-3">
                  <span className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                    <UserCheck size={20} />
                  </span>
                  Check In Attendee
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/reports" className="w-full">
              <Button variant="secondary" className="w-full justify-between h-14 px-6 text-base font-medium shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 group border border-transparent hover:border-gray-100 dark:hover:border-slate-700">
                <span className="flex items-center gap-3">
                  <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <FileText size={20} />
                  </span>
                  Export Report
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/settings" className="w-full">
              <Button variant="secondary" className="w-full justify-between h-14 px-6 text-base font-medium shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 group border border-transparent hover:border-gray-100 dark:hover:border-slate-700">
                <span className="flex items-center gap-3">
                  <span className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform">
                    <Settings size={20} />
                  </span>
                  Manage Settings
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

