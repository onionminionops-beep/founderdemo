"use client";

import { useState } from "react";

const PAYMENT_LINK = "https://buy.stripe.com/dRmdR3cPm2882DEeHIeUU05";

export default function Home() {
  const [url, setUrl] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async (isPaid: boolean) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, oneLiner, isPaid }),
      });

      const data = await response.json();

      if (isPaid) {
        window.location.href = data.checkoutUrl || PAYMENT_LINK;
        return;
      }

      setResult(data);
    } catch (error) {
      console.error(error);
      if (isPaid) {
        window.location.href = PAYMENT_LINK;
        return;
      }
      setResult({ error: "Failed to generate script" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="border border-green-500 p-8 mb-8">
        <h1 className="text-4xl mb-2 text-green-500">$ founderdemo</h1>
        <p className="text-gray-400 mb-8">&gt; 60-second demo scripts from product URLs</p>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-green-500">$ product_url:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourproduct.com"
              className="w-full bg-black border border-gray-700 p-3 text-white focus:border-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-green-500">$ one_liner (optional):</label>
            <input
              type="text"
              value={oneLiner}
              onChange={(e) => setOneLiner(e.target.value)}
              placeholder="Your product in one line..."
              className="w-full bg-black border border-gray-700 p-3 text-white focus:border-green-500 outline-none"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => handleGenerate(false)}
              disabled={!url || loading}
              className="flex-1 border border-gray-700 p-3 hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "PROCESSING..." : "FREE OUTLINE"}
            </button>
            <a
              href={PAYMENT_LINK}
              className="flex-1 bg-green-500 text-black p-3 font-bold hover:bg-green-400 transition-colors text-center"
            >
              $15 — Buy Full Script
            </a>
          </div>
        </div>
      </div>

      {result && (
        <div className="border border-green-500 p-8">
          <h2 className="text-2xl mb-4 text-green-500">&gt; OUTPUT:</h2>
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <pre className="whitespace-pre-wrap text-gray-300">{result.script}</pre>
          )}
        </div>
      )}

      <footer className="mt-12 text-center opacity-70">
        <a href="https://thesaasdir.com/product/founderdemo?ref=badge" rel="dofollow">
          <img
            src="https://thesaasdir.com/badge/founderdemo.svg"
            alt="Featured on TheSaaSDir"
            width={182}
            height={46}
            className="inline-block"
          />
        </a>
      </footer>
    </main>
  );
}
