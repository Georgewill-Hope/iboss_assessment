# AI Usage Record

This file records actual AI assistance for the assessment. Update it as implementation proceeds; do not claim AI-generated code was verified until the stated checks have been performed.

## Tools and use so far

- **OpenAI Codex:** Generated the initial Next.js scaffold and authored the first responsive storefront landing page, global styling, and app metadata.
- **OpenAI Codex:** Added Tailwind CSS v4, moved the storefront's styling to utility classes, and split the page into navigation, hero, collections, and footer components. The navbar's mobile menu is controlled by accessible button state.
- **OpenAI Codex:** Reworked the landing page to present an independent bookstore, with book-centered copy and book cover illustrations in place of the earlier homewares theme.
- **OpenAI Codex:** Added a typed ten-book sample catalog in `src/data.ts` and connected the collection section to display each book's name, author, category, NGN price, cover placeholder, stock, and description.
- **OpenAI Codex:** Added a persistent browser cart with stock-limited add and quantity controls, removal, a live subtotal, and a Server Action that revalidates products, stock, quantities, and prices against the catalog. Cart state uses Zustand's persist middleware; the navbar hydrates it after the first render to keep the cart count consistent between server and browser.
- **Verification so far:** Compared the documentation against the supplied DOCX requirements, including server-authoritative totals/payment verification, order statuses, the three required unit-test scenarios, and submission files. Installed dependencies, ran `npm.cmd run lint` successfully, started the initial app and confirmed `http://localhost:3000` returned HTTP 200, then ran lint and the production build successfully after the ten-book catalog was added. No unit tests have been added or run yet.

## AI Output Evaluation and Corrections

No specific unsuitable AI suggestion has been observed so far. During implementation, record one specific AI suggestion that was buggy, insecure, or otherwise unsuitable, then document:

1. The suggested code or behavior and why it was wrong.
2. How you noticed the issue (review, test, or manual check).
3. The correction you made and how you verified it.

Do not invent an example. If no such suggestion occurs, explain the review checks used to assess AI output instead.

## Ongoing verification practice

- Review generated code and understand it before keeping it.
- Verify prices, stock, payment outcomes, and status transitions on the server rather than trusting browser input.
- Run the relevant unit tests and manually walk through payment success and failure before submission; record actual commands and outcomes here as they happen.
- Never put payment secrets or personal customer data in prompts or committed files.
