import React from 'react';
import type { SpbuConfig } from '../types';

interface SpbuSelectorProps {
  spbuList: SpbuConfig[];
  selectedSpbuId: string;
  onSelect: (id: string) => void;
  onEdit: () => void;
  onAddNew: () => void;
}

const SpbuSelector: React.FC<SpbuSelectorProps> = ({
  spbuList,
  selectedSpbuId,
  onSelect,
  onEdit,
  onAddNew,
}) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
      <h2 className="text-xl font-bold mb-3 text-gray-800">1. Pilih SPBU</h2>
      <div className="flex space-x-2">
        <select
          value={selectedSpbuId}
          onChange={(e) => onSelect(e.target.value)}
          className="grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-700"
          disabled={spbuList.length === 0}
        >
          {spbuList.length === 0 ? (
            <option>Tidak ada SPBU</option>
          ) : (
            spbuList.map((spbu) => (
              <option key={spbu.id} value={spbu.id}>
                {spbu.name}
              </option>
            ))
          )}
        </select>
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={onAddNew}
          className="bg-green-600 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
        >
          Baru
        </button>
      </div>
    </div>
  );
};

export default SpbuSelector;
