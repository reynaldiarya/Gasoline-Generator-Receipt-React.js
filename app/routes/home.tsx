import React, { useState, useEffect, useRef, useCallback } from 'react';

// Impor Tipe Data
import type { SpbuConfig, TransactionData } from '../types';

// Impor Utilitas
import { formatDate, formatTime } from '../utils/formatters';
import { generateId, initialTransactionData, initialSpbuConfig } from '../utils/helpers';

// Impor Komponen
import ReceiptView from '../components/ReceiptView';
import { LoadingOverlay, FeedbackMessage } from '../components/ui/Feedback';
import SpbuSelector from '../components/SpbuSelector';
import SpbuEditor from '../components/SpbuEditor';
import TransactionInputs from '../components/TransactionInputs';

import html2canvas from 'html2canvas-pro';

// --- Komponen Aplikasi Utama ---
export default function HomePage() {
  // State untuk data aplikasi
  const [spbuList, setSpbuList] = useState<SpbuConfig[]>([]);
  const [selectedSpbuId, setSelectedSpbuId] = useState<string>('');
  const [currentSpbu, setCurrentSpbu] = useState<SpbuConfig>(initialSpbuConfig);
  const [transaction, setTransaction] = useState<TransactionData>(initialTransactionData);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // State untuk UI/helper
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditingSpbu, setIsEditingSpbu] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  // Harga total yang dihitung
  const totalPrice = (Number(transaction.volume) || 0) * (Number(transaction.pricePerLiter) || 0);

  // 1. MEMUAT & MENYIMPAN DATA DARI/KE LOCAL STORAGE
  useEffect(() => {
    setIsLoading(true);
    try {
      const storedData = localStorage.getItem('spbu_generator_data');
      if (storedData) {
        const parsedData: SpbuConfig[] = JSON.parse(storedData);
        setSpbuList(parsedData);
        if (parsedData.length > 0) {
          setSelectedSpbuId(parsedData[0].id);
        }
      } else {
        const initialList = [{ ...initialSpbuConfig }];
        setSpbuList(initialList);
        setSelectedSpbuId(initialList[0].id);
      }
    } catch (error) {
      console.error('Gagal memuat data dari local storage:', error);
      setFeedback({
        message: 'Gagal memuat data. Menggunakan data default.',
        type: 'error',
      });
      const initialList = [{ ...initialSpbuConfig }];
      setSpbuList(initialList);
      setSelectedSpbuId(initialList[0].id);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && spbuList.length > 0) {
      localStorage.setItem('spbu_generator_data', JSON.stringify(spbuList));
    }
  }, [spbuList, isLoading]);

  // 2. Memperbarui SPBU saat ini ketika pilihan berubah
  useEffect(() => {
    const selected = spbuList.find((spbu) => spbu.id === selectedSpbuId);
    if (selected) {
      setCurrentSpbu(selected);
    } else if (spbuList.length > 0) {
      const firstId = spbuList[0].id;
      setSelectedSpbuId(firstId);
      setCurrentSpbu(spbuList[0]);
    } else {
      setCurrentSpbu(initialSpbuConfig);
    }
  }, [selectedSpbuId, spbuList]);

  // --- HANDLER ---
  const handleTransactionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  }, []);

  const handleSpbuChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      setCurrentSpbu((prev) => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
      }));
    },
    []
  );

  const handleSaveSpbu = useCallback(async () => {
    if (!currentSpbu.name) {
      setFeedback({ message: 'Nama SPBU tidak boleh kosong.', type: 'error' });
      return;
    }

    setSpbuList((prevList) => {
      const existingIndex = prevList.findIndex((spbu) => spbu.id === currentSpbu.id);
      if (existingIndex > -1) {
        const updatedList = [...prevList];
        updatedList[existingIndex] = currentSpbu;
        return updatedList;
      } else {
        return [...prevList, currentSpbu];
      }
    });

    setSelectedSpbuId(currentSpbu.id);
    setFeedback({
      message: 'Konfigurasi SPBU berhasil disimpan!',
      type: 'success',
    });
    setIsEditingSpbu(false);
  }, [currentSpbu]);

  const handleAddNewSpbu = useCallback(() => {
    const newSpbu = {
      ...initialSpbuConfig,
      id: generateId(),
      name: 'SPBU BARU',
      address: 'Alamat SPBU Baru',
    };
    setCurrentSpbu(newSpbu);
    setIsEditingSpbu(true);
    setSelectedSpbuId('');
  }, []);

  const handleDeleteSpbu = useCallback(async () => {
    if (spbuList.length <= 1) {
      setFeedback({
        message: 'Minimal harus ada satu konfigurasi SPBU.',
        type: 'error',
      });
      return;
    }
    if (!window.confirm(`PERINGATAN: Anda akan menghapus SPBU "${currentSpbu.name}". Lanjutkan?`))
      return;

    const newList = spbuList.filter((spbu) => spbu.id !== currentSpbu.id);
    setSpbuList(newList);
    setSelectedSpbuId(newList[0]?.id || '');
    setFeedback({ message: 'SPBU berhasil dihapus.', type: 'success' });
    setIsEditingSpbu(false);
  }, [spbuList, currentSpbu]);

  const handlePrintReceipt = useCallback(async () => {
    if (typeof html2canvas === 'undefined') {
      setFeedback({
        message: 'Error: Pustaka html2canvas tidak ditemukan.',
        type: 'error',
      });
      return;
    }
    if (!receiptRef.current) return;
    setIsGenerating(true);

    const now = new Date();
    setTransaction((prev) => ({
      ...prev,
      date: formatDate(now),
      time: formatTime(now),
    }));
    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: 'white',
      });
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(
          `<html><head><title>Cetak Nota</title><style>@media print{body{margin:0;padding:0}img{width:100%;max-width:${currentSpbu.receiptWidth || 300}px;display:block;margin:0 auto}}</style></head><body>`
        );
        printWindow.document.write(
          `<img src="${imgData}" onload="window.print();window.close()" />`
        );
        printWindow.document.write('</body></html>');
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Error generating receipt:', error);
      setFeedback({
        message: `Gagal membuat cetakan: ${(error as Error).message}`,
        type: 'error',
      });
    } finally {
      setIsGenerating(false);
    }
  }, [currentSpbu.receiptWidth]);

  if (isLoading) return <LoadingOverlay text="Memuat Konfigurasi..." />;

  return (
    <div className="min-h-screen bg-gray-200 p-4 font-sans flex justify-center">
      {isGenerating && <LoadingOverlay text={'Membuat Nota...'} />}
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6 border-b-4 border-indigo-500 pb-2">
          Generator Nota Bensin
        </h1>
        <FeedbackMessage message={feedback.message} type={feedback.type} />

        <SpbuSelector
          spbuList={spbuList}
          selectedSpbuId={selectedSpbuId}
          onSelect={(id) => {
            setSelectedSpbuId(id);
            setIsEditingSpbu(false);
          }}
          onEdit={() => {
            if (selectedSpbuId) {
              setIsEditingSpbu(true);
            } else {
              setFeedback({
                message: 'Pilih SPBU untuk diedit.',
                type: 'error',
              });
            }
          }}
          onAddNew={handleAddNewSpbu}
        />

        {isEditingSpbu ? (
          <SpbuEditor
            currentSpbu={currentSpbu}
            spbuListLength={spbuList.length}
            onChange={handleSpbuChange}
            onSave={handleSaveSpbu}
            onCancel={() => setIsEditingSpbu(false)}
            onDelete={handleDeleteSpbu}
          />
        ) : (
          <>
            <TransactionInputs
              transaction={transaction}
              totalPrice={totalPrice}
              onChange={handleTransactionChange}
            />
            <div className="mb-6 p-4 bg-white rounded-lg shadow-xl border-t-4 border-indigo-500">
              <h2 className="text-xl font-bold mb-3 text-gray-800">3. Preview & Cetak</h2>
              <div className="mt-4 p-2 bg-gray-100 border border-dashed border-gray-400 overflow-x-auto">
                <p className="text-center text-xs text-gray-600 mb-2">
                  PRATINJAU NOTA ({currentSpbu.receiptWidth || 300}px)
                </p>
                <ReceiptView
                  ref={receiptRef}
                  spbu={currentSpbu}
                  transaction={transaction}
                  totalPrice={totalPrice}
                />
              </div>
              <button
                onClick={handlePrintReceipt}
                className="w-full mt-5 bg-indigo-600 text-white p-4 rounded-xl text-lg font-bold shadow-lg shadow-indigo-500/50 hover:bg-indigo-700 transition duration-300 flex items-center justify-center space-x-2"
                disabled={isGenerating}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0h6m-6 0v2a2 2 0 002 2h2a2 2 0 002-2v-2"
                  />
                </svg>
                <span>{isGenerating ? 'Mempersiapkan...' : 'Generate & Cetak Nota'}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
