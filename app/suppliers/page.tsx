"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function SuppliersPage() {
  const [suppliers] = useState([
    { id: 1, name: "InkTech International (Pvt) Ltd", contact: "011-2345678", email: "sales@inktech.lk", supplies: "Eco-Solvent & Sublimation Inks", outstanding: 125000 },
    { id: 2, name: "Lanka Flex & Media Traders", contact: "011-9876543", email: "orders@lankaflex.com", supplies: "Frontlit, Backlit & Vinyl Rolls", outstanding: 84000 },
    { id: 3, name: "Modern Display Hardware Co.", contact: "081-4567890", email: "info@moderndisplay.lk", supplies: "Roll-Up Stands, Eyelets, Tools", outstanding: 0 },
    { id: 4, name: "Kandy Foam Board Importers", contact: "077-8899001", email: "kandyfoam@gmail.com", supplies: "Rigid Foam & PVC Sheets", outstanding: 32000 },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Header currentTitle="Supplier Management" showQuickNav={true} />
      <Breadcrumbs items={[{ label: "Suppliers & Raw Material Vendors" }]} />

      <main className="flex-grow p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#0b2b64]">Raw Material Suppliers</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Track vendor purchase orders, material supplies, and payable balances.
            </p>
          </div>

          <button
            onClick={() => alert("Add Supplier modal opened")}
            className="px-5 py-2.5 bg-[#0b2b64] hover:bg-[#1b4690] text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <i className="fas fa-truck-loading"></i>
            <span>Add Supplier</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left text-gray-700">
            <thead className="bg-[#0b2b64] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Vendor / Company</th>
                <th className="px-5 py-3.5">Contact Number</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Material Category</th>
                <th className="px-5 py-3.5 text-right">Payable Balance</th>
                <th className="px-5 py-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {suppliers.map((s) => (
                <tr key={s.id} className="hover:bg-sky-50/50">
                  <td className="px-5 py-3.5 font-bold text-gray-900">{s.name}</td>
                  <td className="px-5 py-3.5 font-mono text-gray-600">{s.contact}</td>
                  <td className="px-5 py-3.5 text-gray-500">{s.email}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-700">{s.supplies}</td>
                  <td className="px-5 py-3.5 text-right font-bold text-gray-900">
                    Rs. {s.outstanding.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <button
                      onClick={() => alert(`View supplier: ${s.name}`)}
                      className="px-3 py-1 bg-slate-100 hover:bg-[#029ed9] hover:text-white rounded text-xs font-semibold"
                    >
                      Orders
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
