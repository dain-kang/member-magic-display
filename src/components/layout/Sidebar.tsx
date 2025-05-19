
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Home, 
  Settings, 
  Database, 
  UserRoundPlus, 
  Users,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: '대시보드', path: '/' },
    { icon: Users, label: '사용자 목록', path: '/users' },
    { icon: UserRoundPlus, label: '사용자 등록', path: '/users/new' },
    { icon: Database, label: '데이터', path: '/data' },
    { icon: FileText, label: '보고서', path: '/reports' },
    { icon: Settings, label: '설정', path: '/settings' },
  ];
  
  return (
    <aside className={cn(
      "bg-white border-r border-gray-200 h-screen transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center h-16 px-4 border-b border-gray-200 justify-between">
        {!collapsed && (
          <h1 className="text-xl font-bold">Admin</h1>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <User className="h-6 w-6" />
          </div>
        )}
        <button 
          onClick={toggleSidebar} 
          className="p-1.5 rounded-lg hover:bg-gray-100"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <div className="py-4 flex flex-col h-[calc(100%-4rem)]">
        <div className="flex-1">
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100",
                  location.pathname === item.path && "bg-blue-50 text-blue-600",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  location.pathname === item.path ? "text-blue-600" : "text-gray-500"
                )} />
                {!collapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="px-2 mt-auto">
          <button className={cn(
            "w-full flex items-center px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50",
            collapsed ? "justify-center" : "justify-start"
          )}>
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3 font-medium">로그아웃</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
