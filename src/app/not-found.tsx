import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const STYLES = `
  @keyframes glitch-text {
    0%, 85%, 100% {
      text-shadow: none;
      transform: skewX(0deg);
      opacity: 1;
    }
    87% {
      text-shadow: -4px 0 oklch(0.85 0.18 195 / 0.9), 4px 0 oklch(0.65 0.25 25 / 0.9);
      transform: skewX(-3deg);
      opacity: 0.9;
    }
    89% {
      text-shadow: 4px 0 oklch(0.85 0.18 195 / 0.9), -4px 0 oklch(0.65 0.25 25 / 0.9);
      transform: skewX(3deg);
    }
    91% {
      text-shadow: -2px 0 oklch(0.85 0.18 195), 2px 0 oklch(0.65 0.25 25);
      transform: skewX(-1.5deg);
    }
    93% {
      text-shadow: 3px 0 oklch(0.85 0.18 195), -3px 0 oklch(0.65 0.25 25);
      transform: skewX(2deg);
    }
    95% {
      text-shadow: none;
      transform: skewX(-0.5deg);
    }
  }

  @keyframes pulse-ring {
    0% { transform: scale(0.85); opacity: 0.5; }
    100% { transform: scale(2.6); opacity: 0; }
  }

  @keyframes float-card {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50% { transform: translateY(-16px) rotate(1.5deg); }
  }

  @keyframes scanline {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(110vh); opacity: 0; }
  }

  @keyframes blink-cursor {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes draw-path {
    to { stroke-dashoffset: 0; }
  }

  @keyframes noise-shift {
    0% { transform: translate(0, 0); }
    10% { transform: translate(-2px, 1px); }
    20% { transform: translate(2px, -1px); }
    30% { transform: translate(-1px, 2px); }
    40% { transform: translate(1px, -2px); }
    50% { transform: translate(-3px, 1px); }
    60% { transform: translate(3px, -1px); }
    70% { transform: translate(-1px, 3px); }
    80% { transform: translate(1px, -1px); }
    90% { transform: translate(-2px, -2px); }
    100% { transform: translate(0, 0); }
  }

  .glitch-num {
    animation: glitch-text 5s ease-in-out infinite;
  }

  .float-card-el {
    animation: float-card 5s ease-in-out infinite;
  }

  .card-scanline {
    animation: scanline 8s linear 1.5s infinite;
  }

  .fade-up-1 { animation: fade-up 0.6s ease 0.3s both; }
  .fade-up-2 { animation: fade-up 0.6s ease 0.55s both; }
  .fade-up-3 { animation: fade-up 0.6s ease 0.75s both; }
  .fade-up-4 { animation: fade-up 0.6s ease 0.95s both; }

  @media (prefers-reduced-motion: reduce) {
    .glitch-num, .float-card-el, .card-scanline,
    .fade-up-1, .fade-up-2, .fade-up-3, .fade-up-4 {
      animation: none !important;
    }
  }
`;

export default function NotFound() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="flex min-h-full flex-col">
        <Navbar />

        <main className="relative flex flex-1 items-center justify-center overflow-hidden py-20">

          {/* ── Background layers ─────────────────────────────────────── */}
          <div className="circuit-pattern absolute inset-0 opacity-[0.28]" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 40%, oklch(0.75 0.15 195 / 0.05) 0%, transparent 70%)",
            }}
          />

          {/* Pulse rings */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute rounded-full border border-primary/15"
                style={{
                  width: 300,
                  height: 300,
                  animation: `pulse-ring 4s ease-out ${i * 1.3}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Scanline sweep */}
          <div
            className="card-scanline pointer-events-none absolute left-0 right-0 h-48"
            aria-hidden
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(0.75 0.15 195 / 0.04) 50%, transparent)",
            }}
          />

          {/* ── Content ────────────────────────────────────────────────── */}
          <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">

            {/* 404 number */}
            <div className="fade-up-1 mb-4 select-none" aria-label="Error 404">
              <span
                className="glitch-num block font-bold leading-none text-foreground"
                style={{
                  fontSize: "clamp(110px, 20vw, 240px)",
                  letterSpacing: "-0.04em",
                }}
              >
                404
              </span>
            </div>

            {/* Broken OG card SVG */}
            <div className="float-card-el fade-up-2 mx-auto mb-10 w-fit" aria-hidden>
              <svg
                width="224"
                height="118"
                viewBox="0 0 224 118"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="card">
                    <rect width="224" height="118" rx="8" />
                  </clipPath>
                  <filter id="static" x="-5%" y="-5%" width="110%" height="110%">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.72"
                      numOctaves="4"
                      seed="2"
                      result="noise"
                    />
                    <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                    <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blend" />
                    <feComposite in="blend" in2="SourceGraphic" operator="in" />
                  </filter>
                </defs>

                {/* Card body */}
                <rect
                  width="224"
                  height="118"
                  rx="8"
                  fill="oklch(0.12 0.015 250)"
                  stroke="oklch(0.22 0.015 250)"
                  strokeWidth="1.5"
                />

                {/* Static noise overlay */}
                <rect
                  clipPath="url(#card)"
                  width="224"
                  height="118"
                  rx="8"
                  fill="oklch(0.18 0.01 250 / 0.6)"
                  filter="url(#static)"
                />

                {/* Broken image area */}
                <rect
                  x="68"
                  y="20"
                  width="88"
                  height="68"
                  rx="4"
                  stroke="oklch(0.32 0.015 250)"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                  fill="oklch(0.10 0.012 250)"
                />

                {/* Mountain silhouette */}
                <path
                  d="M76 80 L92 56 L104 66 L118 46 L140 80Z"
                  fill="oklch(0.20 0.012 250)"
                  stroke="oklch(0.32 0.015 250)"
                  strokeWidth="1"
                />

                {/* X mark */}
                <path
                  d="M91 31 L125 65"
                  stroke="oklch(0.65 0.25 25 / 0.7)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="50"
                  strokeDashoffset="50"
                  style={{ animation: "draw-path 0.5s ease 0.8s forwards" }}
                />
                <path
                  d="M125 31 L91 65"
                  stroke="oklch(0.65 0.25 25 / 0.7)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="50"
                  strokeDashoffset="50"
                  style={{ animation: "draw-path 0.5s ease 1.1s forwards" }}
                />

                {/* Glitch lines (SMIL animated) */}
                <rect
                  x="0"
                  y="30"
                  width="155"
                  height="2.5"
                  fill="oklch(0.75 0.15 195 / 0.22)"
                  clipPath="url(#card)"
                >
                  <animate
                    attributeName="y"
                    values="30;58;42;76;30"
                    dur="2.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="width"
                    values="155;120;175;100;155"
                    dur="2.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.22;0.38;0.14;0.30;0.22"
                    dur="2.2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="50"
                  y="68"
                  width="70"
                  height="1.5"
                  fill="oklch(0.65 0.25 25 / 0.28)"
                  clipPath="url(#card)"
                >
                  <animate
                    attributeName="y"
                    values="68;88;74;96;68"
                    dur="1.7s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x"
                    values="50;65;38;80;50"
                    dur="1.7s"
                    repeatCount="indefinite"
                  />
                </rect>

                {/* Top-right error badge */}
                <circle
                  cx="204"
                  cy="14"
                  r="9"
                  fill="oklch(0.65 0.25 25 / 0.18)"
                  stroke="oklch(0.65 0.25 25 / 0.55)"
                  strokeWidth="1.5"
                />
                <path
                  d="M200 10.5 L208 17.5M208 10.5 L200 17.5"
                  stroke="oklch(0.65 0.25 25)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* Signal dots bottom-left */}
                {[0, 1, 2].map((i) => (
                  <circle
                    key={i}
                    cx={12 + i * 10}
                    cy={106}
                    r={2.5}
                    fill={
                      i === 0
                        ? "oklch(0.65 0.25 25 / 0.8)"
                        : "oklch(0.32 0.015 250)"
                    }
                  >
                    {i === 0 && (
                      <animate
                        attributeName="opacity"
                        values="0.8;0.2;0.8"
                        dur="1.4s"
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                ))}
                <text
                  x="46"
                  y="110"
                  fontFamily="monospace"
                  fontSize="8"
                  fill="oklch(0.42 0.015 250)"
                >
                  404 · link dead
                </text>
              </svg>
            </div>

            {/* Terminal block */}
            <div className="builder-panel fade-up-3 mx-auto mb-10 max-w-lg rounded-lg p-5 text-left">
              <div className="mb-3.5 flex items-center gap-2 border-b border-border pb-3">
                {(
                  [
                    "oklch(0.65 0.25 25)",
                    "oklch(0.78 0.18 80)",
                    "oklch(0.72 0.22 145)",
                  ] as const
                ).map((c, i) => (
                  <span
                    key={i}
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: c }}
                  />
                ))}
                <span className="ml-1.5 font-mono text-xs text-muted-fg">
                  error.log
                </span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <p>
                  <span className="text-muted-fg">›</span>{" "}
                  <span className="text-terminal-amber">STATUS</span>
                  <span className="text-muted-fg">  ······  </span>
                  <span style={{ color: "oklch(0.65 0.25 25)" }}>
                    404 NOT FOUND
                  </span>
                </p>
                <p>
                  <span className="text-muted-fg">›</span>{" "}
                  <span className="text-terminal-amber">SIGNAL</span>
                  <span className="text-muted-fg">  ······  </span>
                  <span className="text-foreground/65">lost · no route matched</span>
                </p>
                <p>
                  <span className="text-muted-fg">›</span>{" "}
                  <span className="text-terminal-amber">HINT</span>
                  <span className="text-muted-fg">    ······  </span>
                  <span className="text-foreground/65">
                    check the URL or navigate home
                  </span>
                </p>
                <p className="flex items-center gap-1 pt-1">
                  <span className="terminal-prompt text-xs">$</span>
                  <span
                    className="inline-block h-3.5 w-2 bg-primary align-middle"
                    style={{ animation: "blink-cursor 1.1s step-end infinite" }}
                  />
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="fade-up-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-6 py-3 font-mono text-sm text-primary transition-all hover:border-primary/60 hover:bg-primary/20"
              >
                ← back to home
              </Link>
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-mono text-sm text-muted-fg transition-all hover:border-primary/30 hover:text-primary"
              >
                open builder →
              </Link>
            </div>

            <p className="mt-14 font-mono text-xs text-muted-fg/30">
              placard.mfaouzi.com
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

