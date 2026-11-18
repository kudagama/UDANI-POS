# Udani POS - Point of Sale & Inventory Management System

Modern Next.js POS application built with the exact branding, 3D card styling, color palette, and architectural layout from `LT_Designers_system`.

## 🎨 Design Features Applied from LT Designers System

1. **Branding & Color Theme**:
   - Primary Royal Navy Blue: `#0b2b64`
   - Secondary Cyan / Light Blue: `#029ed9`
   - Dark Gradients & Card Glow Animations: `linear-gradient(to right, #0b2b64, #1b4690, #ffffff)`
   - Poppins & Helvetica Typography
   - Official SVG and PNG icons from the original system

2. **Main Panel (`/`)**:
   - The iconic **15 Glowing 3D Cards Grid** with 360-degree rotating gradient hover animation:
     - 📊 Dashboard (`/dash`)
     - 🛒 Orders (`/sales`)
     - 🏷️ Items (`/items`)
     - 📦 Stock (`/stock`)
     - 💰 Sales (`/sales`)
     - 💳 Due Amount (`/customers`)
     - 🧮 Budget Calculation (`/budget`)
     - 💻 **POS (Point of Sale)** (`/pos`)
     - 👥 Users (`/users`)
     - 🤝 Customer (`/customers`)
     - 🚚 Suppliers (`/suppliers`)
     - 📉 Expenses (`/expenses`)
     - 📈 Reports (`/reports`)
     - ⚙️ Settings (`/settings`)
     - 📑 Stock Report (`/stock`)
   - Header with dynamic time greetings (*Good Morning / Afternoon / Evening!*), User greeting, Fullscreen toggle, Main Panel button, and Logout.

3. **POS Billing System (`/pos` & `/billing`)**:
   - **Left Pane (2/3 width)**:
     - Top Navy bar with "Billing system", "View Hold List" badge button, and "Retail / Wholesale" pricing toggle.
     - Customer selector dropdown with instant search and "+ Add Customer" modal.
     - Barcode / Item code scanner input with auto-add.
     - Interactive Cart Table: Editable quantities (+ / -), Price, Discount %, Discount Rs, Line Subtotal, and Delete.
     - Bottom Control Panel: Total Quantity, Total Amount, Grand Total, Customer previous Due balance alert, Special Bill Discount input.
     - Action Buttons:
       - **Pay All** (Opens checkout modal with Cash, Card, Bank, Credit, Change calculation)
       - **Hold All** (Saves active order to Hold List)
       - **Cancel** (Clears current cart)
   - **Right Pane (1/3 width)**:
     - Live item search filter
     - Category filter pills
     - Product cards with Item Code badge (red if low stock), product photo, name, price, stock counter, and click-to-add.
   - **Thermal Receipt Preview & Print Dialog**:
     - 80mm thermal bill layout with Udani POS header, itemized breakdown, discounts, tender/change, barcode, and print action.

4. **Additional Management Modules**:
   - **Dashboard (`/dash`)**: 6 top metric tiles, quick status tiles, weekly sales vs expenses comparison chart, fast moving stock, and recent sales invoices.
   - **Items Master (`/items`)**: Product inventory table with low-stock alerts and "Add Item" modal.
   - **Customers Directory (`/customers`)**: Customer accounts with credit limits, due balance tracking, and due settlement payment dialog.
   - **Stock Inventory (`/stock`)**: Stock tracking and quick replenishment dialog.
   - **Budget Calculator (`/budget`)**: SqFt and material quotation calculator for custom print jobs.
   - **Settings (`/settings`)**: Store details, address, receipt text, and theme colors.

## 🚀 Running the Project

```bash
# Development server (port 3000)
npm run dev

# Or Production build and run
npm run build
npm run start
```

Server is currently running at: **`http://localhost:3000`**
