# FounderDemo

**60-second founder demo scripts from product URLs.**

Paste your product URL → Get a crisp, investor-ready demo script in 60 seconds. Built for indie founders and early SaaS teams who need compelling demos for investors or sales calls.

🔗 **Live Demo**: Deploy to Vercel in one click

## Features

- 🎯 **Structured 60-Second Scripts** - Hook, Problem, Demo Beats, Objections, CTA with timestamps
- 🤖 **AI-Powered Generation** - Optional OpenAI integration for smart script generation
- 💰 **$15 One-Time Payment** - No subscriptions, own it forever
- 📱 **Mobile-Friendly** - Clean, responsive design
- ⚡ **Fast & Simple** - No auth required, instant results
- 🎨 **Terminal Aesthetic** - Developer-focused design

## Product Details

- **Product ID**: `prod_VCqVInJQiv7e5L`
- **Price ID**: `price_1UCQoY7pd3R2ckxOskbxSDOY`
- **Price**: $15 USD (one-time payment)
- **Payment Link**: `https://buy.stripe.com/dRmdR3cPm2882DEeHIeUU05`

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account (for payments)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build

```bash
npm run build
npm start
```

Build passes with Next.js 15.5.7+ (patched for CVE-2025-66478).

## Environment Variables

Create a `.env.local` file in the root directory:

### Required for Payments

```bash
# Stripe Secret Key (required for Checkout Sessions)
STRIPE_SECRET_KEY=sk_test_51...
```

### Optional

```bash
# OpenAI API Key for AI-powered script generation (optional)
# Falls back to template-based generation if not provided
OPENAI_API_KEY=sk-proj-...

# Stripe Price ID (optional, defaults to hardcoded production price)
STRIPE_PRICE_ID=price_1UCQoY7pd3R2ckxOskbxSDOY

# Stripe Webhook Secret (for payment verification)
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Environment Variable Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `STRIPE_SECRET_KEY` | Yes* | - | Stripe secret key for creating Checkout Sessions |
| `STRIPE_PRICE_ID` | No | `price_1UCQoY7pd3R2ckxOskbxSDOY` | Stripe price ID for the $15 payment |
| `STRIPE_WEBHOOK_SECRET` | No | - | Stripe webhook secret for verifying payment events |
| `OPENAI_API_KEY` | No | - | OpenAI API key for AI script generation |

*Required for payment functionality. Without `STRIPE_SECRET_KEY`, the app will return an error when users try to purchase.

## How It Works

1. **Free Outline**: User enters product URL → receives structured outline with timestamps
2. **Paid Full Script**: User clicks "$15 - FULL SCRIPT" → redirected to Stripe Checkout
3. **Payment Success**: After payment, user returns to success page with full generated script
4. **Script Variations**: Paid version includes multiple script variations and objection handlers

### Script Structure

- **[00:00-00:05] Hook** - Grab attention with the pain point
- **[00:05-00:15] Problem** - State the relatable, urgent problem
- **[00:15-00:45] Demo Beats** - Show 3-4 key features solving the problem
- **[00:45-00:55] Objections** - Address top concerns, build trust
- **[00:55-01:00] CTA** - Clear next step with urgency

### AI Generation

If `OPENAI_API_KEY` is provided:
- Uses GPT-4o-mini for intelligent, context-aware script generation
- Analyzes product URL and one-liner for targeted scripts
- Generates multiple variations and objection handlers

Without OpenAI:
- Falls back to high-quality template-based generation
- Still provides structured, actionable scripts
- Faster response time

## Deployment

### Vercel (Recommended)

1. Push to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Add environment variables:
   - `STRIPE_SECRET_KEY` (required)
   - `OPENAI_API_KEY` (optional)
   - `STRIPE_WEBHOOK_SECRET` (optional, for webhooks)
4. Deploy

The app is optimized for Vercel's Edge Runtime and deploys in under 30 seconds.

### Vercel CLI

```bash
vercel
```

### Setting Up Stripe Webhooks (Optional)

1. Add webhook endpoint in Stripe Dashboard: `https://yourdomain.com/api/webhook`
2. Select event: `checkout.session.completed`
3. Copy webhook secret to `STRIPE_WEBHOOK_SECRET` env var

## Tech Stack

- **Framework**: Next.js 15.5.7+ (App Router, patched for CVE-2025-66478)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Payments**: Stripe Checkout
- **AI**: OpenAI GPT-4o-mini (optional)
- **Deployment**: Vercel

## API Routes

### POST `/api/generate`

Generate demo script (free outline or redirect to payment).

**Request Body**:
```json
{
  "url": "https://yourproduct.com",
  "oneLiner": "Optional product description",
  "isPaid": false
}
```

**Response** (Free):
```json
{
  "script": "DEMO SCRIPT OUTLINE...",
}
```

**Response** (Paid):
```json
{
  "checkoutUrl": "https://checkout.stripe.com/..."
}
```

### POST `/api/webhook`

Stripe webhook handler for payment verification.

## Project Structure

```
founderdemo/
├── app/
│   ├── api/
│   │   ├── generate/      # Script generation endpoint
│   │   └── webhook/       # Stripe webhook handler
│   ├── success/           # Post-payment success page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── public/                # Static assets
├── .env.example           # Environment variables template
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── README.md              # This file
```

## Development Notes

### Testing Payments

Use Stripe test mode:
- Test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

### Script Quality

For best results with AI generation:
- Provide a clear, concise one-liner
- Use a product URL with good landing page copy
- Test with different product types to refine prompts

## Troubleshooting

### Build Fails

Ensure Next.js is >=15.5.7 (patched for CVE-2025-66478):
```bash
npm install next@latest eslint-config-next@latest
npm run build
```

### Stripe Errors

- Verify `STRIPE_SECRET_KEY` is set correctly
- Check price ID matches your Stripe dashboard
- Ensure Stripe is in test mode during development

### OpenAI Errors

- Verify API key is valid
- Check OpenAI account has credits
- App falls back to templates if OpenAI fails

## Future Enhancements

- [ ] Preview with blur functionality (show first 30% for free)
- [ ] Payment Link fallback (when STRIPE_SECRET_KEY not set)
- [ ] Session persistence for paid users
- [ ] Export scripts to PDF/Google Slides
- [ ] Multiple script lengths (30s, 90s, elevator pitch)
- [ ] Custom branding options
- [ ] Script analytics and tracking
- [ ] Video demo recording tips

## License

MIT

## Support

For questions or issues, open a GitHub issue or contact support.

---

Built with ❤️ for founders who ship fast.
