"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  currentTitle?: string;
  showQuickNav?: boolean;
}

export default function Header({ currentTitle, showQuickNav = true }: HeaderProps) {
  const router = useRouter();
  const [greeting, setGreeting] = useState("Good Day!");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning!");
    } else if (hour < 17) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Evening!");
    }
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header className="nav bg-[#0b2b64] w-full min-h-[90px] px-6 lg:px-14 py-3 flex justify-between items-center shadow-lg z-30 transition-all">
      {/* Left controls */}
      <div className="flex items-center gap-3">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          title="Go Back"
          className="rounded-full w-[44px] h-[44px] bg-white flex justify-center items-center hover:scale-95 hover:bg-slate-100 transition-all shadow-md active:scale-90"
        >
          <span className="text-2xl font-bold text-[#0b2b64] leading-none mb-0.5">&lt;</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullScreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className="rounded-full w-[44px] h-[44px] bg-white flex justify-center items-center hover:scale-95 hover:bg-slate-100 transition-all shadow-md active:scale-90 text-[#0b2b64]"
        >
          <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-lg`}></i>
        </button>

        {showQuickNav && (
          <div className="hidden md:flex items-center gap-2.5">
            {/* Go to Main Panel */}
            <Link
              href="/"
              className="px-4 py-2 text-[#0b2b64] font-medium rounded-lg bg-white flex items-center gap-2 hover:bg-sky-50 hover:scale-95 transition-all text-sm shadow-sm"
            >
              <i className="fas fa-city text-[#0b2b64]"></i>
              <span>Main Panel</span>
            </Link>

            {/* Budget Cal */}
            <Link
              href="/budget"
              className="px-4 py-2 text-[#0b2b64] font-medium rounded-lg bg-white hover:bg-sky-50 hover:scale-95 transition-all text-sm shadow-sm"
            >
              Budget Cal
            </Link>

            {/* POS */}
            <Link
              href="/pos"
              className="px-4 py-2 text-white font-semibold rounded-lg bg-[#029ed9] hover:bg-[#0089bd] hover:scale-95 transition-all text-sm shadow-sm flex items-center gap-1.5"
            >
              <i className="fas fa-cash-register"></i>
              <span>POS</span>
            </Link>
          </div>
        )}
      </div>

      {/* Center Logo & Brand Name */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md p-1.5 border border-white/20 flex items-center justify-center group-hover:scale-105 transition-all">
            <i className="fas fa-cubes text-2xl text-cyan-400"></i>
          </div>
          <div className="text-left hidden sm:block">
            <h1 className="text-white text-xl font-extrabold tracking-wider leading-tight flex items-center gap-1.5">
              UDANI <span className="text-[#00c3ff]">POS</span>
            </h1>
            <p className="text-cyan-200/80 text-[11px] font-medium tracking-widest uppercase">
              Retail & Inventory System
            </p>
          </div>
        </Link>
      </div>

      {/* Right User & Logout info */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end text-right hidden sm:flex">
          <h3 className="text-base lg:text-lg font-bold text-white leading-tight">
            {greeting}
          </h3>
          <p className="text-xs text-cyan-200">
            Welcome <span className="font-semibold text-white">Udani POS</span>
          </p>
        </div>

        {/* Logout button */}
        <button
          onClick={() => {
            alert("Signed out successfully. Logging back into demo session.");
            router.push("/");
          }}
          title="Sign Out"
          className="rounded-full w-[44px] h-[44px] bg-white flex justify-center items-center hover:scale-95 hover:bg-red-50 hover:text-red-600 transition-all shadow-md active:scale-90 text-[#0b2b64]"
        >
          <i className="fas fa-sign-out-alt text-lg"></i>
        </button>
      </div>
    </header>
  );
}
