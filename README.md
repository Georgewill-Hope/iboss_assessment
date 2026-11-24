# IBOSS E-Commerce Assessment

An assessment MVP for product browsing, a shopping cart, checkout with a simulated test payment, and order fulfillment management.

## Project status

**Planning and documentation are in place; application scaffolding and features have not been implemented yet.** The planned stack is Next.js (React, TypeScript) with Node.js App Router route handlers, in-memory storage, and a simulated payment flow. See [project_plan.md](project_plan.md) for the staged roadmap and design choices, and [AI_USAGE.md](AI_USAGE.md) for the AI usage record.

## Planned setup and commands

These instructions will be replaced with the exact commands and versions once the app is scaffolded.

Prerequisites: Node.js LTS and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js (usually `http://localhost:3000`). Planned test command: `npm test`.

## Planned usage

1. Browse available products and add in-stock items to the cart.
2. Adjust quantities or remove items, then provide customer and shipping details.
3. Complete the simulated payment flow and review the receipt or retry message.
4. Open order management to filter orders and advance eligible paid orders through fulfillment.

## Security and test notes

The browser's cart and displayed total are not authoritative. The server will validate product IDs and quantities, calculate totals from its catalog, verify the simulated payment outcome, and enforce fulfillment transitions. The planned required unit tests cover total calculation, successful payment verification, and malformed input or invalid transitions.

## Submission

The assignment asks for a GitHub repository containing the working application, unit tests, `project_plan.md`, `AI_USAGE.md`, and this README. Target deadline: **Monday, November 30, 2026, at 2:00 PM**.
