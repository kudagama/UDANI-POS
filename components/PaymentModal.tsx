"use client";

import React, { useState, useEffect } from "react";
import { Customer } from "@/lib/data";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  grandTotal: number;
  totalQuantity: number;
  customer: Customer;
  onConfirmPayment: (paymentDetails: {
    method: 'Cash' | 'Card' | 'Bank Transfer' | 'Credit';
    paidAmount: number;
    balance: number;
    discount: number;
  }) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  grandTotal,
  totalQuantity,
  customer,
  onConfirmPayment,
}: PaymentModalProps) {
  const [method, setMethod] = useState<'Cash' | 'Card' | 'Bank Transfer' | 'Credit'>('Cash');
  const [tendered, setTendered] = useState<string>("");
  const [discount, setDiscount] = useState<string>("0");

  useEffect(() => {
    if (isOpen) {
      setTendered(grandTotal.toString());
      setDiscount("0");
    }
  }, [isOpen, grandTotal]);

  if (!isOpen) return null;

  const finalTotal = Math.max(0, grandTotal - (parseFloat(discount) || 0));
  const paid = parseFloat(tendered) || 0;
  const balance = paid - finalTotal;

  const handlePreset = (amount: number) => {
    setTendered(amount.toString());
  };

  const handleAddPreset = (add: number) => {
    const current = parseFloat(tendered) || 0;
    setTendered((current + add).toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (method === 'Cash' && paid < finalTotal) {
      if (!confirm(`Paid amount (Rs. ${paid}) is less than total (Rs. ${finalTotal}). Mark remainder as customer credit/due?`)) {
        return;
      }
    }

    onConfirmPayment({
      method,
      paidAmount: paid,
      balance: Math.max(0, balance),
      discount: parseFloat(discount) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-200">
        {/* Header */}
        <div className="bg-[#0b2b64] px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <i className="fas fa-cash-register text-cyan-400 text-lg"></i>
            <h3 className="font-bold text-lg">Finalize Payment & Checkout</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Amount Overview Cards */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-center">
              <span className="text-[11px] font-semibold text-gray-500 uppercase">Items / Qty</span>
              <p className="text-base font-bold text-gray-800">{totalQuantity} Units</p>
            </div>
            <div className="text-center border-x border-slate-200">
              <span className="text-[11px] font-semibold text-gray-500 uppercase">Total Payable</span>
              <p className="text-lg font-black text-[#0b2b64]">
                Rs. {finalTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-center">
              <span className="text-[11px] font-semibold text-gray-500 uppercase">Customer</span>
              <p className="text-xs font-bold text-gray-800 truncate" title={customer.customer_name}>
                {customer.customer_name}
              </p>
            </div>
          </div>

          {/* Customer Due Alert if exists */}
          {customer.due_amount > 0 && (
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-2.5 text-xs text-amber-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <i className="fas fa-exclamation-circle text-amber-600"></i>
                Outstanding Prior Due Balance:
              </span>
              <span className="font-extrabold text-amber-900">
                Rs. {customer.due_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}

          {/* Payment Method Tabs */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
              Select Payment Method
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Cash', 'Card', 'Bank Transfer', 'Credit'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 border-2 ${
                    method === m
                      ? "border-[#029ed9] bg-[#0b2b64] text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <i
                    className={`fas ${
                      m === 'Cash'
                        ? 'fa-money-bill-wave text-emerald-400'
                        : m === 'Card'
                        ? 'fa-credit-card text-sky-400'
                        : m === 'Bank Transfer'
                        ? 'fa-university text-amber-400'
                        : 'fa-user-clock text-rose-400'
                    }`}
                  ></i>
                  <span>{m}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tendered Amount & Discount Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Amount Tendered / Paid (Rs.)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={tendered}
                onChange={(e) => setTendered(e.target.value)}
                className="w-full text-lg font-bold text-right px-3.5 py-2 border-2 border-gray-300 rounded-lg focus:border-[#029ed9] focus:outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Special Discount (Rs.)
              </label>
              <input
                type="number"
                step="0.01"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full text-lg font-bold text-right px-3.5 py-2 border-2 border-gray-300 rounded-lg focus:border-[#029ed9] focus:outline-none text-emerald-600"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Quick Cash Presets */}
          {method === 'Cash' && (
            <div>
              <span className="text-[11px] font-semibold text-gray-500 uppercase block mb-1.5">
                Quick Cash Buttons
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handlePreset(finalTotal)}
                  className="px-3 py-1 bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold rounded-md"
                >
                  Exact (Rs. {finalTotal.toFixed(0)})
                </button>
                <button
                  type="button"
                  onClick={() => handleAddPreset(500)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-md"
                >
                  +500
                </button>
                <button
                  type="button"
                  onClick={() => handleAddPreset(1000)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-md"
                >
                  +1,000
                </button>
                <button
                  type="button"
                  onClick={() => handleAddPreset(5000)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-md"
                >
                  +5,000
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(Math.ceil(finalTotal / 1000) * 1000)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-md"
                >
                  Round 1,000s
                </button>
              </div>
            </div>
          )}

          {/* Change / Balance calculation display */}
          <div className={`p-4 rounded-xl border flex justify-between items-center ${
            balance >= 0 ? "bg-emerald-50 border-emerald-300" : "bg-rose-50 border-rose-300"
          }`}>
            <div>
              <span className="text-xs font-bold text-gray-700 uppercase">
                {balance >= 0 ? "Change / Return to Customer" : "Shortage / Remaining Due"}
              </span>
              <p className="text-xs text-gray-500">
                {balance >= 0 ? "Amount to give back" : "Unpaid balance recorded to credit"}
              </p>
            </div>
            <span className={`text-2xl font-black ${balance >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
              Rs. {Math.abs(balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-700/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <i className="fas fa-check-circle"></i>
              <span>Confirm & Print Receipt</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
