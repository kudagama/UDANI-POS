"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Item, INITIAL_ITEMS } from "@/lib/data";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New item form state
  const [newItemCode, setNewItemCode] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newCategory, setNewCategory] = useState("Eco-Solvent Inks");
  const [newPurchasePrice, setNewPurchasePrice] = useState("");
  const [newRetailPrice, setNewRetailPrice] = useState("");
  const [newWholesalePrice, setNewWholesalePrice] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newMinQty, setNewMinQty] = useState("5");

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.item_name.toLowerCase().includes(search.toLowerCase()) ||
      item.item_code.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemCode || !newItemName || !newRetailPrice) {
      alert("Please enter code, name, and retail price.");
      return;
    }

    const newItem: Item = {
      id: Date.now(),
      item_code: newItemCode.trim(),
      item_name: newItemName.trim(),
      category: newCategory,
      purchase_price: parseFloat(newPurchasePrice) || 0,
      retail_price: parseFloat(newRetailPrice) || 0,
      wholesale_price: parseFloat(newWholesalePrice) || parseFloat(newRetailPrice) || 0,
      quantity: parseInt(newQty) || 0,
      minimum_qty: parseInt(newMinQty) || 5,
      image_path: "/images/items/itemList.png",
      description: "Standard inventory item",
    };

    setItems([newItem, ...items]);
    setIsAddModalOpen(false);
    // Reset form
    setNewItemCode("");
    setNewItemName("");
    setNewPurchasePrice("");
    setNewRetailPrice("");
    setNewWholesalePrice("");
    setNewQty("");
  };

  const handleDeleteItem = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Header currentTitle="Items Management" showQuickNav={true} />
      <Breadcrumbs items={[{ label: "Items & Inventory" }]} />

      <main className="flex-grow p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#0b2b64]">Item Inventory Master</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage product codes, retail/wholesale pricing, and stock thresholds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/pos"
              className="px-4 py-2 bg-sky-50 text-[#029ed9] border border-[#029ed9] hover:bg-sky-100 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <i className="fas fa-cash-register"></i>
              <span>Go to POS</span>
            </Link>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 bg-[#0b2b64] hover:bg-[#1b4690] text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <i className="fas fa-plus"></i>
              <span>Add New Item</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              type="text"
              placeholder="Search by code or product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#029ed9] focus:outline-none"
            />
          </div>

          <div className="w-full sm:w-64">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#029ed9] focus:outline-none bg-white font-medium"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-700">
              <thead className="bg-[#0b2b64] text-white text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Image</th>
                  <th className="px-4 py-3.5">Item Code</th>
                  <th className="px-4 py-3.5">Item Name</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5 text-right">Purchase (Rs)</th>
                  <th className="px-4 py-3.5 text-right">Retail (Rs)</th>
                  <th className="px-4 py-3.5 text-right">Wholesale (Rs)</th>
                  <th className="px-4 py-3.5 text-center">Available Stock</th>
                  <th className="px-4 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => {
                  const isLow = item.quantity <= item.minimum_qty;
                  return (
                    <tr key={item.id} className="hover:bg-sky-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg p-1 flex items-center justify-center border">
                          <Image
                            src={item.image_path}
                            alt={item.item_name}
                            width={32}
                            height={32}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-[#0b2b64]">
                        {item.item_code}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-gray-900">{item.item_name}</div>
                        <p className="text-[10px] text-gray-500 truncate max-w-xs">
                          {item.description}
                        </p>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-600">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600">
                        {item.purchase_price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right font-extrabold text-[#029ed9]">
                        {item.retail_price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-gray-800">
                        {item.wholesale_price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isLow
                              ? "bg-rose-100 text-rose-800 border border-rose-300"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {item.quantity} Units {isLow && "(Low)"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => alert(`Barcode generated for ${item.item_code}`)}
                            title="Print Barcode"
                            className="p-1.5 text-gray-600 hover:text-[#0b2b64] hover:bg-slate-100 rounded"
                          >
                            <i className="fas fa-barcode"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            title="Delete Item"
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#0b2b64] px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-base">Add New Inventory Item</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/70 hover:text-white text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddItem} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Item Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 84920"
                    value={newItemCode}
                    onChange={(e) => setNewItemCode(e.target.value)}
                    className="w-full p-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2 border rounded-lg text-xs bg-white"
                  >
                    <option value="Eco-Solvent Inks">Eco-Solvent Inks</option>
                    <option value="Vinyl & Banners">Vinyl & Banners</option>
                    <option value="Sublimation">Sublimation</option>
                    <option value="Rigid Sheets">Rigid Sheets</option>
                    <option value="Display Stands">Display Stands</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Premium White Vinyl Roll 1.52m"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full p-2 border rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Purchase Price
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newPurchasePrice}
                    onChange={(e) => setNewPurchasePrice(e.target.value)}
                    className="w-full p-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Retail Price *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="0.00"
                    value={newRetailPrice}
                    onChange={(e) => setNewRetailPrice(e.target.value)}
                    className="w-full p-2 border rounded-lg text-xs font-bold text-[#029ed9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Wholesale Price
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newWholesalePrice}
                    onChange={(e) => setNewWholesalePrice(e.target.value)}
                    className="w-full p-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Initial Stock Qty
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newQty}
                    onChange={(e) => setNewQty(e.target.value)}
                    className="w-full p-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Minimum Alert Threshold
                  </label>
                  <input
                    type="number"
                    placeholder="5"
                    value={newMinQty}
                    onChange={(e) => setNewMinQty(e.target.value)}
                    className="w-full p-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0b2b64] hover:bg-[#1b4690] text-white text-xs font-bold rounded-lg shadow"
                >
                  Save Item
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
