import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Udani POS - Point of Sale & Inventory System",
  description: "Modern POS and Inventory Management System with LT Designers Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className="min-h-screen bg-[#f4f7fb] text-slate-800 antialiased flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
