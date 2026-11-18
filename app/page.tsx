"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MAIN_PANEL_CARDS } from "@/lib/data";

export default function MainPanelPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCards = MAIN_PANEL_CARDS.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <Header currentTitle="Main Panel" showQuickNav={true} />

      {/* Main Content with original dash-bg.png background */}
      <main
        className="flex-grow flex flex-col items-center justify-start py-8 px-4 sm:px-8 relative min-h-[calc(100vh-140px)]"
        style={{
          backgroundImage: "url('/images/main-panel/dash-bg.png'), radial-gradient(circle at 50% 20%, #173b7d 0%, #061838 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Decorative blur elements */}
        <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
          {/* Welcome Banner & Quick Search */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 shadow-2xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-cyan-300 text-xs font-semibold tracking-wider uppercase">System Active • High Performance POS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide mt-1">
                Udani POS <span className="text-cyan-400 font-light">Management Panel</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
                Select a module below to manage sales, inventory, customers, and reporting.
              </p>
            </div>

            {/* Quick module search & POS shortcut */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                  type="text"
                  placeholder="Quick search module..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 text-white placeholder-slate-300 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/30 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>

              <Link
                href="/pos"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <i className="fas fa-bolt text-amber-300"></i>
                <span>Open POS</span>
              </Link>
            </div>
          </div>

          {/* Glowing 3D Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-7 justify-items-center w-full py-4">
            {filteredCards.map((card) => {
              const isPOS = card.id === "pos";
              return (
                <Link
                  key={card.id}
                  href={card.href}
                  className={`w-[230px] sm:w-[240px] xl:w-[250px] h-[190px] sm:h-[200px] text-white uppercase text-center cardBox ${
                    isPOS ? "ring-4 ring-cyan-400/60 shadow-cyan-500/30" : ""
                  }`}
                >
                  <div className={`card ${isPOS ? "!bg-[#0e3b8a]" : "!bg-[#0b2b64]"}`}>
                    {/* Badge for POS */}
                    {isPOS && (
                      <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md animate-bounce">
                        PRIMARY
                      </span>
                    )}

                    {/* Icon container */}
                    <div className="w-[90px] h-[90px] max-lg:w-[70px] max-lg:h-[70px] relative flex items-center justify-center mb-1">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        width={90}
                        height={90}
                        className="object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110"
                        unoptimized
                      />
                    </div>

                    {/* Title */}
                    <p className="panel-text tracking-wide text-sm font-bold text-white uppercase">
                      {card.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredCards.length === 0 && (
            <div className="text-center py-16 text-slate-300">
              <i className="fas fa-search text-4xl mb-3 text-cyan-400"></i>
              <p className="text-lg font-semibold">No modules match &quot;{searchTerm}&quot;</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-3 px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm text-white"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}
