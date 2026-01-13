
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.48.1';

// ملاحظة: في بيئة الإنتاج على Netlify، قم بإضافة هذه القيم في Site Settings > Environment variables
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
