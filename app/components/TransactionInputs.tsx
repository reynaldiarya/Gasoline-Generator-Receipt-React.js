import React from 'react';
import type { TransactionData } from '../types';
import { formatRupiah } from '../utils/formatters';
import { Input } from './ui/Forms';

interface TransactionInputsProps {
  transaction: TransactionData;
  totalPrice: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TransactionInputs: React.FC<TransactionInputsProps> = ({
  transaction,
  totalPrice,
  onChange,
}) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
      <h2 className="text-xl font-bold mb-3 text-gray-800">2. Data Transaksi</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <Input label="Shift" name="shift" value={transaction.shift} onChange={onChange} />
        <Input
          label="No. Transaksi"
          name="noTrans"
          value={transaction.noTrans}
          onChange={onChange}
        />
        <Input
          label="Tanggal"
          name="date"
          value={transaction.date}
          onChange={onChange}
          disabled={true}
        />
        <Input
          label="Waktu"
          name="time"
          value={transaction.time}
          onChange={onChange}
          disabled={true}
        />
        <Input
          label="Pulau/Pompa"
          name="islandPump"
          value={transaction.islandPump}
          onChange={onChange}
        />
        <Input
          label="Nama Produk"
          name="productName"
          value={transaction.productName}
          onChange={onChange}
        />
        <Input
          label="Harga/Liter (Rp)"
          name="pricePerLiter"
          value={transaction.pricePerLiter}
          onChange={onChange}
          type="number"
        />
        <Input
          label="Volume (Liter)"
          name="volume"
          value={transaction.volume}
          onChange={onChange}
          type="number"
        />
        <Input label="Operator" name="operator" value={transaction.operator} onChange={onChange} />
        <Input label="Nopol" name="nopol" value={transaction.nopol} onChange={onChange} />
        <div className="col-span-2">
          <Input
            label="Uang Tunai (CASH - Rp)"
            name="cashAmount"
            value={transaction.cashAmount}
            onChange={onChange}
            type="number"
          />
        </div>
      </div>
      <div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-800 font-semibold rounded">
        <p>TOTAL HARGA: Rp. {formatRupiah(totalPrice)}</p>
      </div>
    </div>
  );
};

export default TransactionInputs;
