"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Item, INITIAL_ITEMS } from "@/lib/data";

export default function StockPage() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [search, setSearch] = useState("");
  const [filterStockStatus, setFilterStockStatus] = useState("All");
  const [updatingItem, setUpdatingItem] = useState<Item | null>(null);
  const [addQuantity, setAddQuantity] = useState("");

  const totalStockItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalStockValue = items.reduce(
    (acc, curr) => acc + curr.quantity * curr.purchase_price,
    0
  );
  const lowStockCount = items.filter((i) => i.quantity <= i.minimum_qty).length;

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.item_name.toLowerCase().includes(search.toLowerCase()) ||
      item.item_code.toLowerCase().includes(search.toLowerCase());

    if (filterStockStatus === "Low") {
      return matchesSearch && item.quantity <= item.minimum_qty && item.quantity > 0;
    }
    if (filterStockStatus === "Out") {
      return matchesSearch && item.quantity <= 0;
    }
    return matchesSearch;
  });

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatingItem) return;
    const qtyToAdd = parseInt(addQuantity) || 0;
    if (qtyToAdd === 0) return;

    setItems(
      items.map((i) =>
        i.id === updatingItem.id
          ? { ...i, quantity: Math.max(0, i.quantity + qtyToAdd) }
          : i
      )
    );

    alert(`Stock updated! Added ${qtyToAdd} units to ${updatingItem.item_name}.`);
    setUpdatingItem(null);
    setAddQuantity("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Header currentTitle="Stock Inventory" showQuickNav={true} />
      <Breadcrumbs items={[{ label: "Stock Inventory Tracking" }]} />

      <main className="flex-grow p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Total Inventory Units</span>
              <h3 className="text-2xl font-black text-[#0b2b64] mt-1">{totalStockItems} Units</h3>
            </div>
            <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-[#029ed9] text-xl">
              <i className="fas fa-cubes"></i>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Valuation (Purchase Price)</span>
              <h3 className="text-2xl font-black text-emerald-700 mt-1">
                Rs. {totalStockValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 text-xl">
              <i className="fas fa-warehouse"></i>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Low Stock Alerts</span>
              <h3 className="text-2xl font-black text-rose-600 mt-1">{lowStockCount} Items</h3>
            </div>
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 text-xl">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              type="text"
              placeholder="Search by item code or item title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#029ed9] focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            {(["All", "Low", "Out"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStockStatus(status)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filterStockStatus === status
                    ? "bg-[#0b2b64] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {status === "All"
                  ? "All Stock"
                  : status === "Low"
                  ? "Low Stock Alert"
                  : "Out of Stock"}
              </button>
            ))}
          </div>
        </div>

        {/* Stock Inventory Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-700">
              <thead className="bg-[#0b2b64] text-white text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Item Code</th>
                  <th className="px-4 py-3.5">Product Name</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5 text-center">Alert Limit</th>
                  <th className="px-4 py-3.5 text-center">Current Balance</th>
                  <th className="px-4 py-3.5 text-right">Cost Value</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => {
                  const isLow = item.quantity <= item.minimum_qty && item.quantity > 0;
                  const isOut = item.quantity <= 0;
                  const totalCost = item.quantity * item.purchase_price;

                  return (
                    <tr key={item.id} className="hover:bg-sky-50/50 transition-colors">
                      <td className="px-4 py-3.5 font-mono font-bold text-[#0b2b64]">
                        {item.item_code}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-gray-900">
                        {item.item_name}
                      </td>
                      <td className="px-4 py-3.5 text-gray-600">{item.category}</td>
                      <td className="px-4 py-3.5 text-center text-gray-500 font-mono">
                        {item.minimum_qty}
                      </td>
                      <td className="px-4 py-3.5 text-center font-black text-sm text-[#0b2b64]">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3.5 text-right font-medium text-gray-800">
                        Rs. {totalCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isOut
                              ? "bg-rose-200 text-rose-900"
                              : isLow
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isOut ? "Out of Stock" : isLow ? "Low Stock" : "Sufficient"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setUpdatingItem(item);
                            setAddQuantity("10");
                          }}
                          className="px-3 py-1 bg-[#029ed9] hover:bg-[#0089bd] text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1 mx-auto"
                        >
                          <i className="fas fa-plus"></i>
                          <span>Add Stock</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Stock Update Modal */}
      {updatingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#0b2b64] px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-sm">Add Stock Quantity</h3>
              <button
                onClick={() => setUpdatingItem(null)}
                className="text-white/70 hover:text-white text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateStock} className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">Product</span>
                <p className="text-sm font-bold text-gray-900">{updatingItem.item_name}</p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  Code: {updatingItem.item_code} | Current Stock: {updatingItem.quantity}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Quantity to Add
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={addQuantity}
                  onChange={(e) => setAddQuantity(e.target.value)}
                  className="w-full p-2.5 text-base font-bold border rounded-lg text-center focus:ring-2 focus:ring-[#029ed9]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setUpdatingItem(null)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0b2b64] hover:bg-[#1b4690] text-white text-xs font-bold rounded-lg shadow"
                >
                  Confirm Restock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
