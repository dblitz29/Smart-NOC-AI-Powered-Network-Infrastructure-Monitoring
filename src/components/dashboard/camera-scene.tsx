import type { Box, DetectionType, Scene } from "@/lib/types";

const INK = "#0d1316";
const LINE = "#2a383e";
const LIGHT = "#cfd9d5";

function Background({ scene }: { scene: Scene }) {
  const n = (c: number) => Array.from({ length: c }, (_, i) => i);
  if (scene === "rack-row")
    return (
      <>
        <rect width="160" height="90" fill="#111a1e" />
        <rect y="78" width="160" height="12" fill="#0a1013" />
        {n(6).map((i) => (
          <g key={i}>
            <rect x={5 + i * 26} y="12" width="21" height="68" fill="#182227" stroke={LINE} />
            {n(7).map((j) => (
              <g key={j}>
                <line x1={7 + i * 26} x2={24 + i * 26} y1={20 + j * 8.5} y2={20 + j * 8.5} stroke={LINE} />
                <rect x={21 + i * 26} y={16 + j * 8.5} width="2" height="2" fill={(i + j) % 5 === 0 ? "#8fbfa8" : "#5d6f68"} />
              </g>
            ))}
          </g>
        ))}
      </>
    );
  if (scene === "tower")
    return (
      <>
        <rect width="160" height="90" fill="#121b1f" />
        <rect y="72" width="160" height="18" fill="#0b1114" />
        <g stroke="#3a4b52" strokeWidth="1" fill="none">
          <path d="M112 4 L98 72 M112 4 L126 72 M98 72 L126 72" />
          {n(6).map((i) => (
            <path key={i} d={`M${104 - i * 0.9} ${18 + i * 9} L${120 + i * 0.9} ${27 + i * 9} M${120 + i * 0.9} ${18 + i * 9} L${104 - i * 0.9} ${27 + i * 9}`} />
          ))}
        </g>
        <rect x="14" y="52" width="30" height="22" fill="#1b272c" stroke={LINE} />
        <rect x="18" y="56" width="10" height="14" fill={INK} />
        <g stroke={LINE}>
          <line x1="0" x2="160" y1="70" y2="70" />
          {n(16).map((i) => (
            <line key={i} x1={i * 10 + 2} x2={i * 10 + 2} y1="62" y2="74" />
          ))}
        </g>
      </>
    );
  if (scene === "battery")
    return (
      <>
        <rect width="160" height="90" fill="#10181b" />
        <rect y="78" width="160" height="12" fill="#0a1013" />
        {n(3).map((r) =>
          n(8).map((c) => (
            <g key={`${r}${c}`}>
              <rect x={6 + c * 19} y={14 + r * 21} width="16" height="16" fill="#18242a" stroke={LINE} />
              <rect x={9 + c * 19} y={12 + r * 21} width="3" height="2" fill="#4c5d64" />
              <rect x={15 + c * 19} y={12 + r * 21} width="3" height="2" fill="#4c5d64" />
            </g>
          ))
        )}
      </>
    );
  return (
    <>
      <rect width="160" height="90" fill="#11191d" />
      <rect y="70" width="160" height="20" fill="#0a1013" />
      <g stroke={LINE}>
        {n(21).map((i) => (
          <line key={i} x1={i * 8} x2={i * 8} y1="30" y2="72" />
        ))}
        <line x1="0" x2="160" y1="34" y2="34" />
        <line x1="0" x2="160" y1="66" y2="66" />
      </g>
      <rect x="104" y="40" width="44" height="30" fill="#1b272c" stroke={LINE} />
      <rect x="110" y="46" width="14" height="10" fill={INK} />
    </>
  );
}

function Subject({ detection, box }: { detection: DetectionType; box: Box }) {
  const x = box.x * 1.6;
  const y = box.y * 0.9;
  const w = box.w * 1.6;
  const h = box.h * 0.9;
  if (detection === "Smoke Detection")
    return (
      <g fill={LIGHT} opacity="0.4">
        <ellipse cx={x + w * 0.3} cy={y + h * 0.65} rx={w * 0.28} ry={h * 0.3} />
        <ellipse cx={x + w * 0.55} cy={y + h * 0.45} rx={w * 0.3} ry={h * 0.34} />
        <ellipse cx={x + w * 0.75} cy={y + h * 0.62} rx={w * 0.22} ry={h * 0.26} />
      </g>
    );
  if (detection === "Fire Detection")
    return (
      <path
        fill="#f1e6c8"
        opacity="0.9"
        d={`M${x + w / 2} ${y} C${x + w * 0.95} ${y + h * 0.35} ${x + w} ${y + h * 0.7} ${x + w / 2} ${y + h} C${x} ${y + h * 0.7} ${x + w * 0.05} ${y + h * 0.35} ${x + w / 2} ${y}Z`}
      />
    );
  return (
    <g fill={LIGHT} opacity="0.88">
      <circle cx={x + w / 2} cy={y + w * 0.34} r={w * 0.26} />
      <rect x={x + w * 0.1} y={y + w * 0.66} width={w * 0.8} height={h - w * 0.66} rx={w * 0.2} />
    </g>
  );
}

export function CameraScene({ scene, detection, box }: { scene: Scene; detection: DetectionType | null; box: Box }) {
  return (
    <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
      <Background scene={scene} />
      {detection && <Subject detection={detection} box={box} />}
    </svg>
  );
}
