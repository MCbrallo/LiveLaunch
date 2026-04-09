import { useEffect, useState } from 'react';
import { fetchUpcomingLaunches, fetchPastLaunches, type Launch } from './lib/api';
import { UpcomingLaunches } from './components/UpcomingLaunches';
import { PastLaunches } from './components/PastLaunches';
import { Loader2, Activity } from 'lucide-react';
import { cn } from './lib/utils';

type Tab = 'upcoming' | 'past';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');
  const [upcomingLaunches, setUpcomingLaunches] = useState<Launch[]>([]);
  const [pastLaunches, setPastLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [upcoming, past] = await Promise.all([
          fetchUpcomingLaunches(),
          fetchPastLaunches()
        ]);
        
        const now = new Date().getTime();
        
        // Filter out launches that have already happened
        const actualUpcoming = upcoming
          .filter(l => new Date(l.date).getTime() > now)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          
        // Get launches that were in the "upcoming" list but have already passed
        const missedUpcoming = upcoming
          .filter(l => new Date(l.date).getTime() <= now);
          
        // Combine missed upcoming with past launches and sort descending
        const actualPast = [...missedUpcoming, ...past]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          
        // Ensure uniqueness by ID just in case
        const uniquePast = Array.from(new Map(actualPast.map(item => [item.id, item])).values());

        setUpcomingLaunches(actualUpcoming);
        setPastLaunches(uniquePast);
      } catch (error) {
        console.error("Failed to load launches:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-swiss-bg text-swiss-black selection:bg-swiss-red selection:text-white font-sans relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />

      {/* Live Ticker */}
      <div className="bg-swiss-red text-white overflow-hidden border-b-4 border-swiss-black py-2 relative z-10">
        <div className="animate-marquee flex gap-8 font-bold uppercase tracking-widest text-xs sm:text-sm">
          <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> LIVE TELEMETRY ACTIVE</span>
          <span>•</span>
          <span>{upcomingLaunches.length} SCHEDULED MISSIONS</span>
          <span>•</span>
          <span>{pastLaunches.length} COMPLETED MISSIONS</span>
          <span>•</span>
          <span>SYSTEM NOMINAL</span>
          <span>•</span>
          {/* Duplicate for seamless loop */}
          <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> LIVE TELEMETRY ACTIVE</span>
          <span>•</span>
          <span>{upcomingLaunches.length} SCHEDULED MISSIONS</span>
          <span>•</span>
          <span>{pastLaunches.length} COMPLETED MISSIONS</span>
          <span>•</span>
          <span>SYSTEM NOMINAL</span>
          <span>•</span>
        </div>
      </div>

      <header className="bg-swiss-paper border-b-4 border-swiss-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                  Launch<br/>Tracker
                </h1>
                <div className="absolute -top-2 -right-4 w-3 h-3 bg-swiss-red rounded-full animate-pulse border border-swiss-black" title="Live Connection" />
              </div>
            </div>
            
            <nav className="flex gap-6 text-sm font-bold uppercase tracking-widest">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={cn(
                  "pb-2 border-b-4 transition-colors",
                  activeTab === 'upcoming' 
                    ? "border-swiss-black text-swiss-black" 
                    : "border-transparent text-swiss-gray hover:text-swiss-black"
                )}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={cn(
                  "pb-2 border-b-4 transition-colors",
                  activeTab === 'past' 
                    ? "border-swiss-black text-swiss-black" 
                    : "border-transparent text-swiss-gray hover:text-swiss-black"
                )}
              >
                Past Missions
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
            <Loader2 className="w-12 h-12 animate-spin text-swiss-black" />
            <p className="font-bold uppercase tracking-widest text-swiss-gray">Acquiring Telemetry</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {activeTab === 'upcoming' ? (
              <UpcomingLaunches launches={upcomingLaunches} />
            ) : (
              <PastLaunches launches={pastLaunches} />
            )}
          </div>
        )}
      </main>
      
      <footer className="border-t-4 border-swiss-black bg-swiss-paper py-12 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold uppercase tracking-widest text-swiss-gray">
          <p>Data provided by The Space Devs API</p>
          <p>Times shown in UTC</p>
        </div>
      </footer>
    </div>
  );
}
