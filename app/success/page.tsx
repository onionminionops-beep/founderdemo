"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [script, setScript] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const url = searchParams.get("url") || "";
  const oneLiner = searchParams.get("oneLiner") || "";

  useEffect(() => {
    async function fetchScript() {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, oneLiner, isPaid: true }),
        });

        const data = await response.json();
        setScript(data.script || "Error generating script");
      } catch (error) {
        setScript("Error generating script. Please contact support.");
      } finally {
        setLoading(false);
      }
    }

    if (url) {
      fetchScript();
    } else {
      setLoading(false);
    }
  }, [url, oneLiner]);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="border border-green-500 p-8 mb-8">
        <h1 className="text-3xl mb-4 text-green-500">$ payment_successful</h1>
        <p className="text-gray-400 mb-4">&gt; Generating your full script...</p>
      </div>

      {loading ? (
        <div className="border border-gray-700 p-8">
          <p className="text-green-500 animate-pulse">GENERATING...</p>
        </div>
      ) : (
        <div className="border border-green-500 p-8">
          <h2 className="text-2xl mb-4 text-green-500">&gt; YOUR SCRIPT:</h2>
          <pre className="whitespace-pre-wrap text-gray-300 mb-6">{script}</pre>
          <button
            onClick={() => {
              navigator.clipboard.writeText(script);
              alert("Script copied to clipboard!");
            }}
            className="border border-green-500 px-4 py-2 hover:bg-green-500 hover:text-black transition-colors"
          >
            COPY TO CLIPBOARD
          </button>
        </div>
      )}

      <div className="mt-8 text-center">
        <a href="/" className="text-green-500 hover:underline">
          &lt; Generate another script
        </a>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8 text-green-500">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
