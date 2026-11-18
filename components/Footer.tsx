import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b2b64] py-4 text-center text-white/90 text-xs border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-slate-300">
          {currentYear} © All Rights Reserved | <span className="font-semibold text-white">Udani POS</span> | Modern Retail & Enterprise POS
        </p>
        <p className="text-cyan-300 font-mono text-[11px] bg-white/10 px-3 py-1 rounded-full border border-white/10">
          Version - 25.07.15 (Next.js Edition)
        </p>
      </div>
    </footer>
  );
}
