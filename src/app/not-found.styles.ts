export const STYLES = `
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
