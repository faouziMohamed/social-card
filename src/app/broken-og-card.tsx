export function BrokenOgCard() {
  return (
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
          <feColorMatrix
            type="saturate"
            values="0"
            in="noise"
            result="grayNoise"
          />
          <feBlend
            in="SourceGraphic"
            in2="grayNoise"
            mode="overlay"
            result="blend"
          />
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
        style={{animation: 'draw-path 0.5s ease 0.8s forwards'}}
      />
      <path
        d="M125 31 L91 65"
        stroke="oklch(0.65 0.25 25 / 0.7)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="50"
        strokeDashoffset="50"
        style={{animation: 'draw-path 0.5s ease 1.1s forwards'}}
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
      {[0, 1, 2].map(i => (
        <circle
          key={i}
          cx={12 + i * 10}
          cy={106}
          r={2.5}
          fill={i === 0 ? 'oklch(0.65 0.25 25 / 0.8)' : 'oklch(0.32 0.015 250)'}
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
  );
}
