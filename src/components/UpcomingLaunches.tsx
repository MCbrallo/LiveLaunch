import { format, addHours } from 'date-fns';
import { Launch } from '../lib/api';
import { Countdown } from './Countdown';
import { LaunchCard } from './LaunchCard';
import { motion } from 'motion/react';
import { CalendarPlus } from 'lucide-react';

interface UpcomingLaunchesProps {
  launches: Launch[];
}

export function UpcomingLaunches({ launches }: UpcomingLaunchesProps) {
  if (!launches || launches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-4 border-swiss-black bg-swiss-paper p-12 text-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">No Upcoming Missions</h2>
        <p className="text-swiss-gray font-bold uppercase tracking-widest">All scheduled launches have occurred or none are currently scheduled.</p>
      </div>
    );
  }

  const nextLaunch = launches[0];
  const otherLaunches = launches.slice(1);

  // Generate Google Calendar Link
  const startDate = new Date(nextLaunch.date);
  const endDate = addHours(startDate, 2); // Assume 2 hour launch window
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(nextLaunch.mission)}&dates=${format(startDate, "yyyyMMdd'T'HHmmss'Z'")}/${format(endDate, "yyyyMMdd'T'HHmmss'Z'")}&details=${encodeURIComponent(`Rocket: ${nextLaunch.rocket}\nAgency: ${nextLaunch.agency || 'Unknown'}`)}&location=${encodeURIComponent(nextLaunch.site)}`;

  return (
    <div className="space-y-24">
      {/* Hero Section for Next Launch */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
      >
        <div className="lg:col-span-7 order-2 lg:order-1 space-y-10">
          <div className="flex items-center justify-between">
            <div className="inline-block bg-swiss-red text-white px-4 py-2 text-sm font-bold uppercase tracking-widest">
              Next Launch
            </div>
            <a 
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-swiss-black hover:text-swiss-red transition-colors"
            >
              <CalendarPlus className="w-5 h-5" />
              <span className="hidden sm:inline">Add to Calendar</span>
            </a>
          </div>
          
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase break-words">
            {nextLaunch.mission}
          </h2>
          
          <div className="flex flex-col gap-4 text-lg font-bold uppercase tracking-widest border-l-8 border-swiss-black pl-6 py-2">
            <p><span className="text-swiss-gray block text-sm mb-1">Rocket</span> {nextLaunch.rocket}</p>
            <p><span className="text-swiss-gray block text-sm mb-1">Location</span> {nextLaunch.site}</p>
            {nextLaunch.agency && <p><span className="text-swiss-gray block text-sm mb-1">Agency</span> {nextLaunch.agency}</p>}
            <p><span className="text-swiss-gray block text-sm mb-1">Target Date</span> {format(startDate, 'MMMM d, yyyy • HH:mm')} UTC</p>
          </div>
          
          <div className="pt-10 border-t-4 border-swiss-black relative">
            {/* Visual Timeline element */}
            <div className="absolute top-0 left-0 w-full h-1 bg-swiss-gray/20 -mt-1">
              <div className="h-full bg-swiss-red w-1/3 animate-pulse" />
            </div>
            
            <p className="text-swiss-gray uppercase text-sm font-bold tracking-widest mb-6">T-Minus</p>
            <Countdown targetDate={nextLaunch.date} />
          </div>
        </div>
        
        <div className="lg:col-span-4 lg:col-start-9 order-1 lg:order-2 aspect-square lg:aspect-[4/5] w-full overflow-hidden border-4 border-swiss-black bg-swiss-black relative group">
          <img 
            src={nextLaunch.image} 
            alt={nextLaunch.name} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 border-8 border-transparent group-hover:border-swiss-black/10 transition-all duration-500 pointer-events-none" />
        </div>
      </motion.section>

      {/* Other Upcoming Launches */}
      {otherLaunches.length > 0 && (
        <section>
          <div className="flex items-center gap-6 mb-12">
            <h3 className="text-4xl font-black uppercase tracking-tighter shrink-0">
              Scheduled
            </h3>
            <div className="h-1 w-full bg-swiss-black"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherLaunches.map((launch, index) => (
              <LaunchCard key={launch.id} launch={launch} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
