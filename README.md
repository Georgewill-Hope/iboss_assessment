# IBOSS E-Commerce Assessment

An assessment MVP for browsing books, a shopping cart, checkout with a simulated test payment, and order fulfillment management.

## Project status

The Next.js foundation and responsive independent bookshop storefront are in place. The storefront displays ten sample books with NGN prices, cover images, stock counts, and descriptions. Visitors can add available books to a browser-persisted cart, adjust quantities, remove items, and request a server-validated subtotal. Book data lives in `src/data.ts`; styling uses Tailwind CSS, and the UI is split into reusable components under `src/components`. Checkout, simulated payment, order storage, and order management are the next implementation steps. See [project_plan.md](project_plan.md) for the roadmap and [AI_USAGE.md](AI_USAGE.md) for the AI usage record.

## Setup and commands

Prerequisites: Node.js LTS and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js (usually `http://localhost:3000`). Use `npm run lint` for the configured code check. Unit test tooling will be added with the domain modules.

## Planned usage

1. Browse available products and add in-stock items to the cart.
2. Adjust quantities or remove items, then provide customer and shipping details.
3. Complete the simulated payment flow and review the receipt or retry message.
4. Open order management to filter orders and advance eligible paid orders through fulfillment.

## Security and test notes

The browser's cart and displayed total are not authoritative. The server will validate product IDs and quantities, calculate totals from its catalog, verify the simulated payment outcome, and enforce fulfillment transitions. The planned required unit tests cover total calculation, successful payment verification, and malformed input or invalid transitions.
