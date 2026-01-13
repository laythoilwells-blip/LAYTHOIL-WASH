
export type UserRole = 'admin' | 'driver';

export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  role: UserRole;
}

export interface Governorate {
  id: number;
  name: string;
}

export interface Directorate {
  id: number;
  name: string;
  governorate_id: number;
}

export interface Hospital {
  id: number;
  name: string;
  directorate_id: number;
  classification: string;
  monthly_quota: number;
}

export interface Driver {
  id: string;
  user_id: string;
  full_name: string;
  username: string;
  hospital_id: number;
}

export interface TransferRecord {
  id: string;
  driver_id: string;
  hospital_id: number;
  hospital_name: string;
  governorate_name: string;
  water_quantity: number;
  chlorine_video_url?: string;
  discharge_video_url?: string;
  receipt_image_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  recipient_id?: string;
  is_broadcast: boolean;
  is_read: boolean;
  created_at: string;
}
