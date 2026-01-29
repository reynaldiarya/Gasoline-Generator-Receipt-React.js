// app/types/index.ts

/**
 * Mendefinisikan struktur data untuk konfigurasi sebuah SPBU.
 */
export interface SpbuConfig {
  id: string;
  name: string;
  address: string;
  footerNote: string;
  receiptWidth: number;
}

/**
 * Mendefinisikan struktur data untuk sebuah transaksi.
 */
export interface TransactionData {
  shift: string;
  noTrans: string;
  date: string;
  time: string;
  islandPump: string;
  productName: string;
  pricePerLiter: number;
  volume: number;
  cashAmount: number;
  operator: string;
  nopol: string;
}
