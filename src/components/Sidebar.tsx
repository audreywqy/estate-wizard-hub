
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Building, 
  Users, 
  ClipboardList, 
  FileText, 
  LayoutDashboard, 
  Settings, 
  X,
  Briefcase
} from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const isMobile = useIsMobile();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Properties', path: '/properties', icon: <Building className="w-5 h-5" /> },
    { name: 'Tenants', path: '/tenants', icon: <Users className="w-5 h-5" /> },
    { name: 'Maintenance', path: '/maintenance', icon: <ClipboardList className="w-5 h-5" /> },
    { name: 'Documents', path: '/documents', icon: <FileText className="w-5 h-5" /> },
    { name: 'Vendors', path: '/vendors', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside 
      className={cn(
        "bg-navy text-white w-64 flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out",
        isMobile && "fixed left-0 top-0 h-full z-40",
        isMobile && !open && "-translate-x-full"
      )}
    >
      {/* Sidebar header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-darkblue">
        <h1 className="text-xl font-bold">PropMaster</h1>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  cn("nav-link", isActive && "active")
                }
                onClick={isMobile ? onClose : undefined}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Sidebar footer */}
      <div className="p-4 border-t border-darkblue">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-teal flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@propmaster.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
