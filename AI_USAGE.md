# AI Usage Record

This file records actual AI assistance for the assessment. Update it as implementation proceeds; do not claim AI-generated code was verified until the stated checks have been performed.

## Tools and use so far

- **OpenAI Codex:** Generated the initial Next.js scaffold and authored the first responsive storefront landing page, global styling, and app metadata.
- **OpenAI Codex:** Added Tailwind CSS v4, moved the storefront's styling to utility classes, and split the page into navigation, hero, collections, and footer components. The navbar's mobile menu is controlled by accessible button state.
- **OpenAI Codex:** Reworked the landing page to present an independent bookstore, with book-centered copy and book cover illustrations in place of the earlier homewares theme.
- **OpenAI Codex:** Added a typed ten-book sample catalog in `src/data.ts` and connected the collection section to display each book's name, author, category, NGN price, cover placeholder, stock, and description.
- **OpenAI Codex:** Added a persistent browser cart with stock-limited add and quantity controls, removal, a live subtotal, and a Server Action that revalidates products, stock, quantities, and prices against the catalog. Cart state uses Zustand's persist middleware; the navbar hydrates it after the first render to keep the cart count consistent between server and browser.
- **OpenAI Codex:** Implemented checkout validation and server-side order creation, a process-local order/inventory store with stock reservation and release, a local mock payment provider whose response is checked server-side, receipt/retry pages, and filtered order fulfillment management. The order actions recalculate book prices from the server catalog and restrict status changes.
- **OpenAI Codex:** First added configurable credentials and a signed cookie session for admin access. At the user's direction, simplified this to a fixed `Admin` / `12345` login held in React state, with credential checks on order listing, receipt lookup, and fulfillment Server Actions. Moved customer order lookup to `/orders`, moved the admin dashboard to `/admin/orders`, and added `/admin/orders/[orderId]` for admin receipts.
- **Verification so far:** Compared the requirements against the supplied brief, including authoritative totals/payment handling, order statuses, required unit-test scenarios, and submission files. Earlier foundation verification included lint, a local HTTP 200, and a production build. After the route relocation and admin navigation setting, `npm.cmd run lint` and `npm.cmd run build` pass. The admin layout opts out of instant-navigation validation because its client-side login intentionally withholds child routes until sign-in, following the installed Next.js route config guide. Earlier Next.js 16 compatibility issues were also corrected using the installed Cache Components and instant-navigation guides. No unit tests have been added or run; payment and fulfillment UI have not had a manual end-to-end walkthrough yet.

## AI Output Evaluation and Corrections

One unsuitable suggestion was to use `export const dynamic = "force-dynamic"` to keep the in-memory orders list request-specific. This Next.js 16 app has `cacheComponents: true`, where that route segment setting is incompatible. The production build reported the incompatibility. It was replaced with `await connection()` and a route loading fallback, following the installed Next.js docs; the production build then passed.

For future issues, document:

1. The suggested code or behavior and why it was wrong.
2. How you noticed the issue (review, test, or manual check).
3. The correction you made and how you verified it.

Do not invent an example. If no such suggestion occurs, explain the review checks used to assess AI output instead.

## Ongoing verification practice

- Review generated code and understand it before keeping it.
- Verify prices, stock, payment outcomes, and status transitions on the server rather than trusting browser input.
- Run the relevant unit tests and manually walk through payment success and failure before submission; record actual commands and outcomes here as they happen.
- Never put payment secrets or personal customer data in prompts or committed files.
