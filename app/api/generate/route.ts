import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" })
  : null;

function generateStubScript(url: string, oneLiner: string, isPaid: boolean) {
  const outline = `DEMO SCRIPT OUTLINE FOR: ${url}

${oneLiner ? `PRODUCT: ${oneLiner}\n` : ""}
[00:00-00:05] HOOK
- Open with the pain point
- Grab attention immediately

[00:05-00:15] PROBLEM
- State the problem your audience faces
- Make it relatable and urgent

[00:15-00:45] DEMO BEATS
- Show the solution in action
- 3-4 key features that solve the problem
- Keep it visual and simple

[00:45-00:55] OBJECTIONS
- Address top concern quickly
- Build trust

[00:55-01:00] CTA
- Clear next step
- Create urgency`;

  if (!isPaid) return outline;

  return `${outline}

===== FULL 60-SECOND SCRIPT =====

[00:00] "Ever spend hours on [problem]?"

[00:05] "Most founders struggle with [specific pain]. It costs time, money, and sanity."

[00:15] "Here's how ${url} fixes it in 60 seconds."

[00:20] "First, [feature 1 - show it]. Done in seconds."

[00:30] "Next, [feature 2 - demonstrate]. No complicated setup."

[00:40] "Finally, [feature 3 - quick win]. Everything just works."

[00:45] "But what about [objection]? We built [solution] specifically for that."

[00:50] "Try it free today at ${url}"

[00:55] "Limited spots for early founders."

[01:00] "Link in bio. Let's ship this."

===== VARIATION 1: BOLD OPEN =====

[00:00] "I'm going to solve [problem] in the next 60 seconds. Watch."

[Continue similar structure with aggressive confidence...]

===== VARIATION 2: STORY-LED =====

[00:00] "Last week, a founder told me they wasted 10 hours on [problem]..."

[Continue with narrative arc...]

===== OBJECTION HANDLERS =====

"Too expensive?" → [pricing justification]
"Doesn't work for my industry?" → [specific use cases]
"Already have a solution?" → [key differentiator]
"Not sure I need it?" → [urgency + FOMO]`;
}

async function generateScriptWithOpenAI(
  url: string,
  oneLiner: string,
  isPaid: boolean
) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return generateStubScript(url, oneLiner, isPaid);
  }

  try {
    const prompt = isPaid
      ? `Generate a full 60-second demo script for a product at ${url}. ${
          oneLiner ? `Product description: ${oneLiner}` : ""
        }

Include:
1. Full timestamped script (00:00 to 01:00)
2. Hook, problem, demo beats, objections, CTA
3. Two script variations
4. Objection handlers

Format for Loom recording. ICP: indie founders.`
      : `Generate a demo script OUTLINE for ${url}. ${
          oneLiner ? `Product: ${oneLiner}` : ""
        }

Show structure only: Hook, Problem, Demo beats, Objections, CTA with timestamps.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI request failed");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI error:", error);
    return generateStubScript(url, oneLiner, isPaid);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url, oneLiner, isPaid } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL required" }, { status: 400 });
    }

    if (isPaid) {
      const PAYMENT_LINK = "https://buy.stripe.com/dRmdR3cPm2882DEeHIeUU05";
      
      if (!stripe) {
        return NextResponse.json({ 
          checkoutUrl: PAYMENT_LINK,
          fallback: true 
        });
      }

      try {
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price: "price_1UCQoY7pd3R2ckxOskbxSDOY",
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}&url=${encodeURIComponent(
            url
          )}&oneLiner=${encodeURIComponent(oneLiner || "")}`,
          cancel_url: req.nextUrl.origin,
          metadata: {
            url,
            oneLiner: oneLiner || "",
          },
        });

        return NextResponse.json({ checkoutUrl: session.url });
      } catch (error) {
        console.error("Stripe Checkout error, falling back to Payment Link:", error);
        return NextResponse.json({ 
          checkoutUrl: PAYMENT_LINK,
          fallback: true 
        });
      }
    }

    const script = await generateScriptWithOpenAI(url, oneLiner, false);
    return NextResponse.json({ script });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate script" },
      { status: 500 }
    );
  }
}
