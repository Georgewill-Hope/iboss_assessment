# Project Plan: Online Bookstore

## Goal and assignment fit

Build a small customer-facing bookstore with a book catalog, validated cart, checkout, simulated test payment, receipt, and order management. The assignment specifies React.js and permits Node.js for the backend; this project uses **Next.js with React and TypeScript** for the UI and **Next.js App Router route handlers running on Node.js** for the API. This keeps the MVP in one deployable application while retaining a server boundary for order totals and payment verification.

## Architecture

- **UI:** Next.js App Router pages and reusable React components for catalog, cart/checkout, receipt, and order management.
- **API:** Route handlers for product/order operations, simulated payment, order lookup, and fulfillment updates. Validate all incoming data on the server.
- **Domain logic:** Separate typed modules for catalog access, cart/order validation and totals, payment result handling, and permitted order status transitions.
- **Data:** In-memory server store for the assessment MVP. It needs no database setup, but data resets when the process restarts and is not suitable for multiple server instances.
- **Payment:** Clearly labeled simulated test payment endpoint (success/failure outcomes); no real charges or secrets. The server determines the amount from its own catalog and only marks an order Paid after the simulated provider result is verified server-side.
- **Tests:** Unit tests for server-side totals, successful payment transition, and malformed input or invalid fulfillment transition. Add focused tests for failure/stock cases if time permits.

### Order status rules

Use `Pending`, `Paid`, `Shipped`, `Delivered`, and `Failed`. New orders begin Pending. Verified successful payment may move Pending to Paid; failed payment moves Pending to Failed. Fulfillment can move Paid to Shipped and Shipped to Delivered. Reject attempts to ship unpaid or failed orders and reject invalid status values.

## Milestones (4–6 hour target)

Work in this order and keep each milestone reviewable before moving on.

1. **Foundation (30 min):** Create the Next.js TypeScript app, choose package manager, establish folders, and confirm the app starts. **Done:** npm, responsive landing page, successful lint, and local HTTP 200 verified.
2. **Domain and validation (45 min):** Define product/order types, a small seed catalog, total calculation, quantity/product validation, and status transition rules.
3. **Storefront and cart (60 min):** Build the responsive catalog and cart interactions with quantity editing, removal, stock feedback, and live totals.
4. **Checkout and payment (60 min):** Collect customer details; create orders through the server; recalculate all prices server-side; implement simulated success/failure payment results.
5. **Receipt and order management (45 min):** Show confirmation/retry outcome and order list with status filtering and guarded fulfillment updates.
6. **Tests and documentation pass (45 min):** Cover the three required core scenarios, improve setup/usage docs, and perform a manual end-to-end walkthrough.
7. **Buffer (15–75 min):** Fix discovered edge cases, accessibility/usability issues, and prepare the repository for sharing.

The time boxes are estimates, not a reason to skip server-side integrity or the required tests. If time gets tight, keep the UI simple and defer visual polish, persistence, and optional features.

## Assumptions and trade-offs

- Next.js is the requested framework choice and satisfies the React frontend requirement; its Node.js route handlers satisfy the permitted backend choice.
- A simulated payment endpoint is explicitly allowed and avoids payment credentials and external account setup. It must still model success and failure and verify the result on the server before changing order state.
- In-memory storage is the fastest permitted storage option and has no setup cost. Orders and stock are temporary and can reset on restart.
- Seeded products use local placeholders or lightweight local assets; no external product API is needed.
- This is a single-store assessment MVP, not a production commerce system. Authentication, real payment processing, durable persistence, concurrency controls, and deployment are out of scope unless the implementation reveals they are needed.
- Displayed client totals are for convenience only. The server is authoritative for product existence, stock, prices, order totals, payment result, and allowed status changes.

## Completion checklist

- [x] Catalog shows name, price, image/placeholder, and stock status.
- [ ] Cart supports add, quantity changes, removal, and live totals; rejects invalid quantities and unavailable products.
- [ ] Checkout validates name, email, and shipping address.
- [ ] Server recalculates totals from its catalog and does not accept client prices or payment statuses as authoritative.
- [ ] Payment success and failure produce clear receipt/retry experiences.
- [ ] Order management lists items, totals, timestamps, statuses; supports status filtering and only valid fulfillment transitions.
- [ ] Unit tests cover authoritative total calculation, verified successful payment, and invalid input/transition handling.
- [ ] README setup, run, test, and usage instructions match the actual implementation.
- [ ] AI_USAGE.md records actual assistance, verification, and a concrete suboptimal-output example observed during implementation.

## Progress log

- **Planning:** Reviewed the attached assignment brief and selected Next.js/React/TypeScript with Node.js route handlers, in-memory storage, and simulated payment for the MVP.
- **Foundation started:** Generated the Next.js App Router, TypeScript, and ESLint scaffold in the repository root; added a responsive storefront landing page and updated app metadata. The first scaffold attempt conflicted with existing documentation files, so generation was done in a temporary directory and the application files were merged while preserving the project docs.
- **Frontend structure:** Added Tailwind CSS v4 and split the storefront into `Navbar`, `Hero`, `CollectionSection`, and `SiteFooter` components. The navbar includes an accessible mobile menu button and collapsible navigation.
- **Bookshop visual direction:** Replaced the homewares copy and decorative shapes with an independent bookshop identity, illustrated book covers, and Fiction, Nonfiction, and Young Readers collections.
- **Catalog MVP:** Added ten typed sample book records in `src/data.ts` and a responsive product grid with book names, authors, categories, NGN prices, CSS cover placeholders, stock status, and descriptions.
- **Next step:** Define typed product/order models, seed catalog data, server-side total and quantity validation, and allowed status transitions.
