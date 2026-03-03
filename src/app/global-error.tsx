"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[Phaigort global error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D0D0D",
          color: "#F5F0E8",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center", padding: "2rem" }}>
          <p
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#8B1A2F",
            }}
          >
            Critical error
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 40,
              fontWeight: 300,
              marginTop: 24,
              color: "#FFFDF7",
            }}
          >
            The Wonderhouse needs a moment
          </h1>
          <p style={{ marginTop: 24, lineHeight: 1.7, color: "#F5F0E8aa" }}>
            A fundamental disruption has occurred. We apologise for the
            interruption to your voyage.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 32,
              padding: "12px 32px",
              backgroundColor: "#C9A86C",
              color: "#0D0D0D",
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
