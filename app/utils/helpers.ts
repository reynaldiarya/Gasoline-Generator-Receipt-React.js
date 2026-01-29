// app/utils/helpers.ts
import type { TransactionData, SpbuConfig } from '../types';

/**
 * Menghasilkan ID unik berbasis waktu dan angka acak.
 * @returns String ID unik.
 */
export const generateId = (): string => {
  return 'spbu-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

// Data awal untuk form transaksi
export const initialTransactionData: TransactionData = {
  shift: '1',
  noTrans: Math.floor(100000 + Math.random() * 900000).toString(),
  date: new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }),
  time: new Date()
    .toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\./g, ' : '),
  islandPump: '1',
  productName: 'Pertalite',
  pricePerLiter: 10000,
  volume: 10.0,
  cashAmount: 100000,
  operator: 'Admin',
  nopol: 'DR 1234 XY',
};

// Konfigurasi SPBU awal jika tidak ada data di local storage
export const initialSpbuConfig: SpbuConfig = {
  name: 'SPBU PERTAMINA 00.000.00',
  address: 'ALAMAT SPBU LENGKAP',
  footerNote:
    'PERTAMAX Series dan Dex Series\nSubsidi hanya untuk yang berhak\nMenerima.\nTerimakasih dan selamat jalan',
  receiptWidth: 300,
  id: generateId(),
};
