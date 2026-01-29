import React from 'react';
import type { SpbuConfig } from '../types';
import { Input, Textarea } from './ui/Forms';

interface SpbuEditorProps {
  currentSpbu: SpbuConfig;
  spbuListLength: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

const SpbuEditor: React.FC<SpbuEditorProps> = ({
  currentSpbu,
  spbuListLength,
  onChange,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-xl border-t-4 border-blue-500">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Edit Konfigurasi SPBU</h2>
      <div className="space-y-4 text-gray-700">
        <Input
          label="Nama SPBU"
          name="name"
          value={currentSpbu.name || ''}
          onChange={(e) => onChange(e)}
        />
        <Textarea
          label="Alamat Lengkap (Gunakan Enter untuk baris baru)"
          name="address"
          value={currentSpbu.address || ''}
          onChange={(e) => onChange(e)}
        />
        <Textarea
          label="Catatan Kaki/Footer (Enter untuk baris baru)"
          name="footerNote"
          value={currentSpbu.footerNote || ''}
          onChange={(e) => onChange(e)}
          rows={5}
        />
        <Input
          label="Lebar Nota (px)"
          name="receiptWidth"
          value={currentSpbu.receiptWidth || 300}
          onChange={(e) => onChange(e)}
          type="number"
        />
      </div>
      <div className="flex space-x-3 mt-5">
        <button
          onClick={onSave}
          className="flex-grow bg-blue-600 text-white p-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition"
        >
          Simpan Konfigurasi
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-400 text-white p-3 rounded-lg font-semibold hover:bg-gray-500 transition"
        >
          Batal
        </button>
        {spbuListLength > 1 && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Hapus
          </button>
        )}
      </div>
    </div>
  );
};

export default SpbuEditor;
