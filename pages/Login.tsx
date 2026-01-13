
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User, Lock, Droplets } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo logic
    if (username.includes('admin')) {
      login(username, 'admin');
      navigate('/dashboard');
    } else {
      login(username, 'driver');
      navigate('/driver/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl shadow-xl shadow-blue-200 mb-6 transform -rotate-6">
            <Droplets className="text-white w-12 h-12" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">LAYTHOIL - WASH</h1>
          <p className="text-slate-500">نظام إدارة نقل المياه للمستشفيات</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">اسم المستخدم</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <User className="text-slate-400 w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 rounded-xl py-3 pr-12 pl-4 transition-all"
                  placeholder="admin_123 أو driver_456"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Lock className="text-slate-400 w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 rounded-xl py-3 pr-12 pl-4 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-sm text-slate-500 mb-2">للتجربة السريعة:</p>
            <div className="flex gap-2 justify-center">
              <button 
                onClick={() => { setUsername('admin_demo'); setPassword('123456'); }}
                className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600 hover:bg-slate-200"
              >
                مدير
              </button>
              <button 
                onClick={() => { setUsername('driver_demo'); setPassword('123456'); }}
                className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600 hover:bg-slate-200"
              >
                سائق
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-10 text-slate-400 text-sm">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} LAYTHOIL
        </p>
      </div>
    </div>
  );
};

export default Login;
