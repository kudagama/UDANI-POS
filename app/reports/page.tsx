"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ReportsPage() {
  const reportCards = [
    { title: "Daily Sales Report", desc: "Day end closing, cash drawer balance, payment breakdowns", icon: "fa-calendar-day" },
    { title: "Stock & Inventory Report", desc: "Current valuations, low stock alert list, stock flow", icon: "fa-boxes" },
    { title: "Profit & Loss Summary", desc: "Gross margins, discounts, net profits, operational costs", icon: "fa-chart-line" },
    { title: "Customer Credit & Due Aging", desc: "Outstanding debts, aging brackets, repayment logs", icon: "fa-users" },
    { title: "Expense Analysis", desc: "Category-wise expense breakdown, utility bills, supplier payouts", icon: "fa-file-invoice-dollar" },
    { title: "Tax & Vat Summary", desc: "Monthly tax breakdown, sales tax calculations", icon: "fa-receipt" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Header currentTitle="Reports & Analytics" showQuickNav={true} />
      <Breadcrumbs items={[{ label: "Financial & Operational Reports" }]} />

      <main className="flex-grow p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#0b2b64]">Business Intelligence & Reports</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Export and review audit logs, financial statements, and day-end closing files.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => alert("Downloading full PDF report...")}
              className="px-4 py-2 bg-[#0b2b64] hover:bg-[#1b4690] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <i className="fas fa-file-pdf"></i>
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => alert("Exporting Excel sheet...")}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <i className="fas fa-file-excel"></i>
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportCards.map((rc, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#029ed9] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#029ed9] flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                  <i className={`fas ${rc.icon}`}></i>
                </div>
                <h3 className="font-bold text-base text-gray-900">{rc.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{rc.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <span className="text-[11px] font-bold text-emerald-600">Generated Daily</span>
                <button
                  onClick={() => alert(`Generating ${rc.title}...`)}
                  className="px-3 py-1.5 bg-[#0b2b64] hover:bg-[#029ed9] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <i className="fas fa-eye text-[10px]"></i>
                  <span>View Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
