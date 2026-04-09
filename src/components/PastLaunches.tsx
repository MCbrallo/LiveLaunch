import { useState, useMemo } from 'react';
import { Launch } from '../lib/api';
import { LaunchCard } from './LaunchCard';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';

interface PastLaunchesProps {
  launches: Launch[];
}

export function PastLaunches({ launches }: PastLaunchesProps) {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const years = useMemo(() => {
    const uniqueYears = new Set(
      launches.map(launch => new Date(launch.date).getFullYear().toString())
    );
    return ['All', ...Array.from(uniqueYears).sort((a, b) => b.localeCompare(a))];
  }, [launches]);

  const filteredLaunches = useMemo(() => {
    return launches.filter(launch => {
      const matchesYear = selectedYear === 'All' || new Date(launch.date).getFullYear().toString() === selectedYear;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        launch.mission.toLowerCase().includes(searchLower) || 
        launch.rocket.toLowerCase().includes(searchLower) ||
        (launch.agency && launch.agency.toLowerCase().includes(searchLower));
      
      return matchesYear && matchesSearch;
    });
  }, [launches, selectedYear, searchQuery]);

  if (!launches || launches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-4 border-swiss-black bg-swiss-paper p-12 text-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">No Past Missions</h2>
        <p className="text-swiss-gray font-bold uppercase tracking-widest">Mission history is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-swiss-black pb-8">
        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
          Mission<br/>History
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-swiss-gray" />
            <input 
              type="text" 
              placeholder="SEARCH MISSIONS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border-2 border-swiss-black bg-swiss-paper font-bold uppercase tracking-widest text-sm focus:outline-none focus:ring-2 focus:ring-swiss-red focus:border-transparent w-full sm:w-64 transition-all"
            />
          </div>

          {/* Year Filter */}
          <div className="flex flex-wrap gap-2">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={cn(
                  "px-4 py-2 text-sm font-bold uppercase tracking-widest border-2 transition-all",
                  selectedYear === year
                    ? "bg-swiss-black text-swiss-paper border-swiss-black"
                    : "bg-transparent text-swiss-black border-swiss-black hover:bg-swiss-gray/10"
                )}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredLaunches.map((launch, index) => (
          <LaunchCard key={launch.id} launch={launch} index={index} />
        ))}
      </motion.div>
      
      {filteredLaunches.length === 0 && (
        <div className="text-center py-20 border-4 border-swiss-black bg-swiss-paper">
          <p className="text-xl font-black uppercase tracking-tighter text-swiss-gray">No launches found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
