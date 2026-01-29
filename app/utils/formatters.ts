// app/utils/formatters.ts

/**
 * Memformat angka menjadi format mata uang Rupiah (contoh: 10.000).
 * @param number Angka yang akan diformat.
 * @returns String dalam format Rupiah.
 */
export const formatRupiah = (number: number): string => {
  if (isNaN(number)) return '0';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * Memformat objek Date menjadi string waktu (HH : MM : SS).
 * @param date Objek Date.
 * @returns String dalam format waktu.
 */
export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours} : ${minutes} : ${seconds}`;
};

/**
 * Memformat objek Date menjadi string tanggal (DD/MM/YYYY).
 * @param date Objek Date.
 * @returns String dalam format tanggal.
 */
export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
