// Original gold ornament artwork, drawn as inline SVG so it stays razor sharp on
// every screen and adds almost nothing to the download.

const ROSETTE_PETAL = 'M0 0C5-5 6-13 0-20C-6-13-5-5 0 0Z'
const LEAF = 'M0 0C8-10 20-9 28 0C20 9 8 10 0 0Z'

/** Shared gradients. Rendered once at the app root, referenced everywhere by id. */
export function GoldDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="gold-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9a7229" />
          <stop offset="0.3" stopColor="#e0c172" />
          <stop offset="0.52" stopColor="#f8eab8" />
          <stop offset="0.74" stopColor="#c99f49" />
          <stop offset="1" stopColor="#8d6722" />
        </linearGradient>
        <radialGradient id="seal-wax" cx="0.38" cy="0.32" r="0.8">
          <stop offset="0" stopColor="#f7e6ae" />
          <stop offset="0.34" stopColor="#d9b562" />
          <stop offset="0.7" stopColor="#a67c2e" />
          <stop offset="1" stopColor="#6c4b14" />
        </radialGradient>
        <radialGradient id="seal-well" cx="0.6" cy="0.68" r="0.8">
          <stop offset="0" stopColor="#ecd18b" />
          <stop offset="0.55" stopColor="#bd9440" />
          <stop offset="1" stopColor="#7f5b1b" />
        </radialGradient>
      </defs>
    </svg>
  )
}

/** Ornamental separator: tapered rules either side of a small rosette. */
export function Divider({ className = '' }) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <span className="divider__line" />
      <svg viewBox="-32 -13 64 26" fill="currentColor">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d="M0-3C2-5 2.4-8 0-11C-2.4-8-2-5 0-3Z" transform={`rotate(${a})`} />
        ))}
        <circle r="1.7" />
        <path d="M14 0C18-3.4 22-3.4 26 0C22 3.4 18 3.4 14 0ZM-14 0C-18-3.4-22-3.4-26 0C-22 3.4-18 3.4-14 0Z" />
        <circle cx="30" r="1.1" />
        <circle cx="-30" r="1.1" />
      </svg>
      <span className="divider__line" />
    </div>
  )
}

/** One half of the corner flourish; mirrored across the diagonal to form the whole. */
function CornerHalf() {
  return (
    <g>
      <path d="M26 30C50 15 82 17 98 33C108 44 100 58 88 54C78 51 80 38 90 40" fill="none" strokeWidth="1.2" />
      <path d="M46 24C60 33 62 45 54 54C49 60 40 56 43 49" fill="none" strokeWidth="1" />
      <path d="M90 28C100 22 112 21 124 24" fill="none" strokeWidth="1" />
      <path d={LEAF} transform="translate(60 21) rotate(-14) scale(.8)" fill="currentColor" stroke="none" />
      <path d={LEAF} transform="translate(68 37) rotate(40) scale(.6)" fill="currentColor" stroke="none" opacity=".75" />
      <path d={LEAF} transform="translate(104 25) rotate(-8) scale(.68)" fill="currentColor" stroke="none" />
      <circle cx="90" cy="46" r="2.1" fill="currentColor" stroke="none" />
      <circle cx="50" cy="50" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="130" cy="25" r="1.4" fill="currentColor" stroke="none" />
    </g>
  )
}

/** Filigree for one card corner. Orientation is set by the .corner--* classes. */
export function Corner({ position }) {
  return (
    <svg className={`corner corner--${position}`} viewBox="0 0 140 140" stroke="currentColor" aria-hidden="true">
      <CornerHalf />
      <g transform="matrix(0 1 1 0 0 0)">
        <CornerHalf />
      </g>
      <g transform="translate(26 26)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d={ROSETTE_PETAL} transform={`rotate(${a}) scale(.62)`} fill="currentColor" stroke="none" />
        ))}
        <circle r="3" fill="#fbf6e9" stroke="none" />
        <circle r="1.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}

export function Corners() {
  return ['tl', 'tr', 'bl', 'br'].map((p) => <Corner key={p} position={p} />)
}

const ring = (n) => Array.from({ length: n }, (_, i) => (360 / n) * i)

const MANDALA_RINGS = [
  { base: 22, len: 26, w: 9, n: 8 },
  { base: 54, len: 30, w: 8, n: 16 },
  { base: 98, len: 34, w: 9, n: 24 },
  { base: 146, len: 34, w: 7, n: 32 },
]

/** Subtle line-art medallion built from repeated petal rings. */
export function Mandala({ className = '', style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="-200 -200 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      aria-hidden="true"
    >
      {MANDALA_RINGS.map(({ base, len, w, n }) => {
        const tip = base + len
        const petal = `M0 ${-base}C${w} ${-base - len * 0.35} ${w * 0.7} ${-base - len * 0.8} 0 ${-tip}C${-w * 0.7} ${-base - len * 0.8} ${-w} ${-base - len * 0.35} 0 ${-base}Z`
        const offset = 180 / n
        return (
          <g key={base}>
            <circle r={base - 3} />
            {ring(n).map((a) => (
              <path key={a} d={petal} transform={`rotate(${a})`} />
            ))}
            {ring(n).map((a) => (
              <circle key={a} cy={-tip + 4} r="1.3" fill="currentColor" stroke="none" transform={`rotate(${a + offset})`} />
            ))}
          </g>
        )
      })}
      <circle r="183" />
      <circle r="192" strokeDasharray="1 5" strokeLinecap="round" strokeWidth="1.6" />
      <circle r="197" />
    </svg>
  )
}

/** Layered gold blossom in an engraved style. Centred on its own origin. */
export function Blossom({ x = 0, y = 0, size = 1, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size})`}>
      {ring(10).map((a) => (
        <path
          key={a}
          d="M0-6C10-13 11-27 0-36C-11-27-10-13 0-6Z"
          transform={`rotate(${a})`}
          fill="url(#gold-fill)"
          stroke="#6f4f15"
          strokeWidth=".55"
        />
      ))}
      {ring(8).map((a) => (
        <path
          key={a}
          d="M0-3C7-9 7.5-18 0-25C-7.5-18-7-9 0-3Z"
          transform={`rotate(${a + 22})`}
          fill="url(#gold-fill)"
          stroke="#6f4f15"
          strokeWidth=".5"
        />
      ))}
      {ring(6).map((a) => (
        <path
          key={a}
          d="M0-2C4-5 4.5-10 0-14C-4.5-10-4-5 0-2Z"
          transform={`rotate(${a + 10})`}
          fill="#f8eab8"
          stroke="#7d5a1b"
          strokeWidth=".45"
        />
      ))}
      <circle r="3.6" fill="#8d6722" />
      {ring(6).map((a) => (
        <circle key={a} cy="-2" r=".7" fill="#f8eab8" transform={`rotate(${a})`} />
      ))}
    </g>
  )
}

const SPRAY_LEAVES = [
  [36, 150, -48, 1.05],
  [46, 147, 34, 0.9],
  [92, 132, -62, 1.05],
  [130, 112, 30, 1.2],
  [146, 103, -74, 0.95],
  [214, 87, 36, 1.2],
  [204, 87, -54, 1.2],
  [282, 72, -60, 0.95],
  [292, 66, 18, 1.05],
]

/** A flowering branch. Use `flip` to mirror it for symmetrical arrangements. */
export function FloralSpray({ className = '', style, flip = false }) {
  return (
    <svg
      className={className}
      style={{ ...style, transform: flip ? 'scaleX(-1)' : undefined }}
      viewBox="0 0 330 180"
      aria-hidden="true"
    >
      <path
        d="M6 170C60 158 118 118 172 100C218 86 262 92 318 58"
        fill="none"
        stroke="#9a7229"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M92 132C100 118 104 104 102 92M214 92C224 106 240 116 258 120" fill="none" stroke="#9a7229" strokeWidth="1.1" />
      {SPRAY_LEAVES.map(([x, y, r, s]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
          <path d={LEAF} fill="url(#gold-fill)" stroke="#6f4f15" strokeWidth=".55" />
          <path d="M1 0H25" stroke="#6f4f15" strokeWidth=".45" fill="none" />
        </g>
      ))}
      <Blossom x={172} y={100} size={0.95} />
      <Blossom x={102} y={84} size={0.5} rotate={14} />
      <Blossom x={262} y={124} size={0.52} rotate={30} />
      <Blossom x={320} y={54} size={0.28} />
    </svg>
  )
}

/* --- Multifoil (cusped) arches, computed so that every size stays in proportion --- */

function archHalfPoints(x0, cx, spring, top, n) {
  const pts = []
  const ctrlY = top + (spring - top) * 0.26
  for (let i = 0; i <= n; i += 1) {
    const t = i / n
    const u = 1 - t
    pts.push([u * u * x0 + 2 * u * t * x0 + t * t * cx, u * u * spring + 2 * u * t * ctrlY + t * t * top])
  }
  return pts
}

/** Plain pointed arch outline. Open at the base, so it reads as a doorway. */
export function pointedArch(x0, x1, spring, top, bottom) {
  const cx = (x0 + x1) / 2
  const c = top + (spring - top) * 0.26
  return `M${x0} ${bottom}L${x0} ${spring}Q${x0} ${c} ${cx} ${top}Q${x1} ${c} ${x1} ${spring}L${x1} ${bottom}`
}

/** Scalloped arch: each pair of neighbouring points is joined by an outward lobe. */
export function multifoilArch(x0, x1, spring, top, bottom, lobesPerSide = 5) {
  const cx = (x0 + x1) / 2
  const left = archHalfPoints(x0, cx, spring, top, lobesPerSide)
  const right = left.slice(0, -1).reverse().map(([x, y]) => [x1 - (x - x0), y])
  const pts = [...left, ...right]
  let d = `M${x0} ${bottom}L${x0} ${spring}`
  for (let i = 1; i < pts.length; i += 1) {
    const [px, py] = pts[i - 1]
    const [x, y] = pts[i]
    const r = Math.hypot(x - px, y - py) * 0.56
    d += `A${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`
  }
  return `${d}L${x1} ${bottom}`
}

/** The M & A wax seal in antique gold. */
const SEAL_EDGE = (() => {
  const steps = 72
  let d = ''
  for (let i = 0; i < steps; i += 1) {
    const a = (i / steps) * Math.PI * 2
    const r = 92 + 3.4 * Math.sin(a * 5 + 0.7) + 2.2 * Math.sin(a * 9 + 2.1) + 1.4 * Math.sin(a * 17)
    d += `${i ? 'L' : 'M'}${(100 + r * Math.cos(a)).toFixed(1)} ${(100 + r * Math.sin(a)).toFixed(1)}`
  }
  return `${d}Z`
})()

export function SealArt() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <path d={SEAL_EDGE} fill="url(#seal-wax)" />
      <path d={SEAL_EDGE} fill="none" stroke="#fff3c6" strokeOpacity=".5" strokeWidth="1" />
      <circle cx="100" cy="100" r="71" fill="url(#seal-well)" stroke="#6c4b14" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="74.5" fill="none" stroke="#fff3c6" strokeOpacity=".55" strokeWidth="1" />
      <circle cx="100" cy="100" r="64" fill="none" stroke="#6c4b14" strokeOpacity=".7" strokeWidth=".9" />
      <g transform="translate(100 100)">
        {ring(36).map((a) => (
          <circle key={a} cy="-81.5" r="1.7" fill="#7d5a1b" transform={`rotate(${a})`} />
        ))}
        {ring(4).map((a) => (
          <g key={a} transform={`rotate(${a + 45}) translate(0 -53)`}>
            <path d="M0 5C3.4 1 3.4-3 0-7C-3.4-3-3.4 1 0 5Z" fill="#6c4b14" />
          </g>
        ))}
      </g>
      <g fontFamily="Cinzel, 'Times New Roman', serif" fontWeight="600" textAnchor="middle">
        <g fill="#fff3c6" fillOpacity=".65" transform="translate(-.9 -.9)">
          <text x="70" y="119" fontSize="52">M</text>
          <text x="133" y="119" fontSize="52">A</text>
        </g>
        <g fill="#5a3d0d">
          <text x="70" y="119" fontSize="52">M</text>
          <text x="133" y="119" fontSize="52">A</text>
          <text x="101" y="112" fontSize="19" fontWeight="400">&amp;</text>
        </g>
      </g>
    </svg>
  )
}
