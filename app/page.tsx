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

      {/* Main Content with original dash-bg.png background - Perfectly Centered */}
      <main
        className="flex-grow flex flex-col items-center justify-center py-6 sm:py-10 px-4 sm:px-8 relative min-h-[calc(100vh-140px)] w-full"
        style={{
          backgroundImage: "url('/images/main-panel/dash-bg.png'), radial-gradient(circle at 50% 20%, #173b7d 0%, #061838 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Decorative blur elements */}
        <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-center my-auto">
          {/* Welcome Banner & Quick Search with enhanced vivid colors & contrast */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-5 mb-8 bg-[#071d44]/95 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border-2 border-[#00c3ff]/40 shadow-[0_12px_45px_rgba(0,0,0,0.65),0_0_20px_rgba(0,195,255,0.2)]">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/50 px-3 py-1 rounded-full mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="text-emerald-300 text-xs font-bold tracking-wider uppercase">
                  System Active • High Performance POS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide leading-tight drop-shadow-md">
                Udani POS <span className="text-[#00e5ff] drop-shadow-[0_2px_12px_rgba(0,229,255,0.6)]">Management Panel</span>
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm font-medium mt-1 drop-shadow-sm max-w-xl">
                Select a module below to manage sales, inventory, customers, and reporting.
              </p>
            </div>

            {/* Quick module search & POS shortcut */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-64">
                <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
                <input
                  type="text"
                  placeholder="Quick search module..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white text-slate-900 placeholder-slate-500 font-semibold rounded-xl pl-9 pr-4 py-2.5 text-sm border-2 border-[#00c3ff]/50 shadow-inner focus:outline-none focus:ring-4 focus:ring-[#00c3ff]/40 focus:border-[#00c3ff] transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 font-bold"
                  >
                    ×
                  </button>
                )}
              </div>

              <Link
                href="/pos"
                className="w-full sm:w-auto bg-gradient-to-r from-[#00d2ff] to-[#008be3] hover:from-[#36dcff] hover:to-[#007cc9] text-[#051739] px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(0,210,255,0.65)] hover:shadow-[0_0_35px_rgba(0,210,255,0.9)] flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95 whitespace-nowrap border border-cyan-200"
              >
                <i className="fas fa-bolt text-amber-500 text-base"></i>
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
