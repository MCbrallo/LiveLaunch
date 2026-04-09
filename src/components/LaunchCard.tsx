import { format } from 'date-fns';
import { Launch } from '../lib/api';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface LaunchCardProps {
  launch: Launch;
  index?: number;
}

export function LaunchCard({ launch, index = 0 }: LaunchCardProps) {
  const launchDate = new Date(launch.date);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col bg-swiss-paper border-4 border-swiss-black hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] transition-all duration-300"
    >
      <div className="aspect-[4/3] w-full overflow-hidden border-b-4 border-swiss-black bg-swiss-black">
        <img 
          src={launch.image} 
          alt={launch.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-6 gap-4">
          <span className={cn(
            "px-3 py-1 text-xs font-bold uppercase tracking-widest border-2",
            launch.status.toLowerCase().includes('success') 
              ? "border-swiss-black text-swiss-black bg-green-100"
              : launch.status.toLowerCase().includes('fail')
              ? "border-swiss-red text-swiss-red bg-red-50"
              : "border-swiss-black text-swiss-black"
          )}>
            {launch.status}
          </span>
          <span className="text-sm font-bold text-swiss-gray uppercase tracking-widest text-right">
            {format(launchDate, 'MMM d, yyyy')}
          </span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-[1.1] mb-8 line-clamp-3">
          {launch.mission}
        </h3>
        
        <div className="mt-auto space-y-3 text-sm font-bold uppercase tracking-widest">
          <div className="flex gap-4 border-t-2 border-swiss-gray/20 pt-3">
            <span className="text-swiss-gray w-12 shrink-0">RKT</span> 
            <span className="truncate text-swiss-black">{launch.rocket}</span>
          </div>
          <div className="flex gap-4 border-t-2 border-swiss-gray/20 pt-3">
            <span className="text-swiss-gray w-12 shrink-0">LOC</span> 
            <span className="truncate text-swiss-black">{launch.site}</span>
          </div>
          {launch.agency && (
            <div className="flex gap-4 border-t-2 border-swiss-gray/20 pt-3">
              <span className="text-swiss-gray w-12 shrink-0">ORG</span> 
              <span className="truncate text-swiss-black">{launch.agency}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
