export const STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes draw-tri {
    to { stroke-dashoffset: 0; }
  }

  @keyframes draw-dot {
    to { opacity: 1; }
  }

  @keyframes ring-expand {
    0% { transform: scale(1); opacity: 0.45; }
    100% { transform: scale(1.9); opacity: 0; }
  }

  @keyframes crit-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(110vh); }
  }

  @keyframes flicker {
    0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
    20%, 24%, 55% { opacity: 0.35; }
  }

  .ring-exp { animation: ring-expand 2.6s ease-out infinite; }
  .ring-exp-d { animation: ring-expand 2.6s ease-out 0.9s infinite; }

  .tri-draw {
    stroke-dasharray: 206;
    stroke-dashoffset: 206;
    animation: draw-tri 1s ease 0.3s forwards;
  }

  .vline-draw {
    stroke-dasharray: 32;
    stroke-dashoffset: 32;
    animation: draw-tri 0.5s ease 1.1s forwards;
  }

  .dot-appear { opacity: 0; animation: draw-dot 0.3s ease 1.6s forwards; }

  .title-el { animation: fade-up 0.6s ease 0.35s both, flicker 0.9s ease 0.5s 2; }
  .sub-el { animation: fade-up 0.6s ease 0.6s both; }
  .detail-el { animation: fade-up 0.6s ease 0.8s both; }
  .cta-el { animation: fade-up 0.6s ease 1s both; }
  .brand-el { animation: fade-up 0.6s ease 1.2s both; }

  .reset-btn {
    animation: crit-pulse 3.2s ease-in-out 1.2s infinite;
    cursor: pointer;
    transition: background 0.2s;
  }
  .reset-btn:hover { background: rgba(220, 50, 50, 0.22) !important; }

  .home-link:hover { color: rgba(255,255,255,0.75) !important; border-color: rgba(255,255,255,0.18) !important; }

  @media (prefers-reduced-motion: reduce) {
    .ring-exp, .ring-exp-d, .tri-draw, .vline-draw, .dot-appear,
    .title-el, .sub-el, .detail-el, .cta-el, .brand-el, .reset-btn {
      animation: none !important;
      stroke-dashoffset: 0 !important;
      opacity: 1 !important;
    }
  }
`;
