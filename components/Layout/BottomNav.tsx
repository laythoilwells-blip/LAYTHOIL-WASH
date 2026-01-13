
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  PlusSquare,
  Bell, 
  User
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const BottomNav: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  if (isAdmin) return null; // Admins usually on desktop, but can be added if needed

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 px-4 z-50">
      <NavLink to="/driver/dashboard" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
        <LayoutDashboard size={24} />
        <span className="text-[10px]">الرئيسية</span>
      </NavLink>
      <NavLink to="/driver/records" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
        <ClipboardList size={24} />
        <span className="text-[10px]">السجلات</span>
      </NavLink>
      <NavLink to="/driver/document" className="flex flex-col items-center gap-1 -mt-8">
        <div className="bg-blue-600 p-3 rounded-full text-white shadow-lg border-4 border-slate-50">
          <PlusSquare size={28} />
        </div>
        <span className="text-[10px] mt-1 font-bold text-blue-600">توثيق</span>
      </NavLink>
      <NavLink to="/driver/notifications" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
        <Bell size={24} />
        <span className="text-[10px]">تنبيهات</span>
      </NavLink>
      <NavLink to="/driver/profile" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
        <User size={24} />
        <span className="text-[10px]">ملفي</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
