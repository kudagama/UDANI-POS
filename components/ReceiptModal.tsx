"use client";

import React, { useRef } from "react";
import { Customer, CartItem, INITIAL_SETTINGS } from "@/lib/data";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceNumber: string;
  customer: Customer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  grandTotal: number;
  paymentDetails: {
    method: string;
    paidAmount: number;
    balance: number;
  };
  onNewSale: () => void;
}

export default function ReceiptModal({
  isOpen,
  onClose,
  invoiceNumber,
  customer,
  items,
  subtotal,
  discount,
  grandTotal,
  paymentDetails,
  onNewSale,
}: ReceiptModalProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-300 my-8">
        {/* Modal Top Actions */}
        <div className="bg-[#0b2b64] px-6 py-3.5 flex justify-between items-center text-white print:hidden">
          <div className="flex items-center gap-2">
            <i className="fas fa-receipt text-cyan-400"></i>
            <h3 className="font-bold text-sm">Receipt Preview</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#029ed9] hover:bg-[#0089bd] text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <i className="fas fa-print"></i>
              <span>Print Bill</span>
            </button>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white text-lg ml-2"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Printable Thermal Receipt Container */}
        <div
          ref={receiptRef}
          id="printable-receipt"
          className="p-6 font-mono text-xs text-gray-900 bg-white leading-relaxed"
        >
          {/* Brand Header */}
          <div className="text-center pb-3 border-b-2 border-dashed border-gray-400">
            <h2 className="text-xl font-black tracking-wider text-[#0b2b64]">
              UDANI POS
            </h2>
            <p className="text-[11px] font-sans font-semibold text-gray-700">
              {INITIAL_SETTINGS.tagline}
            </p>
            <p className="text-[10px] text-gray-600 mt-0.5">
              {INITIAL_SETTINGS.address}
            </p>
            <p className="text-[10px] text-gray-600">
              Tel: {INITIAL_SETTINGS.contact}
            </p>
          </div>

          {/* Receipt Info */}
          <div className="py-2.5 text-[11px] border-b border-dashed border-gray-300 space-y-0.5">
            <div className="flex justify-between">
              <span className="text-gray-600">Invoice No:</span>
              <span className="font-bold">{invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span>{currentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cashier:</span>
              <span>Admin (Udani POS)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer:</span>
              <span className="font-semibold text-right truncate max-w-[180px]">
                {customer.customer_name}
              </span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="py-2.5 border-b-2 border-dashed border-gray-400">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-gray-300 text-left">
                  <th className="py-1">ITEM</th>
                  <th className="py-1 text-center">QTY</th>
                  <th className="py-1 text-right">PRICE</th>
                  <th className="py-1 text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((cartItem, idx) => {
                  const price =
                    cartItem.priceType === "retail"
                      ? cartItem.item.retail_price
                      : cartItem.item.wholesale_price;
                  const lineTotal =
                    price * cartItem.qty - (cartItem.discountAmount || 0);

                  return (
                    <tr key={idx} className="py-1">
                      <td className="py-1 pr-1">
                        <div className="font-semibold text-gray-900 truncate max-w-[130px]">
                          {cartItem.item.item_name}
                        </div>
                        {cartItem.discountPercent > 0 && (
                          <div className="text-[9px] text-emerald-600">
                            Disc: {cartItem.discountPercent}% (-Rs. {cartItem.discountAmount})
                          </div>
                        )}
                      </td>
                      <td className="py-1 text-center font-bold">{cartItem.qty}</td>
                      <td className="py-1 text-right">{price.toFixed(2)}</td>
                      <td className="py-1 text-right font-bold">{lineTotal.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="py-2.5 text-[11px] space-y-1 border-b-2 border-dashed border-gray-400">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Special Discount:</span>
                <span>-Rs. {discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-black pt-1 border-t border-gray-300 text-gray-900">
              <span>NET TOTAL:</span>
              <span>Rs. {grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment & Change breakdown */}
          <div className="py-2.5 text-[11px] space-y-0.5 border-b border-dashed border-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Mode:</span>
              <span className="font-bold">{paymentDetails.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Tendered:</span>
              <span>Rs. {paymentDetails.paidAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-gray-700">Change Due:</span>
              <span>Rs. {paymentDetails.balance.toFixed(2)}</span>
            </div>
          </div>

          {/* Barcode & Footer notes */}
          <div className="text-center pt-3 space-y-2">
            <div className="font-mono text-[9px] tracking-widest text-gray-500">
              ||| | ||||| || |||||| |||| | |||||||||| ||||
            </div>
            <p className="text-[10px] text-gray-700 font-sans font-medium">
              Thank you for shopping with us!
            </p>
            <p className="text-[9px] text-gray-500">
              Goods once sold are exchangeable within 7 days with bill.
            </p>
            <p className="text-[9px] text-gray-400 font-sans">
              Powered by Silicon Radon Networks &copy; Udani POS
            </p>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-gray-100 px-6 py-3 flex justify-between items-center border-t print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
          >
            Close Preview
          </button>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#029ed9] hover:bg-[#0089bd] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5"
            >
              <i className="fas fa-print"></i>
              <span>Print Bill</span>
            </button>
            <button
              onClick={onNewSale}
              className="px-4 py-2 bg-[#0b2b64] hover:bg-[#1b4690] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5"
            >
              <i className="fas fa-plus"></i>
              <span>New Sale</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
