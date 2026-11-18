"use client";

import React from "react";
import { HoldOrder } from "@/lib/data";

interface HoldListModalProps {
  isOpen: boolean;
  onClose: () => void;
  holdOrders: HoldOrder[];
  onRestore: (order: HoldOrder) => void;
  onDiscard: (orderId: string) => void;
}

export default function HoldListModal({
  isOpen,
  onClose,
  holdOrders,
  onRestore,
  onDiscard,
}: HoldListModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-200">
        {/* Header */}
        <div className="bg-[#0b2b64] px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <i className="fas fa-pause-circle text-amber-400 text-lg"></i>
            <h3 className="font-bold text-lg">Hold Orders Queue</h3>
            <span className="ml-2 bg-red-500 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
              {holdOrders.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {holdOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <i className="fas fa-inbox text-4xl text-gray-300 mb-3 block"></i>
              <p className="font-medium">No orders currently on hold.</p>
              <p className="text-xs text-gray-400 mt-1">
                You can hold any active cart by clicking the &quot;Hold All&quot; button in POS.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {holdOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 hover:border-[#029ed9] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-50/50 hover:bg-sky-50/40 transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0b2b64]">
                        {order.customer.customer_name}
                      </span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md">
                        {order.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.items.length} item(s) •{" "}
                      {order.items.map((i) => `${i.item.item_name} (x${i.qty})`).join(", ")}
                    </p>
                    <p className="text-sm font-extrabold text-[#029ed9] mt-1">
                      Rs. {order.totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => onRestore(order)}
                      className="px-4 py-1.5 bg-[#0b2b64] hover:bg-[#1b4690] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <i className="fas fa-undo"></i>
                      <span>Restore Cart</span>
                    </button>
                    <button
                      onClick={() => onDiscard(order.id)}
                      className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-600 text-xs font-bold rounded-lg transition-all"
                      title="Delete hold order"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-3 flex justify-end border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
