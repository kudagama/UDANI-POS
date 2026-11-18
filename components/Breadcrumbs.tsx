import React from "react";
import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="w-full px-6 lg:px-14 py-3.5 bg-white border-b border-gray-200">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 text-sm text-gray-600">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-gray-700 hover:text-[#029ed9] font-medium"
            >
              <i className="fas fa-home text-sm mr-2 text-slate-500"></i>
              Main Panel
            </Link>
          </li>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center">
                <i className="fas fa-chevron-right text-xs text-gray-400 mx-2"></i>
                {isLast || !item.href ? (
                  <span className="font-semibold text-[#0b2b64]">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[#029ed9] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
