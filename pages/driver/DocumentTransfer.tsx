
import React, { useState } from 'react';
import { Camera, Video, FileText, Send, Save, CheckCircle, Wifi, WifiOff, Loader2 } from 'lucide-react';
import { useVideoProcessor } from '../../hooks/useVideoProcessor';

const DocumentTransfer: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { compressVideo, isProcessing, progress, error: processingError } = useVideoProcessor();
  
  const [formData, setFormData] = useState({
    hospital: '',
    quantity: '',
    chlorineVideo: null as File | null,
    dischargeVideo: null as File | null,
    receiptImage: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (field === 'chlorineVideo' || field === 'dischargeVideo') {
      try {
        const compressed = await compressVideo(file);
        setFormData(prev => ({ ...prev, [field]: compressed }));
      } catch (err) {
        console.error('Compression failed:', err);
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call or offline saving
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (!isOnline) {
        const pending = JSON.parse(localStorage.getItem('pending_uploads') || '[]');
        // Create a serializable version of the data for storage
        const serializableData = {
          hospital: formData.hospital,
          quantity: formData.quantity,
          timestamp: new Date().toISOString(),
          // In real offline app, we'd store blobs in IndexedDB, not localStorage
          hasChlorine: !!formData.chlorineVideo,
          hasDischarge: !!formData.dischargeVideo,
          hasReceipt: !!formData.receiptImage
        };
        pending.push(serializableData);
        localStorage.setItem('pending_uploads', JSON.stringify(pending));
      }
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle size={48} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">تم {isOnline ? 'الإرسال' : 'الحفظ'} بنجاح!</h2>
          <p className="text-slate-500 max-w-xs mx-auto mt-2">
            {isOnline 
              ? 'تم رفع التوثيق بنجاح إلى النظام وسيقوم المدير بمراجعته قريباً.' 
              : 'أنت غير متصل بالإنترنت. تم حفظ العملية محلياً وستتم المزامنة تلقائياً عند الاتصال.'}
          </p>
        </div>
        <button 
          onClick={() => { setIsSuccess(false); setStep(1); setFormData({hospital: '', quantity: '', chlorineVideo: null, dischargeVideo: null, receiptImage: null}); }}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
        >
          توثيق عملية أخرى
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">توثيق عملية نقل</h1>
          <p className="text-slate-500">يرجى رفع الوسائط المطلوبة لضمان جودة الخدمة</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${isOnline ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
          {isOnline ? 'متصل' : 'غير متصل (حفظ محلي)'}
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border shadow-sm">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
              {s}
            </div>
            <div className={`h-1 w-10 sm:w-20 rounded-full ${step > s ? 'bg-blue-600' : 'bg-slate-100'}`} />
          </div>
        ))}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 4 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
          4
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800">1. بيانات الشحنة</h3>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">المستشفى المستهدف</label>
                <select 
                  required
                  disabled={isProcessing}
                  value={formData.hospital}
                  onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 rounded-xl py-3 px-4"
                >
                  <option value="">اختر المستشفى...</option>
                  <option value="1">مستشفى الجمهورية (عدن)</option>
                  <option value="2">مستشفى الثورة (صنعاء)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">كمية المياه (متر مكعب)</label>
                <input 
                  type="number" 
                  required
                  disabled={isProcessing}
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  placeholder="مثال: 12"
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 rounded-xl py-3 px-4"
                />
              </div>
              <button 
                type="button" 
                onClick={() => setStep(2)}
                disabled={!formData.hospital || !formData.quantity || isProcessing}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold disabled:opacity-50"
              >
                التالي: فيديوهات التوثيق
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800">2. الفيديوهات المطلوبة</h3>
              
              {isProcessing && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-4 animate-pulse">
                  <Loader2 className="text-blue-600 animate-spin" size={24} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-blue-800">جارٍ ضغط الفيديو...</p>
                    <div className="w-full bg-blue-200 h-1.5 rounded-full mt-2">
                      <div 
                        className="bg-blue-600 h-full rounded-full transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600">{progress}%</span>
                </div>
              )}

              {processingError && (
                <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-rose-600 text-sm font-bold">
                  {processingError}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">فيديو فحص الكلور (إجباري)</label>
                <div className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-colors ${formData.chlorineVideo ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'} ${isProcessing ? 'opacity-50' : ''}`}>
                  {formData.chlorineVideo ? (
                    <div className="text-emerald-600 flex flex-col items-center">
                      <CheckCircle size={32} className="mb-2" />
                      <span className="text-sm font-bold">تم الاختيار والضغط</span>
                      <span className="text-[10px] opacity-70 truncate max-w-[200px]">{formData.chlorineVideo.name}</span>
                    </div>
                  ) : (
                    <>
                      <Video size={32} className="text-slate-400 mb-2" />
                      <p className="text-xs text-slate-500 mb-4">قم بتصوير فيديو لعملية قياس الكلور</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    accept="video/*" 
                    capture="environment"
                    disabled={isProcessing}
                    onChange={(e) => handleFileChange(e, 'chlorineVideo')}
                    className="hidden" 
                    id="chlorine-input" 
                  />
                  <label htmlFor="chlorine-input" className={`bg-white border shadow-sm px-6 py-2 rounded-lg text-sm font-bold cursor-pointer hover:bg-slate-50 ${isProcessing ? 'pointer-events-none' : ''}`}>
                    {formData.chlorineVideo ? 'تغيير الفيديو' : 'تسجيل الفيديو'}
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">فيديو عملية التفريغ (إجباري)</label>
                <div className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-colors ${formData.dischargeVideo ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'} ${isProcessing ? 'opacity-50' : ''}`}>
                  {formData.dischargeVideo ? (
                    <div className="text-emerald-600 flex flex-col items-center">
                      <CheckCircle size={32} className="mb-2" />
                      <span className="text-sm font-bold">تم الاختيار والضغط</span>
                      <span className="text-[10px] opacity-70 truncate max-w-[200px]">{formData.dischargeVideo.name}</span>
                    </div>
                  ) : (
                    <>
                      <Video size={32} className="text-slate-400 mb-2" />
                      <p className="text-xs text-slate-500 mb-4">قم بتصوير فيديو لبدء عملية التفريغ</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    accept="video/*" 
                    capture="environment"
                    disabled={isProcessing}
                    onChange={(e) => handleFileChange(e, 'dischargeVideo')}
                    className="hidden" 
                    id="discharge-input" 
                  />
                  <label htmlFor="discharge-input" className={`bg-white border shadow-sm px-6 py-2 rounded-lg text-sm font-bold cursor-pointer hover:bg-slate-50 ${isProcessing ? 'pointer-events-none' : ''}`}>
                    {formData.dischargeVideo ? 'تغيير الفيديو' : 'تسجيل الفيديو'}
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button type="button" disabled={isProcessing} onClick={() => setStep(1)} className="py-4 border rounded-xl font-bold text-slate-600 disabled:opacity-50">السابق</button>
                <button 
                  type="button" 
                  onClick={() => setStep(3)}
                  disabled={!formData.chlorineVideo || !formData.dischargeVideo || isProcessing}
                  className="bg-blue-600 text-white py-4 rounded-xl font-bold disabled:opacity-50"
                >
                  التالي: صورة الإيصال
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800">3. صورة الإيصال المستلم</h3>
              
              <div className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-colors ${formData.receiptImage ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
                {formData.receiptImage ? (
                  <div className="text-emerald-600 flex flex-col items-center">
                    <CheckCircle size={40} className="mb-2" />
                    <span className="text-sm font-bold">تم تصوير الإيصال</span>
                    <p className="text-[10px] opacity-70 mt-1">{formData.receiptImage.name}</p>
                  </div>
                ) : (
                  <>
                    <Camera size={48} className="text-slate-400 mb-2" />
                    <p className="text-sm font-bold text-slate-600 mb-1">التقط صورة الإيصال المختوم</p>
                    <p className="text-xs text-slate-400 mb-6 text-center">تأكد من وضوح الختم والبيانات</p>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  onChange={(e) => handleFileChange(e, 'receiptImage')}
                  className="hidden" 
                  id="receipt-input" 
                />
                <label htmlFor="receipt-input" className="bg-white border shadow-sm px-8 py-3 rounded-xl text-sm font-bold cursor-pointer hover:bg-slate-50 flex items-center gap-2">
                  <Camera size={18} />
                  {formData.receiptImage ? 'إعادة التصوير' : 'فتح الكاميرا'}
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button type="button" onClick={() => setStep(2)} className="py-4 border rounded-xl font-bold text-slate-600">السابق</button>
                <button 
                  type="button" 
                  onClick={() => setStep(4)}
                  disabled={!formData.receiptImage}
                  className="bg-blue-600 text-white py-4 rounded-xl font-bold disabled:opacity-50"
                >
                  التالي: مراجعة وإرسال
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800">4. مراجعة البيانات النهائية</h3>
              
              <div className="bg-slate-50 rounded-2xl p-6 space-y-4 border">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-slate-500 text-sm">المستشفى</span>
                  <span className="font-bold text-slate-800">مستشفى الجمهورية</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-slate-500 text-sm">الكمية</span>
                  <span className="font-bold text-slate-800">{formData.quantity} م³</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-600 text-sm font-bold">
                  <CheckCircle size={16} />
                  <span>تم إرفاق وضغط الفيديوهات</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-600 text-sm font-bold">
                  <CheckCircle size={16} />
                  <span>تم إرفاق صورة الإيصال</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button type="button" onClick={() => setStep(3)} className="py-4 border rounded-xl font-bold text-slate-600">السابق</button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white shadow-lg transition-all ${isSubmitting ? 'bg-slate-400' : 'bg-blue-600 shadow-blue-100'}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">جارٍ المعالجة...</span>
                  ) : (
                    <>
                      {isOnline ? <Send size={20} /> : <Save size={20} />}
                      {isOnline ? 'إرسال التوثيق' : 'حفظ للرفع لاحقاً'}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DocumentTransfer;
