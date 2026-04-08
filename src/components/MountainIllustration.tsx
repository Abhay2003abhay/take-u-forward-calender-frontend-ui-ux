export default function MountainIllustration() {
  return (
    <svg
      viewBox="0 0 300 260"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a5068" />
          <stop offset="100%" stopColor="#2C3B4E" />
        </linearGradient>
        <linearGradient id="mtn-fg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a5f70" />
          <stop offset="100%" stopColor="#2C3B4E" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="300" height="260" fill="url(#sky)" />

      {/* Moon */}
      <circle cx="225" cy="52" r="28" fill="rgba(255,255,255,0.06)" />
      <circle cx="225" cy="52" r="20" fill="rgba(255,255,255,0.1)" />
      <circle cx="225" cy="52" r="13" fill="rgba(255,255,255,0.14)" />

      {/* Stars */}
      {[
        [40, 28], [100, 18], [170, 33], [260, 22], [30, 68], [145, 48], [280, 55],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 1.5 : 1} fill={`rgba(255,255,255,${0.3 + (i % 3) * 0.1})`} />
      ))}

      {/* Background mountain range */}
      <polygon
        points="0,260 80,105 160,185 240,82 300,162 300,260"
        fill="#1e2e3e"
      />
      {/* Mid mountain */}
      <polygon
        points="60,260 140,115 220,185 300,92 300,260"
        fill="#253545"
      />
      {/* Foreground mountain */}
      <polygon
        points="100,260 180,135 260,205 300,165 300,260"
        fill="url(#mtn-fg)"
        opacity="0.75"
      />

      {/* Snow caps */}
      <polygon points="80,105 94,135 66,135" fill="rgba(255,255,255,0.18)" />
      <polygon points="240,82 256,112 224,112" fill="rgba(255,255,255,0.22)" />
      <polygon points="180,135 192,158 168,158" fill="rgba(255,255,255,0.14)" />

      {/* Climber silhouette */}
      <g transform="translate(190,122) rotate(-18)">
        <rect x="-2" y="-11" width="4" height="13" rx="2" fill="rgba(255,255,255,0.72)" />
        <circle cx="0" cy="-14" r="4.5" fill="rgba(255,255,255,0.72)" />
        <line x1="-7" y1="-5" x2="7" y2="-5" stroke="rgba(255,255,255,0.72)" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="2" x2="-4" y2="13" stroke="rgba(255,255,255,0.72)" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="2" x2="4" y2="13" stroke="rgba(255,255,255,0.72)" strokeWidth="2" strokeLinecap="round" />
        {/* Ice axe */}
        <line x1="9" y1="-9" x2="18" y2="-2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="-4" x2="20" y2="-7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Fog layer */}
      <rect x="0" y="195" width="300" height="65" fill="rgba(44,59,78,0.45)" />
    </svg>
  );
}
