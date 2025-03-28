
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  className?: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, className, positive }) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex justify-between items-start mb-2">
        <p className="stat-label">{title}</p>
        <div className="p-2 rounded-md bg-lightgray">{icon}</div>
      </div>
      <p className="stat-value">{value}</p>
      {change && (
        <p className={cn(
          "text-xs mt-1 flex items-center", 
          positive ? "text-green-500" : "text-red-500"
        )}>
          {positive ? '↑' : '↓'} {change} from last month
        </p>
      )}
    </div>
  );
};

export default StatCard;
