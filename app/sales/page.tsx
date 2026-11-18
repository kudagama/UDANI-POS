"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { INITIAL_SALES, SaleRecord } from "@/lib/data";

export default function SalesPage() {
  const [sales] = useState<SaleRecord[]>(INITIAL_SALES);
  const [search, setSearch] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("All");

  const filteredSales = sales.filter((s) => {
    const matchesSearch =
      s.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
      s.customer_name.toLowerCase().includes(search.toLowerCase());
    const matchesMethod = selectedMethod === "All" || s.payment_method === selectedMethod;
    return matchesSearch && matchesMethod;
  });

  const totalSalesRevenue = sales.reduce((acc, curr) => acc + curr.grand_total, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Header currentTitle="Sales & Orders" showQuickNav={true} />
      <Breadcrumbs items={[{ label: "Sales Invoices" }]} />

      <main className="flex-grow p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Top Overview */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#0b2b64]">Sales Invoices & Transactions</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Review completed receipts, payment statuses, and invoice records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right mr-3">
              <span className="text-[11px] font-semibold text-gray-500 uppercase">Total Sales Value</span>
              <p className="text-lg font-black text-emerald-700">
                Rs. {totalSalesRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>

            <Link
              href="/pos"
              className="px-5 py-2.5 bg-[#029ed9] hover:bg-[#0089bd] text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <i className="fas fa-plus-circle"></i>
              <span>New POS Sale</span>
            </Link>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              type="text"
              placeholder="Search invoice number or customer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#029ed9] focus:outline-none"
            />
          </div>

          <div className="w-full sm:w-56">
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#029ed9] focus:outline-none bg-white font-medium"
            >
              <option value="All">All Payment Methods</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit">Credit</option>
            </select>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-700">
              <thead className="bg-[#0b2b64] text-white text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Invoice #</th>
                  <th className="px-4 py-3.5">Date & Time</th>
                  <th className="px-4 py-3.5">Customer Name</th>
                  <th className="px-4 py-3.5 text-center">Items</th>
                  <th className="px-4 py-3.5 text-right">Subtotal</th>
                  <th className="px-4 py-3.5 text-right">Discount</th>
                  <th className="px-4 py-3.5 text-right">Grand Total</th>
                  <th className="px-4 py-3.5 text-center">Method</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-sky-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-[#0b2b64]">
                      {sale.invoice_number}
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{sale.date}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{sale.customer_name}</td>
                    <td className="px-4 py-3 text-center">{sale.items_count} pcs</td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      Rs. {sale.subtotal.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-medium">
                      {sale.discount > 0 ? `-Rs. ${sale.discount.toFixed(2)}` : "-"}
                    </td>
                    <td className="px-4 py-3 text-right font-black text-gray-900 text-sm">
                      Rs. {sale.grand_total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-bold text-[10px] text-slate-700">
                        {sale.payment_method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          sale.status === "Completed"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => alert(`Showing receipt for ${sale.invoice_number}`)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-[#029ed9] hover:text-white text-[#0b2b64] rounded font-bold text-[11px] transition-colors"
                      >
                        <i className="fas fa-print mr-1"></i>
                        Bill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
