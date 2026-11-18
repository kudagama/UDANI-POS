"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { INITIAL_SETTINGS } from "@/lib/data";

export default function SettingsPage() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Header currentTitle="System Settings" showQuickNav={true} />
      <Breadcrumbs items={[{ label: "Configuration & Site Settings" }]} />

      <main className="flex-grow p-4 lg:p-8 max-w-4xl mx-auto w-full space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-[#0b2b64]">System & Store Configuration</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Customize company name, address on receipts, invoice headers, and theme branding.
            </p>
          </div>
          {savedSuccess && (
            <div className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-300 animate-in fade-in">
              <i className="fas fa-check-circle mr-1"></i> Settings Saved!
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-sm font-bold text-[#0b2b64] uppercase tracking-wide">
              Company / Store Identity
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              These details appear on your printed POS receipts and customer invoices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={settings.company_name}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                className="w-full p-2.5 text-xs border rounded-lg focus:ring-2 focus:ring-[#029ed9]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Tagline / Subheading
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full p-2.5 text-xs border rounded-lg focus:ring-2 focus:ring-[#029ed9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Official Contact Numbers
              </label>
              <input
                type="text"
                value={settings.contact}
                onChange={(e) => setSettings({ ...settings, contact: e.target.value })}
                className="w-full p-2.5 text-xs border rounded-lg focus:ring-2 focus:ring-[#029ed9]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full p-2.5 text-xs border rounded-lg focus:ring-2 focus:ring-[#029ed9]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Store Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full p-2.5 text-xs border rounded-lg focus:ring-2 focus:ring-[#029ed9]"
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-bold text-[#0b2b64] uppercase tracking-wide mb-3">
              Theme & Branding Colors
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Primary Header Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.header_color}
                    onChange={(e) => setSettings({ ...settings, header_color: e.target.value })}
                    className="w-9 h-9 rounded cursor-pointer border"
                  />
                  <span className="font-mono text-xs">{settings.header_color}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.accent_color}
                    onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                    className="w-9 h-9 rounded cursor-pointer border"
                  />
                  <span className="font-mono text-xs">{settings.accent_color}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Footer Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.footer_color}
                    onChange={(e) => setSettings({ ...settings, footer_color: e.target.value })}
                    className="w-9 h-9 rounded cursor-pointer border"
                  />
                  <span className="font-mono text-xs">{settings.footer_color}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => alert("System caches cleared successfully.")}
              className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              Clear System Cache
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0b2b64] hover:bg-[#1b4690] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
