"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { INITIAL_SALES, INITIAL_ITEMS } from "@/lib/data";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Sales Amount",
      amount: "Rs. 4,892,450.00",
      icon: "/images/dash/sa.png",
      color: "#0b2b64",
    },
    {
      title: "Total Sales Due",
      amount: "Rs. 26,450.00",
      icon: "/images/dash/sd.png",
      color: "#0b2b64",
    },
    {
      title: "Total Expenses Amount",
      amount: "Rs. 1,124,300.00",
      icon: "/images/dash/ea.png",
      color: "#0b2b64",
    },
    {
      title: "Total Payment Received",
      amount: "Rs. 4,866,000.00",
      icon: "/images/dash/sd.png",
      color: "#0b2b64",
    },
    {
      title: "Today Total Sales",
      amount: "Rs. 128,500.00",
      icon: "/images/dash/sa.png",
      color: "#0b2b64",
    },
    {
      title: "Today Total Expenses",
      amount: "Rs. 14,200.00",
      icon: "/images/dash/ea.png",
      color: "#0b2b64",
    },
  ];

  const quickStats = [
    {
      title: "Customers",
      count: "148",
      icon: "/images/dash/customer.png",
      href: "/customers",
    },
    {
      title: "Suppliers",
      count: "32",
      icon: "/images/dash/supplier.png",
      href: "/suppliers",
    },
    {
      title: "Purchases",
      count: "Rs. 2.4M",
      icon: "/images/dash/purchases.png",
      href: "/stock",
    },
    {
      title: "Invoices",
      count: "1,245",
      icon: "/images/dash/invoice.png",
      href: "/sales",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      {/* Top Header */}
      <Header currentTitle="Dashboard" showQuickNav={true} />

      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: "Dashboard" }]} />

      <main className="flex-grow p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Banner with POS Callout */}
        <div className="bg-gradient-to-r from-[#0b2b64] to-[#154b9d] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
              <span className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
                Store Live Overview
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Business Performance & Analytics
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Real-time monitoring of POS transactions, customer debts, and inventory movements.
            </p>
          </div>

          <Link
            href="/pos"
            className="px-6 py-3 bg-[#029ed9] hover:bg-[#0089bd] text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm whitespace-nowrap"
          >
            <i className="fas fa-cash-register"></i>
            <span>Launch POS Terminal</span>
          </Link>
        </div>

        {/* 6 Top Metric Grid Tiles (exact LT_Designers_system style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="h-[80px] bg-white border border-slate-200 rounded-xl flex overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="bg-[#0b2b64] w-1/3 h-full flex justify-center items-center p-2">
                <Image
                  src={s.icon}
                  alt={s.title}
                  width={36}
                  height={36}
                  className="object-contain filter brightness-110"
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-center w-2/3 px-3">
                <p className="text-[11px] text-gray-500 font-medium leading-tight">
                  {s.title}
                </p>
                <h3 className="text-sm lg:text-base font-extrabold text-[#0b2b64] mt-0.5 truncate">
                  {s.amount}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stat Tiles Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:border-[#029ed9] hover:shadow-md transition-all group"
            >
              <div>
                <p className="text-xs text-gray-500 font-semibold">{item.title}</p>
                <h4 className="text-xl font-black text-gray-900 mt-1">{item.count}</h4>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform p-2 border border-slate-100">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={36}
                  height={36}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Charts & Analytics Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Trends Chart Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Weekly Sales vs Expenses
                </h3>
                <p className="text-xs text-gray-500">Revenue performance over the last 7 days</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                +14.8% vs last week
              </span>
            </div>

            {/* Simulated Chart Bars */}
            <div className="space-y-4">
              {[
                { day: "Monday", sales: 85, expenses: 25, amount: "Rs. 85,000" },
                { day: "Tuesday", sales: 60, expenses: 35, amount: "Rs. 60,000" },
                { day: "Wednesday", sales: 95, expenses: 20, amount: "Rs. 95,000" },
                { day: "Thursday", sales: 75, expenses: 30, amount: "Rs. 75,000" },
                { day: "Friday", sales: 110, expenses: 40, amount: "Rs. 110,000" },
                { day: "Saturday", sales: 130, expenses: 45, amount: "Rs. 130,000" },
                { day: "Sunday (Today)", sales: 128, expenses: 14, amount: "Rs. 128,500" },
              ].map((row, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-gray-700">
                    <span>{row.day}</span>
                    <span className="font-bold text-[#0b2b64]">{row.amount}</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${(row.sales / 140) * 100}%` }}
                      className="bg-gradient-to-r from-[#0b2b64] to-[#029ed9] h-full rounded-full"
                    ></div>
                    <div
                      style={{ width: `${(row.expenses / 140) * 100}%` }}
                      className="bg-rose-400 h-full rounded-full ml-1"
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#0b2b64]"></span>
                <span className="text-gray-600">Sales Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                <span className="text-gray-600">Operational Expenses</span>
              </div>
            </div>
          </div>

          {/* Fast Moving Inventory */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-gray-900">
                  Fast Moving Stock
                </h3>
                <Link href="/items" className="text-xs text-[#029ed9] hover:underline font-bold">
                  View All
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {INITIAL_ITEMS.slice(0, 5).map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-800 truncate max-w-[170px]">
                        {item.item_name}
                      </p>
                      <span className="text-[10px] text-gray-500 font-mono">
                        Code: {item.item_code}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-extrabold text-[#029ed9]">
                        Rs. {item.retail_price.toFixed(2)}
                      </p>
                      <span className="text-[10px] font-bold text-emerald-600">
                        {item.quantity} in stock
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/stock"
              className="w-full mt-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl text-center transition-colors block"
            >
              Inspect Stock Report
            </Link>
          </div>
        </div>

        {/* Recent Invoices Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Recent Completed Invoices</h3>
              <p className="text-xs text-gray-500">Latest sales issued from POS terminal</p>
            </div>
            <Link
              href="/sales"
              className="text-xs text-[#0b2b64] font-bold hover:underline"
            >
              Full Sales Log &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-700">
              <thead className="bg-slate-100 text-[11px] uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Invoice #</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3 text-right">Grand Total</th>
                  <th className="px-4 py-3 text-center rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INITIAL_SALES.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-[#0b2b64]">{sale.invoice_number}</td>
                    <td className="px-4 py-3 text-gray-500">{sale.date}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{sale.customer_name}</td>
                    <td className="px-4 py-3">{sale.items_count} items</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[10px]">
                        {sale.payment_method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-black text-gray-900">
                      Rs. {sale.grand_total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
