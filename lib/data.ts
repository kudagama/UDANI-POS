export interface Item {
  id: number;
  item_code: string;
  item_name: string;
  category: string;
  retail_price: number;
  wholesale_price: number;
  purchase_price: number;
  quantity: number;
  minimum_qty: number;
  image_path: string;
  description: string;
}

export interface Customer {
  id: number;
  customer_name: string;
  contact_number: string;
  email: string;
  address: string;
  due_amount: number;
  credit_limit: number;
}

export interface CartItem {
  item: Item;
  qty: number;
  priceType: 'retail' | 'wholesale';
  discountPercent: number;
  discountAmount: number;
}

export interface HoldOrder {
  id: string;
  timestamp: string;
  customer: Customer;
  items: CartItem[];
  totalAmount: number;
  note?: string;
}

export interface SaleRecord {
  id: string;
  invoice_number: string;
  date: string;
  customer_name: string;
  items_count: number;
  subtotal: number;
  discount: number;
  grand_total: number;
  payment_method: 'Cash' | 'Card' | 'Bank Transfer' | 'Credit';
  status: 'Completed' | 'Pending' | 'Returned';
}

export const INITIAL_SETTINGS = {
  company_name: "Udani POS",
  site_name: "Udani POS - Point of Sale",
  tagline: "Smart POS & Inventory Solution",
  address: "No: 435, William Gopallawa Mawatha, Kandy, Sri Lanka",
  contact: "081-2233393 / 077-5353053",
  email: "support@udanipos.lk",
  header_color: "#0b2b64",
  footer_color: "#0b2b64",
  accent_color: "#029ed9",
  currency: "Rs.",
  version: "v25.07.15",
};

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 1,
    customer_name: "Walk-in Customer",
    contact_number: "0771234567",
    email: "walkin@udanipos.lk",
    address: "Kandy",
    due_amount: 0,
    credit_limit: 10000,
  },
  {
    id: 2,
    customer_name: "Kavindu Perera (Printers LK)",
    contact_number: "0718899221",
    email: "kavindu@printers.lk",
    address: "Peradeniya Road, Kandy",
    due_amount: 14500,
    credit_limit: 50000,
  },
  {
    id: 3,
    customer_name: "Sunil Shantha (Apex Media)",
    contact_number: "0763321455",
    email: "sunil@apexmedia.com",
    address: "Katugastota, Kandy",
    due_amount: 3200,
    credit_limit: 30000,
  },
  {
    id: 4,
    customer_name: "Nimali Rathnayake",
    contact_number: "0725544332",
    email: "nimali.r@gmail.com",
    address: "Dalada Veediya, Kandy",
    due_amount: 0,
    credit_limit: 20000,
  },
  {
    id: 5,
    customer_name: "Dhammika Gunasekara (Graphix Plus)",
    contact_number: "0789944112",
    email: "dhammika@graphixplus.lk",
    address: "Digana, Kandy",
    due_amount: 8750,
    credit_limit: 40000,
  },
];

export const INITIAL_ITEMS: Item[] = [
  {
    id: 1,
    item_code: "18426",
    item_name: "Eco-Solvent Ink 1L Cyan",
    category: "Eco-Solvent Inks",
    retail_price: 130.00,
    wholesale_price: 105.00,
    purchase_price: 85.00,
    quantity: 45,
    minimum_qty: 10,
    image_path: "/images/items/itemList.png",
    description: "High-grade low odor eco-solvent cyan ink for billboard and vinyl printing."
  },
  {
    id: 2,
    item_code: "72010",
    item_name: "Eco-Solvent Ink 1L Magenta",
    category: "Eco-Solvent Inks",
    retail_price: 130.00,
    wholesale_price: 105.00,
    purchase_price: 85.00,
    quantity: 38,
    minimum_qty: 10,
    image_path: "/images/items/itemList.png",
    description: "Premium vivid magenta eco-solvent formulation."
  },
  {
    id: 3,
    item_code: "95970",
    item_name: "Eco-Solvent Ink 1L Yellow",
    category: "Eco-Solvent Inks",
    retail_price: 130.00,
    wholesale_price: 105.00,
    purchase_price: 85.00,
    quantity: 42,
    minimum_qty: 10,
    image_path: "/images/items/itemList.png",
    description: "UV-resistant yellow ink formulation for outdoor longevity."
  },
  {
    id: 4,
    item_code: "09841",
    item_name: "Eco-Solvent Ink 1L Black",
    category: "Eco-Solvent Inks",
    retail_price: 130.00,
    wholesale_price: 105.00,
    purchase_price: 85.00,
    quantity: 50,
    minimum_qty: 12,
    image_path: "/images/items/itemList.png",
    description: "Deep jet-black pigment for sharp high-contrast text and shadows."
  },
  {
    id: 5,
    item_code: "37168",
    item_name: "Glossy Self Adhesive Vinyl 1.27m x 50m",
    category: "Vinyl & Banners",
    retail_price: 18500.00,
    wholesale_price: 16800.00,
    purchase_price: 14200.00,
    quantity: 18,
    minimum_qty: 5,
    image_path: "/images/items/itemList.png",
    description: "High-gloss polymeric adhesive vinyl roll for car branding and sign boards."
  },
  {
    id: 6,
    item_code: "77503",
    item_name: "Frontlit Banner 380gsm 3.2m x 50m",
    category: "Vinyl & Banners",
    retail_price: 24500.00,
    wholesale_price: 22000.00,
    purchase_price: 19500.00,
    quantity: 8,
    minimum_qty: 4,
    image_path: "/images/items/itemList.png",
    description: "Durable reinforced frontlit flex banner roll."
  },
  {
    id: 7,
    item_code: "41772",
    item_name: "Matte Cold Lamination Film 1.07m",
    category: "Finishing & Laminates",
    retail_price: 11200.00,
    wholesale_price: 9900.00,
    purchase_price: 8300.00,
    quantity: 14,
    minimum_qty: 5,
    image_path: "/images/items/itemList.png",
    description: "Anti-glare matte protective over-laminate."
  },
  {
    id: 8,
    item_code: "40918",
    item_name: "Sublimation Ink 100ml Set (CMYK)",
    category: "Sublimation",
    retail_price: 4500.00,
    wholesale_price: 3900.00,
    purchase_price: 3100.00,
    quantity: 26,
    minimum_qty: 8,
    image_path: "/images/items/itemList.png",
    description: "Heat-transfer dye sublimation ink pack for mugs and apparel."
  },
  {
    id: 9,
    item_code: "06496",
    item_name: "One Way Vision Film 1.52m x 50m",
    category: "Vinyl & Banners",
    retail_price: 32000.00,
    wholesale_price: 29000.00,
    purchase_price: 25000.00,
    quantity: 3,
    minimum_qty: 5,
    image_path: "/images/items/itemList.png",
    description: "Perforated window vinyl for one-way privacy graphics."
  },
  {
    id: 10,
    item_code: "97849",
    item_name: "Foam Board 5mm (4ft x 8ft)",
    category: "Rigid Sheets",
    retail_price: 3800.00,
    wholesale_price: 3200.00,
    purchase_price: 2600.00,
    quantity: 35,
    minimum_qty: 10,
    image_path: "/images/items/itemList.png",
    description: "Lightweight rigid foam PVC sheet for indoor displays."
  },
  {
    id: 11,
    item_code: "63957",
    item_name: "Roll-Up Pull Banner Stand 2.5ft x 6ft",
    category: "Display Stands",
    retail_price: 5200.00,
    wholesale_price: 4600.00,
    purchase_price: 3800.00,
    quantity: 22,
    minimum_qty: 6,
    image_path: "/images/items/itemList.png",
    description: "Aluminum luxury pull-up stand with carrying bag."
  },
  {
    id: 12,
    item_code: "20599",
    item_name: "Eyelet Punching Rings (Pack of 1000)",
    category: "Accessories",
    retail_price: 2800.00,
    wholesale_price: 2400.00,
    purchase_price: 1800.00,
    quantity: 15,
    minimum_qty: 5,
    image_path: "/images/items/itemList.png",
    description: "Heavy duty zinc coated eyelets for banner corners."
  }
];

export const INITIAL_SALES: SaleRecord[] = [
  {
    id: "SALE-001",
    invoice_number: "INV-202611-0081",
    date: "2026-11-18 11:24 AM",
    customer_name: "Kavindu Perera (Printers LK)",
    items_count: 3,
    subtotal: 39500.00,
    discount: 1500.00,
    grand_total: 38000.00,
    payment_method: "Cash",
    status: "Completed",
  },
  {
    id: "SALE-002",
    invoice_number: "INV-202611-0080",
    date: "2026-11-18 10:15 AM",
    customer_name: "Walk-in Customer",
    items_count: 2,
    subtotal: 520.00,
    discount: 0.00,
    grand_total: 520.00,
    payment_method: "Cash",
    status: "Completed",
  },
  {
    id: "SALE-003",
    invoice_number: "INV-202611-0079",
    date: "2026-11-17 04:45 PM",
    customer_name: "Sunil Shantha (Apex Media)",
    items_count: 5,
    subtotal: 68400.00,
    discount: 3400.00,
    grand_total: 65000.00,
    payment_method: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "SALE-004",
    invoice_number: "INV-202611-0078",
    date: "2026-11-17 01:10 PM",
    customer_name: "Dhammika Gunasekara (Graphix Plus)",
    items_count: 1,
    subtotal: 18500.00,
    discount: 500.00,
    grand_total: 18000.00,
    payment_method: "Credit",
    status: "Pending",
  },
  {
    id: "SALE-005",
    invoice_number: "INV-202611-0077",
    date: "2026-11-16 02:30 PM",
    customer_name: "Nimali Rathnayake",
    items_count: 4,
    subtotal: 9800.00,
    discount: 300.00,
    grand_total: 9500.00,
    payment_method: "Card",
    status: "Completed",
  },
];

export const MAIN_PANEL_CARDS = [
  {
    id: "dash",
    title: "Dashboard",
    icon: "/images/main-panel/btn-icons/dash.svg",
    href: "/dash",
    permission: 17,
  },
  {
    id: "orders",
    title: "Orders",
    icon: "/images/main-panel/btn-icons/billing.svg",
    href: "/sales",
    permission: 18,
  },
  {
    id: "items",
    title: "Items",
    icon: "/images/main-panel/btn-icons/items.svg",
    href: "/items",
    permission: 19,
  },
  {
    id: "stock",
    title: "Stock",
    icon: "/images/main-panel/btn-icons/stock.svg",
    href: "/stock",
    permission: 20,
  },
  {
    id: "sales",
    title: "Sales",
    icon: "/images/main-panel/btn-icons/sales.svg",
    href: "/sales",
    permission: 21,
  },
  {
    id: "due",
    title: "Due Amount",
    icon: "/images/main-panel/btn-icons/billing.svg",
    href: "/customers",
    permission: 78,
  },
  {
    id: "budget",
    title: "Budget Calculation",
    icon: "/images/main-panel/btn-icons/budget.svg",
    href: "/budget",
    permission: 91,
  },
  {
    id: "pos",
    title: "POS",
    icon: "/images/main-panel/btn-icons/installment.svg",
    href: "/pos",
    permission: 91,
    highlight: true,
  },
  {
    id: "users",
    title: "Users",
    icon: "/images/main-panel/btn-icons/users.svg",
    href: "/users",
    permission: 22,
  },
  {
    id: "customer",
    title: "Customer",
    icon: "/images/main-panel/btn-icons/customer.svg",
    href: "/customers",
    permission: 23,
  },
  {
    id: "suppliers",
    title: "Suppliers",
    icon: "/images/main-panel/btn-icons/suppliers.svg",
    href: "/suppliers",
    permission: 24,
  },
  {
    id: "expenses",
    title: "Expenses",
    icon: "/images/main-panel/btn-icons/expenses.svg",
    href: "/expenses",
    permission: 25,
  },
  {
    id: "reports",
    title: "Reports",
    icon: "/images/main-panel/btn-icons/reports.svg",
    href: "/reports",
    permission: 26,
  },
  {
    id: "settings",
    title: "Settings",
    icon: "/images/main-panel/btn-icons/settings.svg",
    href: "/settings",
    permission: 27,
  },
  {
    id: "stock-report",
    title: "Stock Report",
    icon: "/images/reports/ItemStockReport.png",
    href: "/stock",
    permission: 83,
  },
];
