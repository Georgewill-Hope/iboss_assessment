# IBOSS E-Commerce Assessment

An assessment MVP for browsing books, a shopping cart, checkout with a simulated test payment, and order fulfillment management.

## Project status

The storefront displays ten sample books with NGN prices, covers, stock counts, and descriptions. Visitors can add books to a browser-persisted cart, adjust quantities, and remove items. Checkout validates customer details and cart contents on the server, recalculates totals from the catalog, and reserves stock in a process-local order store. Customers can choose a clearly labeled simulated payment result, view a receipt, and use the customer lookup page to view their order status and products. Admins sign in before accessing order management and fulfillment actions. See [project_plan.md](project_plan.md) for the roadmap and [AI_USAGE.md](AI_USAGE.md) for the AI usage record.

## Setup and commands

Prerequisites: Node.js LTS and npm.

```bash
npm install
```

Admin sign-in and order management are on `/admin/orders`. Use username `Admin` and password `12345`. Login is held in React state and resets when the page is refreshed. Order loading, receipt lookup, and fulfillment updates also check the credentials on the server.

```bash
npm run dev
```

Open the local URL printed by Next.js (usually `http://localhost:3000`). Use `npm run lint` for the configured code check and `npm run build` for a production build.

## Planned usage

1. Browse available products and add in-stock items to the cart.
2. Adjust quantities or remove items, then provide customer and shipping details.
3. Complete the simulated payment flow and review the receipt or retry message.
4. Customers can open `/orders` and use their checkout email plus the full order reference from the receipt to view their items, current status, and receipt.
5. Admins sign in at `/admin/orders` to filter orders and advance eligible paid orders through fulfillment. Select an order reference to view its admin receipt at `/admin/orders/[orderId]`.

## Security and test notes

The browser's cart and displayed total are not authoritative. The server validates product IDs, quantities, customer details, current stock, and calculates totals from its catalog. The payment buttons select a scenario for a local mock provider; the server checks the mock response's order, amount, result, and reference before applying it to a pending order. Admin order loading and fulfillment actions check the fixed demo credentials on the server. Customer lookup requires both a full order reference and checkout email and returns only the matching order. Order and stock data are in memory and reset when the server process restarts, so this is for a single-process assessment demo rather than durable or multi-instance use. Required unit tests for totals, payment transitions, and invalid input still need to be added.
