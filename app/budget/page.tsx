"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function BudgetCalculatorPage() {
  const [materialType, setMaterialType] = useState("Vinyl");
  const [width, setWidth] = useState("10");
  const [height, setHeight] = useState("4");
  const [unit, setUnit] = useState("feet");
  const [quantity, setQuantity] = useState("1");
  const [ratePerSqFt, setRatePerSqFt] = useState("120");
  const [finishingCost, setFinishingCost] = useState("500");
  const [installationCost, setInstallationCost] = useState("1500");
  const [discountPercent, setDiscountPercent] = useState("5");

  // Calculations
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const qty = parseInt(quantity) || 1;
  const sqft = unit === "feet" ? w * h : (w * h) / 144;
  const totalSqft = sqft * qty;
  const printCost = totalSqft * (parseFloat(ratePerSqFt) || 0);
  const finish = (parseFloat(finishingCost) || 0) * qty;
  const install = parseFloat(installationCost) || 0;
  const subtotal = printCost + finish + install;
  const discAmount = (subtotal * (parseFloat(discountPercent) || 0)) / 100;
  const grandTotal = Math.max(0, subtotal - discAmount);

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Header currentTitle="Budget Calculation" showQuickNav={true} />
      <Breadcrumbs items={[{ label: "Budget & Quotation Calculator" }]} />

      <main className="flex-grow p-4 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <i className="fas fa-calculator text-[#029ed9] text-xl"></i>
            <h1 className="text-xl font-bold text-[#0b2b64]">
              Job Budget & Quotation Estimation
            </h1>
          </div>
          <p className="text-xs text-gray-500">
            Calculate accurate client quotations for printing jobs, signage, flex banners, vinyl, and installation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Inputs Column */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#0b2b64] uppercase border-b pb-2">
              Job Specifications
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Material Type
                </label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="w-full p-2.5 text-xs border border-gray-300 rounded-lg bg-white"
                >
                  <option value="Vinyl">Self-Adhesive Vinyl (Glossy/Matte)</option>
                  <option value="Frontlit Banner">Frontlit Flex Banner (380gsm)</option>
                  <option value="Backlit Banner">Backlit Lightbox Banner</option>
                  <option value="One Way Vision">One Way Vision Perforated</option>
                  <option value="Sticker Sheet">Die-Cut Label Stickers</option>
                  <option value="Foam Board">Rigid 5mm Foam Board Print</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Measurement Unit
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-2.5 text-xs border border-gray-300 rounded-lg bg-white"
                >
                  <option value="feet">Feet (ft)</option>
                  <option value="inches">Inches (in)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Width ({unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Height ({unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 rounded-lg font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Rate / SqFt (Rs.)
                </label>
                <input
                  type="number"
                  value={ratePerSqFt}
                  onChange={(e) => setRatePerSqFt(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Finishing / Eyelets (Rs.)
                </label>
                <input
                  type="number"
                  value={finishingCost}
                  onChange={(e) => setFinishingCost(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Installation Fee (Rs.)
                </label>
                <input
                  type="number"
                  value={installationCost}
                  onChange={(e) => setInstallationCost(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Quotation Discount (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-32 p-2 text-xs border border-gray-300 rounded-lg font-bold text-emerald-700"
              />
            </div>
          </div>

          {/* Quotation Summary Card */}
          <div className="bg-gradient-to-b from-[#0b2b64] to-[#081d43] text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-cyan-300 mb-4 pb-2 border-b border-white/20">
                Quotation Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Area:</span>
                  <span className="font-bold text-white font-mono">
                    {totalSqft.toFixed(2)} SqFt
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-300">Material Cost:</span>
                  <span className="font-bold text-white">
                    Rs. {printCost.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-300">Finishing / Eyelets:</span>
                  <span className="font-bold text-white">
                    Rs. {finish.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-300">Site Installation:</span>
                  <span className="font-bold text-white">
                    Rs. {install.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between border-t border-white/20 pt-2 text-emerald-300">
                  <span>Discount ({discountPercent}%):</span>
                  <span>-Rs. {discAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-dashed border-white/30">
              <span className="text-xs text-slate-300 font-semibold uppercase block mb-1">
                Estimated Client Total
              </span>
              <p className="text-3xl font-black text-cyan-400">
                Rs. {grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>

              <button
                onClick={() => alert(`Quotation of Rs. ${grandTotal.toFixed(2)} generated successfully!`)}
                className="w-full mt-4 py-2.5 bg-[#029ed9] hover:bg-[#0089bd] text-white text-xs font-bold rounded-xl shadow-lg transition-all"
              >
                <i className="fas fa-file-invoice mr-1.5"></i>
                Generate Formal Quote
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
