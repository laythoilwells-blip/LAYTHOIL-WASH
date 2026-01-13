
import { Hospital, Governorate, Directorate, Driver, TransferRecord } from '../types';

export const mockGovernorates: Governorate[] = [
  { id: 1, name: 'عدن' },
  { id: 2, name: 'صنعاء' },
  { id: 3, name: 'تعز' },
];

export const mockDirectorates: Directorate[] = [
  { id: 1, name: 'المنصورة', governorate_id: 1 },
  { id: 2, name: 'السبعين', governorate_id: 2 },
  { id: 3, name: 'القاهرة', governorate_id: 3 },
];

export const mockHospitals: Hospital[] = [
  { id: 1, name: 'مستشفى الجمهورية', directorate_id: 1, classification: 'UNOPS', monthly_quota: 500 },
  { id: 2, name: 'مستشفى الثورة', directorate_id: 2, classification: 'GVT', monthly_quota: 800 },
];

export const mockDrivers: Driver[] = [
  { id: 'd1', user_id: 'u1', full_name: 'أحمد صالح', username: 'ahmed_driver', hospital_id: 1 },
  { id: 'd2', user_id: 'u2', full_name: 'سالم عبده', username: 'salem_driver', hospital_id: 2 },
];

export const mockRecords: TransferRecord[] = [
  {
    id: 'r1',
    driver_id: 'd1',
    hospital_id: 1,
    hospital_name: 'مستشفى الجمهورية',
    governorate_name: 'عدن',
    water_quantity: 12,
    status: 'approved',
    created_at: new Date().toISOString(),
  },
  {
    id: 'r2',
    driver_id: 'd1',
    hospital_id: 1,
    hospital_name: 'مستشفى الجمهورية',
    governorate_name: 'عدن',
    water_quantity: 15,
    status: 'pending',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  }
];
