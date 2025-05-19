
import React from 'react';
import { Bell, Search, Settings, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  return (
    <nav className="w-full h-16 border-b border-gray-200 px-4 flex items-center justify-between bg-white">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold hidden md:block">사용자 관리</h1>
      </div>

      <div className="hidden md:flex items-center gap-4 bg-gray-100 rounded-lg px-3 py-1.5 flex-1 max-w-md mx-4">
        <Search className="h-4 w-4 text-gray-500" />
        <Input 
          type="text" 
          placeholder="검색..." 
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-8"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <User className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
