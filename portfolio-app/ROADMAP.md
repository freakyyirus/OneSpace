# OneSpace SaaS Feature Roadmap

Here are the remaining features mapped out for the production application to become a fully verified proof-of-work portfolio platform. Take a look and pick what you want to work on next!

## Foundation (UI & Storage)
*These tasks get the basic app and database talking after the recent migration to Clerk/Postgres.*

- `[ ]` **Refactor Portfolio Builder UI**: Connect the existing Portfolio Builder (`/builder`) to the new PostgreSQL Prisma schema so users can actually save/edit their profiles correctly under Clerk authentication.
- `[ ]` **Cloudflare R2 File Storage Integration**: Set up an AWS S3-compatible storage bucket so users can upload their profile pictures, resume PDFs, and project screenshots.

## The Proof Pipeline (Core Features)
*The system that verifies the work a user claims they have done.*

- `[ ]` **GitHub OAuth & API Sync (Highest Priority)**: Allow users to log in with GitHub to fetch their repositories, commit history, and active pull requests as automatic verifiable proof.
- `[ ]` **Headless Browser Web Verification**: Create an API route that uses Puppeteer to take a URL (like a Figma file or a live site), load it in a headless browser in the background, take a screenshot, and verify the link is active.
- `[ ]` **Redis/BullMQ Async Queues**: Set up a background queue system so that when a user syncs GitHub or requests a web verification, it doesn't block the UI and processes safely in the background.

## The Recruiter Experience
*Building the side of the app where companies search for talent.*

- `[ ]` **Algolia Search Integration**: Automatically sync our database of verified users into an Algolia Index so recruiters can perform typo-tolerant, lightning-fast searches like "React Native Engineers with 50+ GitHub commits".
- `[ ]` **Recruiter Search UI**: Build the actual `/recruiter` dashboard where hiring managers can filter and view candidates.
- `[ ]` **Public Profile SEO & Sharing**: Optimize the dynamic `/p/[username]` folders so portfolios look amazing when linked on Twitter or LinkedIn (OpenGraph images).

## Polish & Monetization
*Final touches to prepare for a public beta SaaS launch.*

- `[ ]` **Stripe Subscriptions**: Implement checkout sessions and Stripe Webhooks to charge for "Pro" candidate accounts or "Recruiter" search access.
- `[ ]` **Resend Email Notifications**: Set up transactional emails for onboarding, forgotten passwords, or when a recruiter views a portfolio.
- `[ ]` **PostHog Analytics**: Add telemetry to track how many people are signing up, getting verified, and upgrading to Pro.
