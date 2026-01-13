
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  Hospital, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Bell, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const adminLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { to: '/provinces', icon: MapPin, label: 'المحافظات' },
    { to: '/hospitals', icon: Hospital, label: 'المستشفيات' },
    { to: '/drivers', icon: Users, label: 'السائقين' },
    { to: '/records', icon: ClipboardList, label: 'سجلات النقل' },
    { to: '/reports', icon: BarChart3, label: 'التقارير' },
    { to: '/notifications', icon: Bell, label: 'الإشعارات' },
    { to: '/settings', icon: Settings, label: 'الإعدادات' },
  ];

  const driverLinks = [
    { to: '/driver/dashboard', icon: LayoutDashboard, label: 'الرئيسية' },
    { to: '/driver/document', icon: ClipboardList, label: 'توثيق عملية' },
    { to: '/driver/records', icon: ClipboardList, label: 'سجلاتي' },
    { to: '/driver/pending', icon: Bell, label: 'عمليات معلقة' },
    { to: '/driver/notifications', icon: Bell, label: 'تنبيهات' },
  ];

  const links = isAdmin ? adminLinks : driverLinks;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-l h-screen sticky top-0">
      <div className="p-6 border-b flex items-center gap-3">
        <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl">L</div>
        <h1 className="font-bold text-xl text-slate-800">LAYTHOIL</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            <link.icon size={20} />
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
