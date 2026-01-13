
import React from 'react';
import { Bell, Menu, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AppHeaderProps {
  onMenuClick?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b h-16 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden text-slate-600">
          <Menu size={24} />
        </button>
        <div className="md:hidden flex items-center gap-2">
            <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">L</div>
            <span className="font-bold text-slate-800">LAYTHOIL</span>
        </div>
        <h2 className="hidden md:block font-semibold text-slate-700">أهلاً بك، {user?.full_name}</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-r">
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-slate-800">{user?.full_name}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{user?.role === 'admin' ? 'مدير' : 'سائق'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
