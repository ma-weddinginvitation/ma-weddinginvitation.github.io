import { multifoilArch } from './Ornaments'

// An original evening scene of a grand hall below the Courtallam hills. This is a
// decorative illustration, not a depiction of the actual building.

const HORIZON = 408
const ARCADE_X = [84, 150, 216, 520, 586, 652]

const CENTRE_ARCH = multifoilArch(322, 478, 268, 176, HORIZON, 5)
const CENTRE_LINE = multifoilArch(332, 468, 272, 192, HORIZON, 5)
const DOOR_TOP = 268
const DOOR_ARCH = multifoilArch(354, 446, 302, DOOR_TOP, HORIZON, 3)
const DOOR_PANELS = [316, 354].flatMap((y) => [
  [362, y],
  [408, y],
])

function Lamp({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="17" fill="url(#vn-lamp-glow)" />
      <path d={`M${x} ${y - 26}V${y - 5}`} stroke="#3a0a14" strokeWidth=".9" />
      <path d={`M${x - 3.5} ${y - 5}H${x + 3.5}L${x + 2.2} ${y + 5}Q${x} ${y + 8} ${x - 2.2} ${y + 5}Z`} fill="#ffe2a0" />
    </g>
  )
}

function Dome({ cx, base, w, h }) {
  const hw = w / 2
  return (
    <g>
      <path
        d={`M${cx - hw} ${base}C${cx - hw - w * 0.1} ${base - h * 0.45} ${cx - hw * 0.5} ${base - h * 0.72} ${cx} ${base - h}C${cx + hw * 0.5} ${base - h * 0.72} ${cx + hw + w * 0.1} ${base - h * 0.45} ${cx + hw} ${base}Z`}
        fill="url(#vn-dome)"
      />
      <path d={`M${cx} ${base - h}V${base - h - h * 0.22}`} stroke="#d0a94f" strokeWidth={Math.max(1, w * 0.016)} />
      <circle cx={cx} cy={base - h - h * 0.12} r={Math.max(1.3, w * 0.022)} fill="#ecd9a4" />
    </g>
  )
}

function Tower({ cx }) {
  return (
    <g>
      <rect x={cx - 16} y="190" width="32" height={HORIZON - 190} fill="url(#vn-wall)" />
      <path d={`M${cx - 22} 190H${cx + 22}L${cx + 17} 182H${cx - 17}Z`} fill="#4a0b18" />
      <path d={multifoilArch(cx - 8, cx + 8, 260, 240, 300, 2)} fill="#ffc979" fillOpacity=".78" />
      <Dome cx={cx} base={182} w={38} h={48} />
    </g>
  )
}

function Palace() {
  return (
    <g>
      <Tower cx={62} />
      <Tower cx={738} />

      {/* Long wings of the hall */}
      <rect x="62" y="252" width="676" height={HORIZON - 252} fill="url(#vn-wall)" />
      <rect x="56" y="244" width="688" height="8" fill="#4a0b18" />
      <path d="M56 252H744" stroke="#d0a94f" strokeOpacity=".65" strokeWidth=".9" />
      {ARCADE_X.map((x) => (
        <g key={x}>
          <path d={`${multifoilArch(x, x + 50, 318, 278, HORIZON, 3)}Z`} fill="url(#vn-arch-light)" />
          <path d={multifoilArch(x, x + 50, 318, 278, HORIZON, 3)} fill="none" stroke="#d0a94f" strokeOpacity=".75" strokeWidth=".9" />
        </g>
      ))}

      {/* Central gateway */}
      <Dome cx={400} base={144} w={132} h={94} />
      <rect x="350" y="138" width="100" height="12" fill="#4a0b18" />
      <Dome cx={282} base={158} w={36} h={36} />
      <Dome cx={518} base={158} w={36} h={36} />
      <rect x="264" y="150" width="272" height={HORIZON - 150} fill="url(#vn-wall)" />
      <rect x="258" y="144" width="284" height="8" fill="#4a0b18" />
      <path d="M258 152H542" stroke="#d0a94f" strokeOpacity=".75" strokeWidth=".9" />
      <rect x="302" y="162" width="196" height={HORIZON - 162} fill="none" stroke="#d0a94f" strokeOpacity=".52" strokeWidth=".9" />
      <path d={`${CENTRE_ARCH}Z`} fill="url(#vn-gate-light)" />
      <path d={CENTRE_ARCH} fill="none" stroke="#ecd9a4" strokeWidth="1.5" />
      <path d={CENTRE_LINE} fill="none" stroke="#6e1226" strokeOpacity=".55" strokeWidth="1" />

      {/* Carved doors recessed within the gateway */}
      <path d={`${DOOR_ARCH}Z`} fill="url(#vn-door)" />
      <path d={DOOR_ARCH} fill="none" stroke="#ecd9a4" strokeOpacity=".85" strokeWidth="1.1" />
      <path d={`M400 ${DOOR_TOP}V${HORIZON}`} stroke="#d0a94f" strokeOpacity=".8" strokeWidth=".9" />
      {DOOR_PANELS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="30" height="30" fill="none" stroke="#d0a94f" strokeOpacity=".55" strokeWidth=".7" />
      ))}
      <path d="M400 192V236" stroke="#3a0a14" strokeWidth=".9" />
      <path d="M394 236H406L404 250Q400 255 396 250Z" fill="#ffe2a0" />
      <circle cx="400" cy="244" r="26" fill="url(#vn-lamp-glow)" />

      {/* Side niches */}
      {[272, 500].map((x) => (
        <g key={x}>
          <path d={`${multifoilArch(x, x + 28, 244, 214, 322, 2)}Z`} fill="url(#vn-arch-light)" />
          <path d={multifoilArch(x, x + 28, 244, 214, 322, 2)} fill="none" stroke="#d0a94f" strokeOpacity=".7" strokeWidth=".8" />
        </g>
      ))}
    </g>
  )
}

export default function VenueIllustration() {
  return (
    <svg className="venue-art" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="An illustrated palace hall glowing at dusk beneath the hills">
      <defs>
        <linearGradient id="vn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a0a22" />
          <stop offset="0.34" stopColor="#5b1230" />
          <stop offset="0.56" stopColor="#a63f3c" />
          <stop offset="0.68" stopColor="#e5a067" />
        </linearGradient>
        <radialGradient id="vn-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe6ac" stopOpacity=".95" />
          <stop offset="0.36" stopColor="#f6b871" stopOpacity=".42" />
          <stop offset="1" stopColor="#f6b871" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vn-hill-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b2a4a" />
          <stop offset="1" stopColor="#a35353" />
        </linearGradient>
        <linearGradient id="vn-hill-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b1230" />
          <stop offset="1" stopColor="#5e1d33" />
        </linearGradient>
        <linearGradient id="vn-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#761a30" />
          <stop offset="1" stopColor="#4e0d1d" />
        </linearGradient>
        <linearGradient id="vn-dome" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3f0a18" />
          <stop offset="0.5" stopColor="#8a2438" />
          <stop offset="1" stopColor="#d29660" />
        </linearGradient>
        <linearGradient id="vn-gate-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a2a24" />
          <stop offset="0.5" stopColor="#c67a3c" />
          <stop offset="1" stopColor="#efc47a" />
        </linearGradient>
        <linearGradient id="vn-door" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f0a18" />
          <stop offset="1" stopColor="#5e1224" />
        </linearGradient>
        <linearGradient id="vn-arch-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6d2422" />
          <stop offset="0.6" stopColor="#b2682f" />
          <stop offset="1" stopColor="#e6b56b" />
        </linearGradient>
        <linearGradient id="vn-water-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#20060f" stopOpacity=".15" />
          <stop offset="0.75" stopColor="#20060f" />
        </linearGradient>
        <linearGradient id="vn-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b2333" />
          <stop offset="1" stopColor="#20060f" />
        </linearGradient>
        <radialGradient id="vn-lamp-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffdf9a" stopOpacity=".85" />
          <stop offset="1" stopColor="#ffdf9a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="600" fill="url(#vn-sky)" />
      <circle cx="400" cy="268" r="270" fill="url(#vn-sun)" />

      <path d="M0 278C70 232 132 226 202 262C270 222 348 214 420 256C496 212 588 204 662 254C712 234 762 240 800 262V420H0Z" fill="url(#vn-hill-far)" />
      <path d="M0 330C80 288 160 300 226 330C300 298 360 310 410 334C484 300 584 290 650 326C706 306 760 308 800 326V420H0Z" fill="url(#vn-hill-near)" />

      <Palace />

      {/* Terrace and water */}
      <rect x="0" y={HORIZON} width="800" height="10" fill="#2c060c" />
      <path d={`M0 ${HORIZON}H800`} stroke="#d0a94f" strokeOpacity=".8" strokeWidth="1" />
      <rect x="0" y={HORIZON + 10} width="800" height={600 - HORIZON - 10} fill="url(#vn-water)" />
      <g transform={`translate(0 ${2 * HORIZON + 20}) scale(1 -1)`} opacity=".34">
        <Palace />
      </g>
      <rect x="0" y={HORIZON + 10} width="800" height={600 - HORIZON - 10} fill="url(#vn-water-fade)" />
      <path
        d="M340 442H460M300 462H500M352 484H448M230 500H330M470 508H580M366 526H434M120 448H210M590 448H690"
        stroke="#ffd38a"
        strokeOpacity=".3"
        strokeWidth="1"
      />

      {/* Festival lamps strung across the top of the gateway */}
      {[276, 306, 340, 372, 428, 460, 494, 524].map((x, i) => (
        <Lamp key={x} x={x} y={i % 2 ? 190 : 196} />
      ))}
    </svg>
  )
}
