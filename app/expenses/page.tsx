"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Electricity Bill - Factory & Office", category: "Utilities", date: "2026-11-17", amount: 48500, paidTo: "CEB" },
    { id: 2, title: "Commercial Rent (No: 435 Gopallawa Mawatha)", category: "Rent", date: "2026-11-15", amount: 150000, paidTo: "Landlord" },
    { id: 3, title: "Fiber Internet & Telecom Package", category: "Utilities", date: "2026-11-14", amount: 14500, paidTo: "SLT Mobitel" },
    { id: 4, title: "Machine Service & Printhead Maintenance", category: "Maintenance", date: "2026-11-12", amount: 28000, paidTo: "Technician Nuwan" },
    { id: 5, title: "Staff Tea & Office Supplies", category: "Welfare", date: "2026-11-10", amount: 8200, paidTo: "City Grocery" },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Utilities");
  const [newAmount, setNewAmount] = useState("");
  const [newPaidTo, setNewPaidTo] = useState("");

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;

    setExpenses([
      {
        id: Date.now(),
        title: newTitle,
        category: newCategory,
        date: new Date().toISOString().split("T")[0],
        amount: parseFloat(newAmount) || 0,
        paidTo: newPaidTo || "General",
      },
      ...expenses,
    ]);

    setIsAddOpen(false);
    setNewTitle("");
    setNewAmount("");
    setNewPaidTo("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Header currentTitle="Operational Expenses" showQuickNav={true} />
      <Breadcrumbs items={[{ label: "Daily Expenses & Petty Cash" }]} />

      <main className="flex-grow p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#0b2b64]">Store Operational Expenses</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Record utility bills, petty cash, rent, equipment service, and daily expenditures.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Monthly Expenses</span>
              <p className="text-lg font-black text-rose-700">
                Rs. {totalExpense.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <button
              onClick={() => setIsAddOpen(true)}
              className="px-5 py-2.5 bg-[#0b2b64] hover:bg-[#1b4690] text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <i className="fas fa-plus"></i>
              <span>Record Expense</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left text-gray-700">
            <thead className="bg-[#0b2b64] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Expense Description</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Paid To</th>
                <th className="px-5 py-3.5 text-right">Amount (Rs.)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map((e) => (
                <tr key={e.id} className="hover:bg-sky-50/50">
                  <td className="px-5 py-3.5 font-bold text-gray-900">{e.title}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-gray-700 font-semibold text-[10px]">
                      {e.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{e.date}</td>
                  <td className="px-5 py-3.5 text-gray-700">{e.paidTo}</td>
                  <td className="px-5 py-3.5 text-right font-black text-rose-700 text-sm">
                    Rs. {e.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#0b2b64] px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-sm">Record Expense</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-white/70 hover:text-white text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Office generator diesel refilling"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 border rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2 border rounded-lg text-xs bg-white"
                  >
                    <option value="Utilities">Utilities</option>
                    <option value="Rent">Rent</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Welfare">Welfare</option>
                    <option value="Salary">Salary</option>
                    <option value="Transport">Transport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Amount (Rs.) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full p-2 border rounded-lg text-xs font-bold text-rose-700 text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Paid To / Recipient
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lanka IOC Filling Station"
                  value={newPaidTo}
                  onChange={(e) => setNewPaidTo(e.target.value)}
                  className="w-full p-2 border rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0b2b64] hover:bg-[#1b4690] text-white text-xs font-bold rounded-lg shadow"
                >
                  Record
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
