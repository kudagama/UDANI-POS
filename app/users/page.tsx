"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function UsersPage() {
  const [users] = useState([
    { id: 1, name: "Super Administrator", email: "admin@udanipos.lk", role: "Super Admin", status: "Active", phone: "071-2626063" },
    { id: 2, name: "Cashier Terminal 1", email: "cashier1@udanipos.lk", role: "Cashier", status: "Active", phone: "077-1234567" },
    { id: 3, name: "Inventory Manager", email: "stock@udanipos.lk", role: "Stock Manager", status: "Active", phone: "075-8899112" },
    { id: 4, name: "Accountant", email: "accounts@udanipos.lk", role: "Accounts", status: "Active", phone: "078-4455667" },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Header currentTitle="User Management" showQuickNav={true} />
      <Breadcrumbs items={[{ label: "System Users & Staff Permissions" }]} />

      <main className="flex-grow p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#0b2b64]">Staff & User Access Control</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage cashier logins, role authorizations, and staff access credentials.
            </p>
          </div>

          <button
            onClick={() => alert("Add User modal opened")}
            className="px-5 py-2.5 bg-[#0b2b64] hover:bg-[#1b4690] text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <i className="fas fa-user-plus"></i>
            <span>Add New User</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left text-gray-700">
            <thead className="bg-[#0b2b64] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Name</th>
                <th className="px-5 py-3.5">Email Address</th>
                <th className="px-5 py-3.5">Phone</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-sky-50/50">
                  <td className="px-5 py-3.5 font-bold text-gray-900">{u.name}</td>
                  <td className="px-5 py-3.5 text-gray-600">{u.email}</td>
                  <td className="px-5 py-3.5 text-gray-600 font-mono">{u.phone}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 bg-sky-100 text-[#0b2b64] font-bold rounded-md text-[10px]">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <button
                      onClick={() => alert(`Edit user: ${u.name}`)}
                      className="text-[#029ed9] hover:underline font-bold"
                    >
                      Edit Role
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
