"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AddCustomerModal from "@/components/AddCustomerModal";
import { Customer, INITIAL_CUSTOMERS } from "@/lib/data";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [settlingCustomer, setSettlingCustomer] = useState<Customer | null>(null);
  const [settleAmount, setSettleAmount] = useState("");

  const filteredCustomers = customers.filter(
    (c) =>
      c.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact_number.includes(search) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  const totalOutstandingDue = customers.reduce((acc, curr) => acc + curr.due_amount, 0);

  const handleCustomerAdded = (newCus: Customer) => {
    setCustomers([newCus, ...customers]);
  };

  const handleSettleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settlingCustomer) return;
    const amount = parseFloat(settleAmount) || 0;
    if (amount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    setCustomers(
      customers.map((c) =>
        c.id === settlingCustomer.id
          ? { ...c, due_amount: Math.max(0, c.due_amount - amount) }
          : c
      )
    );
    alert(`Payment of Rs. ${amount.toFixed(2)} received from ${settlingCustomer.customer_name}. Due updated.`);
    setSettlingCustomer(null);
    setSettleAmount("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Header currentTitle="Customer Directory & Credit" showQuickNav={true} />
      <Breadcrumbs items={[{ label: "Customers & Due Balances" }]} />

      <main className="flex-grow p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Header & Metrics */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#0b2b64]">Customer Accounts & Due Tracker</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage client records, outstanding credit, and credit limit allowances.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-rose-50 border border-rose-200 px-4 py-2 rounded-xl text-right">
              <span className="text-[10px] font-bold text-rose-700 uppercase">
                Total Outstanding Due
              </span>
              <p className="text-lg font-black text-rose-800">
                Rs. {totalOutstandingDue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 bg-[#0b2b64] hover:bg-[#1b4690] text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <i className="fas fa-user-plus"></i>
              <span>Add Customer</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              type="text"
              placeholder="Search by customer name, phone number or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#029ed9] focus:outline-none"
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-700">
              <thead className="bg-[#0b2b64] text-white text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Customer Name</th>
                  <th className="px-4 py-3.5">Contact Number</th>
                  <th className="px-4 py-3.5">Email</th>
                  <th className="px-4 py-3.5">City / Address</th>
                  <th className="px-4 py-3.5 text-right">Credit Limit</th>
                  <th className="px-4 py-3.5 text-right">Current Due</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((cus) => {
                  const hasDue = cus.due_amount > 0;
                  return (
                    <tr key={cus.id} className="hover:bg-sky-50/50 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-gray-900">
                        {cus.customer_name}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-gray-600">
                        {cus.contact_number}
                      </td>
                      <td className="px-4 py-3.5 text-gray-500">{cus.email}</td>
                      <td className="px-4 py-3.5 text-gray-600">{cus.address}</td>
                      <td className="px-4 py-3.5 text-right font-medium text-gray-700">
                        Rs. {cus.credit_limit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span
                          className={`font-black text-sm ${
                            hasDue ? "text-rose-600" : "text-emerald-600"
                          }`}
                        >
                          Rs. {cus.due_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            hasDue
                              ? "bg-rose-100 text-rose-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {hasDue ? "Has Due Balance" : "Clear"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {hasDue ? (
                          <button
                            onClick={() => {
                              setSettlingCustomer(cus);
                              setSettleAmount(cus.due_amount.toString());
                            }}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                          >
                            <i className="fas fa-hand-holding-usd mr-1"></i>
                            Settle Due
                          </button>
                        ) : (
                          <span className="text-[11px] text-gray-400 font-medium">None</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Settle Due Modal */}
      {settlingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#0b2b64] px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-base">Collect Due Payment</h3>
              <button
                onClick={() => setSettlingCustomer(null)}
                className="text-white/70 hover:text-white text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSettleSubmit} className="p-6 space-y-4">
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase">Customer</span>
                <p className="text-base font-bold text-gray-900">
                  {settlingCustomer.customer_name}
                </p>
              </div>

              <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 flex justify-between items-center">
                <span className="text-xs font-bold text-rose-800">Total Due Amount:</span>
                <span className="text-base font-black text-rose-700">
                  Rs. {settlingCustomer.due_amount.toFixed(2)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Payment Amount Received (Rs.) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={settleAmount}
                  onChange={(e) => setSettleAmount(e.target.value)}
                  className="w-full p-2.5 text-base font-bold border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-[#029ed9] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setSettlingCustomer(null)}
                  className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow"
                >
                  Confirm & Update Balance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleCustomerAdded}
      />

      <Footer />
    </div>
  );
}
