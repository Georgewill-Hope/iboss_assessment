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
- This is a single-store assessment MVP, not a production commerce system. Admin order management uses the requested fixed demo username/password, a simple React state login, and server-side credential checks on protected order actions. Customer accounts, production authentication, real payment processing, durable order persistence, concurrency controls, and deployment are out of scope.
- Displayed client totals are for convenience only. The server is authoritative for product existence, stock, prices, order totals, payment result, and allowed status changes.

## Completion checklist

- [x] Catalog shows name, price, image/placeholder, and stock status.
- [x] Cart supports add, quantity changes, removal, and live totals; rejects invalid quantities and unavailable products.
- [x] Checkout validates name, email, and shipping address.
- [x] Server recalculates totals from its catalog and verifies the mock provider response before applying a result to a pending order.
- [x] Payment success and failure produce clear receipt/retry experiences.
- [x] Order management lists items, totals, timestamps, statuses; supports status filtering and only valid fulfillment transitions.
- [x] Admin order management and fulfillment actions require the fixed admin credentials checked server-side.
- [x] Customers can look up their matching order using checkout email plus the full order reference and view products, status, and receipt.
- [x] Customer lookup is at `/orders`; admin dashboard is at `/admin/orders`, with admin receipts at `/admin/orders/[orderId]`.
- [ ] Unit tests cover authoritative total calculation, verified successful payment, and invalid input/transition handling.
- [ ] README setup, run, test, and usage instructions match the actual implementation.
- [ ] AI_USAGE.md records actual assistance, verification, and a concrete suboptimal-output example observed during implementation.

## Progress log

- **Planning:** Reviewed the attached assignment brief and selected Next.js/React/TypeScript with Node.js route handlers, in-memory storage, and simulated payment for the MVP.
- **Foundation started:** Generated the Next.js App Router, TypeScript, and ESLint scaffold in the repository root; added a responsive storefront landing page and updated app metadata. The first scaffold attempt conflicted with existing documentation files, so generation was done in a temporary directory and the application files were merged while preserving the project docs.
- **Frontend structure:** Added Tailwind CSS v4 and split the storefront into `Navbar`, `Hero`, `CollectionSection`, and `SiteFooter` components. The navbar includes an accessible mobile menu button and collapsible navigation.
- **Bookshop visual direction:** Replaced the homewares copy and decorative shapes with an independent bookshop identity, illustrated book covers, and Fiction, Nonfiction, and Young Readers collections.
- **Catalog MVP:** Added ten typed sample book records in `src/data.ts` and a responsive product grid with book names, authors, categories, NGN prices, CSS cover placeholders, stock status, and descriptions.
- **Cart and catalog interaction:** Added stock-aware add-to-cart buttons, a persistent Zustand cart with quantity editing and removal, a cart count and subtotal, and a cart validation Server Action that checks product IDs and quantities and calculates prices from the server catalog. Persisted cart data is checked against the current catalog when it loads.
- **Checkout and order management:** Added Zod validation for customer details and cart lines, server-authoritative order totals, process-local order and inventory storage, stock reservation at order creation, and stock release after a failed simulated payment. Added receipt pages, success/failure test payment choices, status filtering, and guarded Paid → Shipped → Delivered fulfillment controls.
- **Admin and customer order access:** Simplified admin access to a React `useState` login with the requested `Admin` / `12345` credentials; order listing and fulfillment server actions independently check the credentials. Customer lookup requires checkout email and the full order reference and is available at `/orders`. The admin layout shares login state across `/admin/orders` and its dynamic receipt route at `/admin/orders/[orderId]`.
- **Verification:** `npm.cmd run lint` and `npm.cmd run build` pass after simplifying admin access and moving customer lookup to `/orders`. The admin layout sets `instant = false` because it intentionally withholds child pages until the in-memory login state is set; this follows the installed Next.js route config guidance for a gated route. Earlier fixes handled the Cache Components `force-dynamic` incompatibility and the receipt URL data warning using the installed Next.js 16 docs. Unit tests and manual end-to-end payment walkthrough remain outstanding.
- **Next step:** Add required unit tests for authoritative totals, successful payment transition, invalid input, and invalid fulfillment transitions; then manually walk through checkout success and failure.
