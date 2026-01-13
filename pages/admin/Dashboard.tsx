
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Droplet, 
  Users, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

const data = [
  { name: 'السبت', value: 45 },
  { name: 'الأحد', value: 52 },
  { name: 'الأثنين', value: 38 },
  { name: 'الثلاثاء', value: 65 },
  { name: 'الأربعاء', value: 48 },
  { name: 'الخميس', value: 70 },
];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">نظرة عامة</h1>
          <p className="text-slate-500">مرحباً بك في لوحة تحكم ليث أويل لإدارة المياه</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-white border text-slate-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50">تصدير إكسل</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-blue-100 hover:bg-blue-700">تحديث البيانات</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي التوريدات (م³)" value="4,250" icon={Droplet} color="bg-blue-600" trend={12} />
        <StatCard title="السائقين النشطين" value="28" icon={Users} color="bg-indigo-600" trend={3} />
        <StatCard title="المستشفيات المغطاة" value="12" icon={Building2} color="bg-amber-600" />
        <StatCard title="عمليات قيد المراجعة" value="14" icon={Clock} color="bg-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800">إحصائيات التوريد الأسبوعية</h3>
            <select className="bg-slate-50 border-0 ring-1 ring-slate-200 text-xs px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-600">
              <option>آخر 7 أيام</option>
              <option>آخر 30 يوم</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <Tooltip 
                   contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">أحدث سجلات النقل</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item % 2 === 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {item % 2 === 0 ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">مستشفى الجمهورية</p>
                    <p className="text-[10px] text-slate-500">بواسطة: أحمد صالح • منذ 2 ساعة</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">12 م³</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${item % 2 === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {item % 2 === 0 ? 'مقبول' : 'معلق'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            عرض جميع السجلات
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
