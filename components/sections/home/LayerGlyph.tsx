/** Minimal line illustrations for each market layer (illustrative, not data). */
export function LayerGlyph({ id, className }: { id: string; className?: string }) {
  const common = { fill: "none", strokeWidth: 1.4, vectorEffect: "non-scaling-stroke" as const };
  return (
    <svg viewBox="0 0 120 72" className={className} aria-hidden>
      <rect x="0.5" y="0.5" width="119" height="71" rx="6" fill="none" stroke="rgba(231,201,131,0.18)" />
      {id === "dynamics" && (
        <>
          <polyline {...common} stroke="#fff3e6" points="8,52 20,44 28,48 40,30 50,36 62,22 72,28 84,16 96,24 112,12" />
          <polyline {...common} stroke="#8ea3b8" strokeOpacity="0.5" points="8,58 24,54 36,56 52,44 66,46 80,36 96,40 112,30" />
        </>
      )}
      {id === "profile" &&
        [6, 10, 16, 22, 28, 30, 26, 18, 12, 20, 14, 8].map((w, i) => (
          <g key={i}>
            {Array.from({ length: Math.round(w / 3) }, (_, j) => (
              <rect key={j} x={10 + j * 6.4} y={8 + i * 4.8} width="5" height="3.6" fill={i > 2 && i < 8 ? "#ffbd7d" : "#6e2c05"} opacity={i > 2 && i < 8 ? 0.9 : 0.5} />
            ))}
          </g>
        ))}
      {id === "volume" &&
        [10, 18, 14, 26, 34, 22, 40, 30, 20, 44, 28, 16, 24, 12].map((h, i) => (
          <rect key={i} x={8 + i * 7.6} y={64 - h} width="4.6" height={h} fill={h > 30 ? "#ffbd7d" : "#8ea3b8"} opacity={h > 30 ? 0.9 : 0.55} />
        ))}
      {id === "orderflow" &&
        Array.from({ length: 6 }, (_, c) =>
          Array.from({ length: 8 }, (_, r) => {
            const v = Math.round(((Math.sin(c * 3.1 + r * 1.7) + 1) / 2) * 100) / 100; // stable SSR/CSR
            return (
              <rect
                key={`${c}-${r}`}
                x={10 + c * 17}
                y={8 + r * 7}
                width="14"
                height="5"
                fill={v > 0.85 ? "#fff3e6" : c % 2 ? "#8ea3b8" : "#ffbd7d"}
                opacity={0.15 + v * 0.7}
              />
            );
          }),
        )}
      {id === "strategy" && (
        <>
          <rect x="44" y="10" width="68" height="22" fill="#8ea3b8" opacity="0.12" />
          <rect x="44" y="40" width="68" height="14" fill="#ff6a4d" opacity="0.15" />
          <line x1="44" x2="112" y1="38" y2="38" stroke="#fff3e6" strokeWidth="1.4" />
          <line x1="44" x2="112" y1="54" y2="54" stroke="#ff6a4d" strokeDasharray="3 3" />
          <line x1="44" x2="112" y1="14" y2="14" stroke="#5fd39a" strokeDasharray="3 3" />
          <polyline {...common} stroke="#ffbd7d" points="8,52 16,46 24,50 32,42 44,38" />
        </>
      )}
    </svg>
  );
}
