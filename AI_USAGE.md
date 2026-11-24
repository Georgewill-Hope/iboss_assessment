# AI Usage Record

This file records actual AI assistance for the assessment. Update it as implementation proceeds; do not claim AI-generated code was verified until the stated checks have been performed.

## Tools and use so far

- **OpenAI Codex (this coding assistant):** Read and summarized the supplied assignment brief, mapped the requirements into a staged implementation plan, selected a Next.js approach consistent with the requested React frontend and an allowed Node.js backend, and drafted this documentation.
- **Verification so far:** Compared the documentation against the supplied DOCX requirements, including server-authoritative totals/payment verification, order statuses, the three required unit-test scenarios, and submission files. No application code has been generated or tested yet.

## Example of suboptimal AI output and correction

The implementation has not started, so there is not yet a real code example to report. During implementation, record one specific AI suggestion that was buggy, insecure, or otherwise unsuitable, then document:

1. The suggested code or behavior and why it was wrong.
2. How you noticed the issue (review, test, or manual check).
3. The correction you made and how you verified it.

Do not invent an example. If no such suggestion occurs, explain the review checks used to assess AI output instead.

## Ongoing verification practice

- Review generated code and understand it before keeping it.
- Verify prices, stock, payment outcomes, and status transitions on the server rather than trusting browser input.
- Run the relevant unit tests and manually walk through payment success and failure before submission; record actual commands and outcomes here as they happen.
- Never put payment secrets or personal customer data in prompts or committed files.
