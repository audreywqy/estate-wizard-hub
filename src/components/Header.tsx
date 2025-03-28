
import React from 'react';
import { Button } from './ui/button';
import { Bell, Search } from 'lucide-react';
import { Input } from './ui/input';

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 bg-white">
      {/* Search */}
      <div className="relative hidden md:block w-64">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search..." 
          className="pl-8 w-full bg-muted"
        />
      </div>
      
      {/* Title visible on mobile */}
      <div className="md:hidden font-bold text-lg">PropMaster</div>
      
      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
