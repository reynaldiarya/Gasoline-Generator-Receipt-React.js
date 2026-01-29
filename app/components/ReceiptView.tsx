// app/components/ReceiptView.tsx
import React from 'react';
import type { SpbuConfig, TransactionData } from '../types';

// Fungsi formatRupiah dipindahkan ke sini untuk mengatasi masalah resolusi path.
const formatRupiah = (number: number): string => {
  if (isNaN(number)) return '0';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

interface ReceiptViewProps {
  spbu: SpbuConfig;
  transaction: TransactionData;
  totalPrice: number;
}

const ReceiptView = React.forwardRef<HTMLDivElement, ReceiptViewProps>(
  ({ spbu, transaction, totalPrice }, ref) => {
    const receiptStyle =
      "font-['Courier_New',_Courier,_monospace] text-xs text-black leading-tight bg-white p-4";

    const totalVolume = parseFloat(transaction.volume.toString()) || 0;
    const priceLiter = parseFloat(transaction.pricePerLiter.toString()) || 0;
    const finalPrice = totalPrice || totalVolume * priceLiter;
    const cash = parseFloat(transaction.cashAmount.toString()) || finalPrice;

    const addressLines = spbu.address ? spbu.address.split('\n') : [];
    const footerLines = spbu.footerNote ? spbu.footerNote.split('\n') : [];

    return (
      <div
        ref={ref}
        className={receiptStyle}
        style={{ width: `${spbu.receiptWidth || 300}px`, margin: '0 auto' }}
      >
        <div className="flex justify-center mb-2">
          <svg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="20" fill="#E4002B" />
            <text
              x="50"
              y="14"
              fontFamily="Arial, sans-serif"
              fontSize="12"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
            >
              PERTAMINA
            </text>
          </svg>
        </div>
        <div className="text-center font-bold mb-2">
          <p className="text-sm">{spbu.name}</p>
          {addressLines.map((line, index) => (
            <p key={index} className="text-xs">
              {line}
            </p>
          ))}
        </div>
        <div className="border-t border-b border-dashed border-black my-2 h-0"></div>
        <div className="grid grid-cols-2 gap-y-1 mb-2">
          <div className="flex justify-between col-span-1 pr-2">
            <span>Shift</span>
            <span>: {transaction.shift}</span>
          </div>
          <div className="flex justify-between col-span-1 pl-2">
            <span>No Trans</span>
            <span>: {transaction.noTrans}</span>
          </div>
          <div className="flex justify-between col-span-1 pr-2">
            <span>Waktu</span>
            <span>: {transaction.date}</span>
          </div>
          <div className="flex justify-between col-span-1 pl-2">
            <span></span>
            <span>{transaction.time}</span>
          </div>
        </div>
        <div className="border-t border-b border-dashed border-black my-2 h-0"></div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Pulau/Pompa</span>
            <span>: {transaction.islandPump}</span>
          </div>
          <div className="flex justify-between">
            <span>Nama Produk</span>
            <span>: {transaction.productName}</span>
          </div>
          <div className="flex justify-between">
            <span>Harga/Liter</span>
            <span>: Rp. {formatRupiah(priceLiter)}</span>
          </div>
          <div className="flex justify-between">
            <span>Volume</span>
            <span>: (L) {totalVolume.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total Harga</span>
            <span>: Rp. {formatRupiah(finalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Operator</span>
            <span>: {transaction.operator}</span>
          </div>
          <div className="flex justify-between">
            <span>Nopol</span>
            <span>: {transaction.nopol}</span>
          </div>
        </div>
        <div className="border-t border-b border-dashed border-black my-2 h-0"></div>
        <div className="flex justify-between mt-3 font-bold">
          <span>CASH</span>
          <span>{formatRupiah(cash)}</span>
        </div>
        <div className="border-t border-b border-dashed border-black my-2 h-0"></div>
        <div className="text-center mt-3 text-[10px] whitespace-pre-line">
          {footerLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    );
  }
);

export default ReceiptView;
