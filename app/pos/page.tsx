"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AddCustomerModal from "@/components/AddCustomerModal";
import HoldListModal from "@/components/HoldListModal";
import PaymentModal from "@/components/PaymentModal";
import ReceiptModal from "@/components/ReceiptModal";
import {
  Item,
  Customer,
  CartItem,
  HoldOrder,
  INITIAL_ITEMS,
  INITIAL_CUSTOMERS,
} from "@/lib/data";

export default function PosBillingPage() {
  // State
  const [itemsList] = useState<Item[]>(INITIAL_ITEMS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>(1);
  const [priceType, setPriceType] = useState<"retail" | "wholesale">("retail");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [barcodeError, setBarcodeError] = useState("");
  const [searchItemTerm, setSearchItemTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [overallDiscount, setOverallDiscount] = useState<string>("0");
  const [holdOrders, setHoldOrders] = useState<HoldOrder[]>([]);

  // Modals state
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Active Sale details for Receipt
  const [completedSale, setCompletedSale] = useState<{
    invoiceNumber: string;
    customer: Customer;
    items: CartItem[];
    subtotal: number;
    discount: number;
    grandTotal: number;
    paymentDetails: {
      method: string;
      paidAmount: number;
      balance: number;
    };
  } | null>(null);

  // Active Customer
  const currentCustomer = useMemo(() => {
    return customers.find((c) => c.id === selectedCustomerId) || customers[0];
  }, [customers, selectedCustomerId]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(itemsList.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [itemsList]);

  // Filtered Items for right grid
  const filteredProducts = useMemo(() => {
    return itemsList.filter((item) => {
      const matchesSearch =
        item.item_name.toLowerCase().includes(searchItemTerm.toLowerCase()) ||
        item.item_code.toLowerCase().includes(searchItemTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [itemsList, searchItemTerm, selectedCategory]);

  // Add Item to cart
  const handleAddToCart = (item: Item) => {
    if (item.quantity <= 0) {
      alert("This item is currently out of stock!");
      return;
    }

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((ci) => ci.item.id === item.id);
      if (existingIdx >= 0) {
        const updated = [...prevCart];
        const newQty = updated[existingIdx].qty + 1;
        if (newQty > item.quantity) {
          alert(`Cannot exceed available stock of ${item.quantity} units!`);
          return prevCart;
        }
        updated[existingIdx].qty = newQty;
        // Recalculate discount Rs
        const price =
          priceType === "retail" ? item.retail_price : item.wholesale_price;
        updated[existingIdx].discountAmount =
          (price * newQty * updated[existingIdx].discountPercent) / 100;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            item,
            qty: 1,
            priceType,
            discountPercent: 0,
            discountAmount: 0,
          },
        ];
      }
    });
  };

  // Barcode input enter
  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBarcodeError("");
    const trimmed = barcodeInput.trim();
    if (!trimmed) return;

    const matched = itemsList.find(
      (i) =>
        i.item_code.toLowerCase() === trimmed.toLowerCase() ||
        i.item_name.toLowerCase().includes(trimmed.toLowerCase())
    );

    if (matched) {
      handleAddToCart(matched);
      setBarcodeInput("");
    } else {
      setBarcodeError(`Item code "${trimmed}" not found.`);
    }
  };

  // Cart Qty update
  const handleUpdateQty = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const target = updated[index];
      const newQty = target.qty + delta;

      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      if (newQty > target.item.quantity) {
        alert(`Cannot exceed stock limit of ${target.item.quantity} units!`);
        return prev;
      }

      target.qty = newQty;
      const price =
        target.priceType === "retail"
          ? target.item.retail_price
          : target.item.wholesale_price;
      target.discountAmount = (price * newQty * target.discountPercent) / 100;
      return updated;
    });
  };

  // Remove from cart
  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Discount % change
  const handleDiscountPercentChange = (index: number, percentStr: string) => {
    const percent = parseFloat(percentStr) || 0;
    setCart((prev) => {
      const updated = [...prev];
      const target = updated[index];
      target.discountPercent = Math.min(100, Math.max(0, percent));
      const price =
        target.priceType === "retail"
          ? target.item.retail_price
          : target.item.wholesale_price;
      target.discountAmount = (price * target.qty * target.discountPercent) / 100;
      return updated;
    });
  };

  // Discount Rs change
  const handleDiscountAmountChange = (index: number, amountStr: string) => {
    const amount = parseFloat(amountStr) || 0;
    setCart((prev) => {
      const updated = [...prev];
      const target = updated[index];
      const price =
        target.priceType === "retail"
          ? target.item.retail_price
          : target.item.wholesale_price;
      const lineSubtotal = price * target.qty;
      target.discountAmount = Math.min(lineSubtotal, Math.max(0, amount));
      target.discountPercent =
        lineSubtotal > 0 ? (target.discountAmount / lineSubtotal) * 100 : 0;
      return updated;
    });
  };

  // Totals calculations
  const totalQuantity = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.qty, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, curr) => {
      const price =
        curr.priceType === "retail"
          ? curr.item.retail_price
          : curr.item.wholesale_price;
      return acc + (price * curr.qty - curr.discountAmount);
    }, 0);
  }, [cart]);

  const grandTotal = useMemo(() => {
    const discount = parseFloat(overallDiscount) || 0;
    return Math.max(0, subtotal - discount);
  }, [subtotal, overallDiscount]);

  // Hold All action
  const handleHoldAll = () => {
    if (cart.length === 0) {
      alert("Cart is empty! Nothing to hold.");
      return;
    }

    const newHold: HoldOrder = {
      id: `HOLD-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      customer: currentCustomer,
      items: cart,
      totalAmount: grandTotal,
    };

    setHoldOrders((prev) => [newHold, ...prev]);
    setCart([]);
    setOverallDiscount("0");
    alert(`Order held successfully. Order ID: ${newHold.id}`);
  };

  // Restore Hold Order
  const handleRestoreHoldOrder = (order: HoldOrder) => {
    if (cart.length > 0) {
      if (!confirm("Replacing active cart with held order. Continue?")) {
        return;
      }
    }

    setSelectedCustomerId(order.customer.id);
    setCart(order.items);
    setHoldOrders((prev) => prev.filter((o) => o.id !== order.id));
    setIsHoldModalOpen(false);
  };

  // Discard Hold Order
  const handleDiscardHoldOrder = (orderId: string) => {
    if (confirm("Are you sure you want to discard this held order?")) {
      setHoldOrders((prev) => prev.filter((o) => o.id !== orderId));
    }
  };

  // Cancel Cart
  const handleCancelCart = () => {
    if (cart.length === 0) return;
    if (confirm("Are you sure you want to cancel and clear the active cart?")) {
      setCart([]);
      setOverallDiscount("0");
    }
  };

  // Add Customer Callback
  const handleCustomerAdded = (newCus: Customer) => {
    setCustomers((prev) => [newCus, ...prev]);
    setSelectedCustomerId(newCus.id);
  };

  // Checkout Payment Confirmation
  const handleConfirmPayment = (paymentDetails: {
    method: 'Cash' | 'Card' | 'Bank Transfer' | 'Credit';
    paidAmount: number;
    balance: number;
    discount: number;
  }) => {
    const invoiceNum = `INV-${new Date().getFullYear()}${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;

    const saleInfo = {
      invoiceNumber: invoiceNum,
      customer: currentCustomer,
      items: [...cart],
      subtotal,
      discount: (parseFloat(overallDiscount) || 0) + paymentDetails.discount,
      grandTotal: Math.max(0, grandTotal - paymentDetails.discount),
      paymentDetails: {
        method: paymentDetails.method,
        paidAmount: paymentDetails.paidAmount,
        balance: paymentDetails.balance,
      },
    };

    setCompletedSale(saleInfo);
    setIsPaymentModalOpen(false);
    setIsReceiptModalOpen(true);
  };

  // New Sale after Receipt
  const handleStartNewSale = () => {
    setCart([]);
    setOverallDiscount("0");
    setSelectedCustomerId(1);
    setCompletedSale(null);
    setIsReceiptModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      {/* Top Header */}
      <Header currentTitle="POS Billing" showQuickNav={true} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Sales", href: "/sales" },
          { label: "Billing System (POS)" },
        ]}
      />

      {/* Main POS Interface (2-column layout from LT_Designers_system) */}
      <main className="flex-grow flex flex-col xl:flex-row gap-4 p-4 lg:p-6 max-w-[1920px] mx-auto w-full">
        {/* LEFT COLUMN: Billing System Cart & Controls (2/3 width) */}
        <div className="bg-white flex flex-col w-full xl:w-2/3 rounded-xl border-2 border-slate-300 shadow-xl overflow-hidden">
          {/* Header Banner - Navy with View Hold List and Price toggles */}
          <div className="bg-[#0b2b64] min-h-[64px] px-5 py-3 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2.5 text-white">
              <i className="fas fa-cash-register text-cyan-400 text-lg"></i>
              <h2 className="text-lg font-bold tracking-wide">Billing System</h2>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Hold List Button */}
              <button
                onClick={() => setIsHoldModalOpen(true)}
                className="relative px-4 py-1.5 text-xs font-bold text-[#0b2b64] bg-white hover:bg-slate-100 rounded-lg shadow transition-all flex items-center gap-2"
              >
                <i className="fas fa-pause-circle text-amber-500"></i>
                <span>View Hold List</span>
                {holdOrders.length > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center text-[10px] text-white bg-red-600 rounded-full font-black animate-pulse">
                    {holdOrders.length}
                  </span>
                )}
              </button>

              {/* Retail / Wholesale Toggle */}
              <div className="inline-flex rounded-lg bg-white/20 p-0.5 border border-white/20 text-xs">
                <button
                  type="button"
                  onClick={() => setPriceType("retail")}
                  className={`px-3 py-1 font-bold rounded-md transition-all ${
                    priceType === "retail"
                      ? "bg-white text-[#0b2b64] shadow-sm"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Retail
                </button>
                <button
                  type="button"
                  onClick={() => setPriceType("wholesale")}
                  className={`px-3 py-1 font-bold rounded-md transition-all ${
                    priceType === "wholesale"
                      ? "bg-white text-[#0b2b64] shadow-sm"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Wholesale
                </button>
              </div>
            </div>
          </div>

          {/* Top Controls: Customer Selector & Barcode Scanner */}
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-3">
            {/* Customer Select dropdown */}
            <div className="flex-1 min-w-[220px]">
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                Select Customer
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 text-gray-900 text-xs font-semibold rounded-lg focus:ring-2 focus:ring-[#029ed9] focus:outline-none p-2"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.customer_name} ({c.contact_number})
                    </option>
                  ))}
                </select>

                {/* Add Customer Button */}
                <button
                  type="button"
                  onClick={() => setIsCustomerModalOpen(true)}
                  title="Add New Customer"
                  className="bg-[#0b2b64] hover:bg-[#1b4690] text-white p-2 rounded-lg text-sm shadow transition-all active:scale-90"
                >
                  <i className="fas fa-user-plus"></i>
                </button>
              </div>
            </div>

            {/* Barcode / Item Code Input */}
            <form onSubmit={handleBarcodeSubmit} className="flex-1 min-w-[240px]">
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                Barcode / Item Code Scan
              </label>
              <div className="relative">
                <i className="fas fa-barcode absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Scan code or enter Item Code (e.g. 18426) & press Enter"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  className="w-full bg-white border border-gray-300 text-gray-900 text-xs rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-[#029ed9] focus:outline-none"
                />
              </div>
              {barcodeError && (
                <p className="text-[11px] text-red-500 font-medium mt-0.5">{barcodeError}</p>
              )}
            </form>
          </div>

          {/* Cart Items Table */}
          <div className="flex-grow overflow-x-auto min-h-[300px] max-h-[480px]">
            <table className="w-full text-xs text-left text-gray-700">
              <thead className="text-[11px] text-slate-800 uppercase bg-slate-200 border-b border-slate-300 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-4 py-3">Item Name</th>
                  <th scope="col" className="px-3 py-3 text-center">Qty</th>
                  <th scope="col" className="px-3 py-3 text-right">Price ({priceType})</th>
                  <th scope="col" className="px-3 py-3 text-center">Discount (%)</th>
                  <th scope="col" className="px-3 py-3 text-center">Discount (Rs)</th>
                  <th scope="col" className="px-4 py-3 text-right">Subtotal</th>
                  <th scope="col" className="px-3 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <i className="fas fa-shopping-basket text-4xl text-slate-300 mb-2"></i>
                        <p className="font-semibold text-sm text-gray-500">Cart is empty</p>
                        <p className="text-xs text-gray-400">
                          Click any product from the right catalog or scan a barcode to add.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  cart.map((cartItem, idx) => {
                    const price =
                      cartItem.priceType === "retail"
                        ? cartItem.item.retail_price
                        : cartItem.item.wholesale_price;
                    const lineSubtotal =
                      price * cartItem.qty - (cartItem.discountAmount || 0);

                    return (
                      <tr key={idx} className="hover:bg-sky-50/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-gray-900">{cartItem.item.item_name}</div>
                          <span className="text-[10px] text-gray-500 font-mono">
                            Code: {cartItem.item.item_code}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleUpdateQty(idx, -1)}
                              className="w-6 h-6 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-bold flex items-center justify-center text-xs"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-bold text-sm">
                              {cartItem.qty}
                            </span>
                            <button
                              onClick={() => handleUpdateQty(idx, 1)}
                              className="w-6 h-6 bg-[#029ed9] hover:bg-[#0089bd] text-white rounded font-bold flex items-center justify-center text-xs"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-right font-medium text-gray-800">
                          Rs. {price.toFixed(2)}
                        </td>
                        <td className="px-3 py-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={cartItem.discountPercent || ""}
                            onChange={(e) =>
                              handleDiscountPercentChange(idx, e.target.value)
                            }
                            placeholder="0"
                            className="w-14 text-center p-1 border rounded text-xs focus:ring-1 focus:ring-[#029ed9]"
                          />
                        </td>
                        <td className="px-3 py-3 text-center">
                          <input
                            type="number"
                            min="0"
                            value={cartItem.discountAmount || ""}
                            onChange={(e) =>
                              handleDiscountAmountChange(idx, e.target.value)
                            }
                            placeholder="0"
                            className="w-16 text-right p-1 border rounded text-xs focus:ring-1 focus:ring-[#029ed9]"
                          />
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-[#0b2b64] text-sm">
                          Rs. {lineSubtotal.toFixed(2)}
                        </td>
                        <td className="px-3 py-3 text-center">
                          <button
                            onClick={() => handleRemoveFromCart(idx)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-all"
                            title="Remove"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Control Panel & Totals */}
          <div className="bg-slate-100 border-t-2 border-slate-300 p-4">
            {/* Summary Metrics Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 mb-3 text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-2 text-gray-700">
                <i className="fas fa-boxes text-[#029ed9]"></i>
                <span>Total Quantity:</span>
                <span className="font-extrabold text-[#0b2b64] text-base">
                  {totalQuantity}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <i className="fas fa-tag text-[#029ed9]"></i>
                <span>Total Amount:</span>
                <span className="font-extrabold text-[#0b2b64] text-base">
                  Rs. {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#0b2b64]">
                <i className="fas fa-coins text-amber-500"></i>
                <span>Grand Total:</span>
                <span className="font-black text-xl text-emerald-700">
                  Rs. {grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Customer Due Amount Alert */}
            {currentCustomer.due_amount > 0 && (
              <div className="bg-amber-100/70 border border-amber-300 text-amber-900 rounded-lg p-2.5 mb-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <i className="fas fa-exclamation-triangle text-amber-600"></i>
                  Customer Previous Outstanding Balance:
                </span>
                <span className="font-bold">
                  Rs. {currentCustomer.due_amount.toFixed(2)}
                </span>
              </div>
            )}

            {/* Inputs & Action Buttons Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Overall Discount Input */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <label className="text-xs font-bold text-gray-700 whitespace-nowrap">
                  Special Bill Discount (Rs.):
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={overallDiscount}
                  onChange={(e) => setOverallDiscount(e.target.value)}
                  className="w-32 bg-white border border-gray-300 text-gray-900 text-xs font-bold rounded-lg p-2 text-right focus:ring-2 focus:ring-[#029ed9] focus:outline-none"
                />
              </div>

              {/* Action Buttons: Pay All, Hold All, Cancel */}
              <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={handleCancelCart}
                  disabled={cart.length === 0}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
                >
                  <i className="fas fa-times-circle"></i>
                  <span>Cancel</span>
                </button>

                {/* Hold All Button */}
                <button
                  type="button"
                  onClick={handleHoldAll}
                  disabled={cart.length === 0}
                  className="px-4 py-2.5 bg-[#0b2b64] hover:bg-[#1b4690] disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
                >
                  <i className="fas fa-pause-circle text-amber-400"></i>
                  <span>Hold All</span>
                </button>

                {/* Pay All Button (Primary checkout) */}
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(true)}
                  disabled={cart.length === 0}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-700/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <i className="fas fa-money-bill-wave text-amber-300"></i>
                  <span>Pay All (Rs. {grandTotal.toFixed(2)})</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Catalog & Quick Add Grid (1/3 width) */}
        <div className="flex flex-col w-full xl:w-1/3 bg-white rounded-xl border-2 border-slate-300 shadow-xl overflow-hidden">
          {/* Search Box */}
          <div className="p-3 bg-slate-100 border-b border-slate-200">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search products by code or name..."
                value={searchItemTerm}
                onChange={(e) => setSearchItemTerm(e.target.value)}
                className="w-full bg-white border border-gray-300 text-gray-900 text-xs rounded-lg pl-9 pr-4 py-2 focus:ring-2 focus:ring-[#029ed9] focus:outline-none"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[#0b2b64] text-white shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid Cards */}
          <div className="p-3 overflow-y-auto max-h-[calc(100vh-280px)] min-h-[400px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-3">
              {filteredProducts.map((item) => {
                const isLowStock = item.quantity <= item.minimum_qty;
                const isOutOfStock = item.quantity <= 0;
                const activePrice =
                  priceType === "retail" ? item.retail_price : item.wholesale_price;

                return (
                  <button
                    key={item.id}
                    disabled={isOutOfStock}
                    onClick={() => handleAddToCart(item)}
                    className={`flex flex-col rounded-xl overflow-hidden border transition-all text-left group ${
                      isOutOfStock
                        ? "opacity-60 cursor-not-allowed bg-gray-100 border-gray-300"
                        : "bg-white hover:border-[#029ed9] hover:shadow-lg hover:-translate-y-0.5 active:scale-95 border-slate-200"
                    }`}
                  >
                    {/* Top item code badge bar */}
                    <div
                      className={`px-2 py-1 text-[11px] font-bold text-white flex justify-between items-center ${
                        isOutOfStock
                          ? "bg-gray-500"
                          : isLowStock
                          ? "bg-rose-600"
                          : "bg-[#0b2b64]"
                      }`}
                    >
                      <span className="truncate">{item.item_code}</span>
                      {isLowStock && !isOutOfStock && (
                        <span className="text-[9px] bg-rose-700 px-1 rounded uppercase">Low</span>
                      )}
                    </div>

                    {/* Image Thumbnail */}
                    <div className="h-24 bg-slate-50 flex items-center justify-center p-2 relative group-hover:bg-sky-50/30 transition-colors">
                      <Image
                        src="/images/items/itemList.png"
                        alt={item.item_name}
                        width={60}
                        height={60}
                        className="object-contain max-h-16 group-hover:scale-105 transition-transform"
                        unoptimized
                      />
                    </div>

                    {/* Product Details */}
                    <div className="p-2 border-t border-slate-100 flex flex-col justify-between flex-grow">
                      <div>
                        <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight">
                          {item.item_name}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                          {item.category}
                        </p>
                      </div>

                      <div className="mt-2 pt-1 border-t border-slate-100 flex items-end justify-between">
                        <span className="text-xs font-black text-[#029ed9]">
                          Rs. {activePrice.toFixed(2)}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isOutOfStock
                              ? "bg-red-100 text-red-700"
                              : isLowStock
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          Stock: {item.quantity}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <i className="fas fa-search text-3xl mb-2"></i>
                <p className="text-xs font-medium">No products match your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AddCustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onAdd={handleCustomerAdded}
      />

      <HoldListModal
        isOpen={isHoldModalOpen}
        onClose={() => setIsHoldModalOpen(false)}
        holdOrders={holdOrders}
        onRestore={handleRestoreHoldOrder}
        onDiscard={handleDiscardHoldOrder}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        grandTotal={grandTotal}
        totalQuantity={totalQuantity}
        customer={currentCustomer}
        onConfirmPayment={handleConfirmPayment}
      />

      {completedSale && (
        <ReceiptModal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          invoiceNumber={completedSale.invoiceNumber}
          customer={completedSale.customer}
          items={completedSale.items}
          subtotal={completedSale.subtotal}
          discount={completedSale.discount}
          grandTotal={completedSale.grandTotal}
          paymentDetails={completedSale.paymentDetails}
          onNewSale={handleStartNewSale}
        />
      )}
    </div>
  );
}
