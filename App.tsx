
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import AppLayout from './components/Layout/AppLayout';

// Pages
import Login from './pages/Login';
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const DocumentTransfer = lazy(() => import('./pages/driver/DocumentTransfer'));

// Protected Route Component
// Fix: Changed children to be optional (?) to resolve TypeScript errors at lines 42 and 58
const ProtectedRoute = ({ children, allowedRole }: { children?: React.ReactNode, allowedRole?: 'admin' | 'driver' }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>;

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to={user.role === 'admin' ? '/dashboard' : '/driver/dashboard'} replace />;
  
  return <>{children}</>;
};

const LoadingFallback = () => (
  <div className="h-full w-full flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route element={
              <ProtectedRoute allowedRole="admin">
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/provinces" element={<div className="p-4">قائمة المحافظات والمديريات</div>} />
              <Route path="/hospitals" element={<div className="p-4">إدارة المستشفيات</div>} />
              <Route path="/drivers" element={<div className="p-4">إدارة السائقين</div>} />
              <Route path="/records" element={<div className="p-4">سجلات النقل الشاملة</div>} />
              <Route path="/reports" element={<div className="p-4">التقارير والإحصائيات</div>} />
              <Route path="/notifications" element={<div className="p-4">نظام الإشعارات</div>} />
              <Route path="/settings" element={<div className="p-4">إعدادات النظام</div>} />
            </Route>

            {/* Driver Routes */}
            <Route element={
              <ProtectedRoute allowedRole="driver">
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route path="/driver/dashboard" element={<div className="p-4">لوحة تحكم السائق</div>} />
              <Route path="/driver/document" element={<DocumentTransfer />} />
              <Route path="/driver/records" element={<div className="p-4">سجلاتي الخاصة</div>} />
              <Route path="/driver/pending" element={<div className="p-4">العمليات قيد المزامنة</div>} />
              <Route path="/driver/notifications" element={<div className="p-4">تنبيهات السائق</div>} />
              <Route path="/driver/profile" element={<div className="p-4">الملف الشخصي</div>} />
            </Route>

            {/* Default redirects */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<div className="h-screen flex items-center justify-center">404 - الصفحة غير موجودة</div>} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
