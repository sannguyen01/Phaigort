"use client";

import { useEffect } from "react";

interface GlobalErrorProps { error: Error & { digest?: string }; reset: () => void; }

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => { console.error("[Phaigort global error]", error); }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#1A2851", color: "#F8F9FB", fontFamily: "Inter, system-ui, sans-serif" }}>
        <div style={{ maxWidth: 480, textAlign: "center", padding: "2rem" }}>
          <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.2em", color: "#FF6B4A" }}>Critical error</p>
          <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: 36, fontWeight: 300, marginTop: 24, color: "#F8F9FB" }}>The Wonderhouse needs a moment</h1>
          <p style={{ marginTop: 24, lineHeight: 1.7, color: "#8B9DC3" }}>A fundamental disruption has occurred. We apologise for the interruption to your voyage.</p>
          <button onClick={reset} style={{ marginTop: 32, padding: "12px 32px", backgroundColor: "#FF6B4A", color: "#F8F9FB", border: "none", cursor: "pointer", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.2em" }}>Reload</button>
        </div>
      </body>
    </html>
  );
}
