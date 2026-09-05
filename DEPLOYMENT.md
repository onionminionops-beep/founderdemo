# FounderDemo v1 - SHIPPED ✓

**Status:** Pushed to `main` | Build: PASSING ✓

## What Was Built

60-second demo script generator for indie founders recording Loom videos tonight.

### Features

**Free Tier:**
- URL + optional one-liner input
- Generates demo script outline with timestamps
- Hook, problem, demo beats, objections, CTA structure

**Paid Tier ($15):**
- Full 60-second timestamped script
- 2 script variations (Bold Open, Story-Led)
- Objection handlers
- Copy-to-clipboard functionality

### Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS (script-on-black aesthetic)
- Stripe Checkout (managed_payments.enabled=false)
- OpenAI API (optional - falls back to stub scripts)

### Stripe Integration

- Product: `prod_VCqVInJQiv7e5L`
- Price: `price_1UCQoY7pd3R2ckxOskbxSDOY` ($15 one-time)
- Payment Link fallback: https://buy.stripe.com/dRmdR3cPm2882DEeHIeUU05
- Mode: Checkout session (SaaS optimized)

## File Structure

```
/workspace
├── app/
│   ├── api/
│   │   ├── generate/route.ts    # Script generation + Stripe checkout
│   │   └── webhook/route.ts     # Stripe webhook handler
│   ├── success/page.tsx         # Post-payment script delivery
│   ├── page.tsx                 # Main form (script-on-black UI)
│   ├── layout.tsx
│   └── globals.css
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── .env.example
```

## Deployment Instructions

### 1. Set Environment Variables

```bash
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
OPENAI_API_KEY=sk-... (optional)
STRIPE_WEBHOOK_SECRET=whsec_... (for webhooks)
```

### 2. Deploy to Vercel

```bash
vercel --prod
```

Or push to main (already done) and let Vercel auto-deploy.

### 3. Configure Stripe Webhook

Add webhook endpoint in Stripe Dashboard:
- URL: `https://yourdomain.com/api/webhook`
- Events: `checkout.session.completed`

## Testing Locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## What Works

✓ URL input form with script-on-black aesthetic
✓ Free outline generation (works without OpenAI)
✓ Paid tier redirects to Stripe Checkout
✓ Success page generates full script after payment
✓ Stub scripts work without OpenAI API key
✓ OpenAI integration (when key provided)
✓ Payment Link fallback available
✓ npm run build passes
✓ Pushed to main

## Next Steps (Post-MVP)

- Add webhook logging/database for payment tracking
- Implement email delivery for paid scripts
- Add script export formats (PDF, TXT)
- A/B test pricing ($15 vs $9 vs $19)
- Add testimonials from first 10 customers
- SEO optimization for "demo script generator"

---

**Built:** Sep 5, 2026  
**Commit:** 7568f50  
**Build Time:** ~5 minutes  
**Status:** READY TO LAUNCH 🚀
