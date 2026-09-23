import { useEffect, useRef, useState } from 'react'
import type { Artwork } from './artwork-data'

function Signal({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".38" opacity=".9">
      {Array.from({ length: 34 }, (_, index) => <circle key={index} cx="50" cy="50" r={8 + index * 1.05} strokeDasharray={(3 + index % 5) + ' ' + (2 + index % 3)} transform={'rotate(' + index * 7 + ' 50 50)'} />)}
    </g>
    <circle cx="50" cy="50" r="6.5" fill={artwork.accent} />
    <circle cx="50" cy="50" r="2" fill={artwork.surface} />
  </svg>
}

function Orbit({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".55" opacity=".86">
      {[13, 21, 30, 39].map((r, index) => <ellipse key={r} cx="50" cy="50" rx={r} ry={r * .56} transform={'rotate(' + (index * 27 - 18) + ' 50 50)'} />)}
    </g>
    <line x1="13" y1="57" x2="87" y2="38" stroke={artwork.accent} strokeWidth="1.2" />
    <circle cx="67" cy="43" r="3.2" fill={artwork.accent} />
    <circle cx="31" cy="52" r="1.2" fill={artwork.ink} />
  </svg>
}

function Fold({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <path d="M18 77 38 20 56 48 82 17 72 80 46 65Z" fill={artwork.ink} opacity=".9" />
    <path d="M38 20 56 48 46 65Z" fill={artwork.accent} />
    <path d="M56 48 82 17 72 80 46 65Z" fill={artwork.surface} opacity=".44" />
    <path d="M18 77 46 65 72 80" fill="none" stroke={artwork.ink} strokeWidth=".8" />
  </svg>
}

function Lattice({ artwork }: { artwork: Artwork }) {
  const lines = Array.from({ length: 15 }, (_, i) => 10 + i * 5.8)
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".34" opacity=".74">
      {lines.map((value, i) => <path key={'h' + i} d={'M6 ' + value + ' C32 ' + (value - 8 * Math.sin(i)) + ', 66 ' + (value + 7 * Math.cos(i)) + ', 94 ' + value} />)}
      {lines.map((value, i) => <path key={'v' + i} d={'M' + value + ' 6 C' + (value + 7 * Math.cos(i)) + ' 30, ' + (value - 8 * Math.sin(i)) + ' 68, ' + value + ' 94'} />)}
    </g>
    <circle cx="51" cy="49" r="4" fill={artwork.accent} />
  </svg>
}

function Echo({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".7">
      {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx="50" cy="50" rx={36 - i * 3.5} ry={30 - i * 2.6} transform={'rotate(' + (i * 5 - 18) + ' 50 50)'} opacity={1 - i * .065} />)}
    </g>
    <circle cx="53" cy="48" r="4.8" fill={artwork.accent} />
  </svg>
}

function Ribbon({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <path d="M15 70 C29 18 64 15 80 42 C92 64 67 83 47 69 C32 58 42 37 58 40 C74 43 78 62 65 70" fill="none" stroke={artwork.ink} strokeWidth="7" strokeLinecap="round" />
    <path d="M15 70 C29 18 64 15 80 42" fill="none" stroke={artwork.accent} strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="15" cy="70" r="2.4" fill={artwork.accent} />
  </svg>
}

function Halo({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="40" cy="50" r="26" fill="none" stroke={artwork.ink} strokeWidth="10" opacity=".94" />
    <circle cx="61" cy="50" r="26" fill="none" stroke={artwork.accent} strokeWidth="10" opacity=".8" />
    <circle cx="50.5" cy="50" r="10" fill={artwork.surface} />
  </svg>
}

function Field({ artwork }: { artwork: Artwork }) {
  const marks = Array.from({ length: 121 }, (_, i) => {
    const col = i % 11
    const row = Math.floor(i / 11)
    const x = 10 + col * 8
    const y = 10 + row * 8
    const angle = Math.atan2(50 - y, 50 - x) * 180 / Math.PI + 90
    return { x, y, angle, key: i }
  })
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g stroke={artwork.ink} strokeWidth=".65" strokeLinecap="round" opacity=".78">
      {marks.map(({ x, y, angle, key }) => <line key={key} x1={x - 1.7} y1={y} x2={x + 1.7} y2={y} transform={'rotate(' + angle + ' ' + x + ' ' + y + ')'} />)}
    </g>
    <circle cx="50" cy="50" r="3.4" fill={artwork.accent} />
  </svg>
}

function Petal({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g transform="translate(50 50)">
      {Array.from({ length: 18 }, (_, i) => <ellipse key={i} cx="0" cy="-21" rx="7.5" ry="23" fill="none" stroke={i % 3 === 0 ? artwork.accent : artwork.ink} strokeWidth={i % 3 === 0 ? 1.1 : .45} opacity=".84" transform={'rotate(' + i * 20 + ')'} />)}
    </g>
    <circle cx="50" cy="50" r="5.5" fill={artwork.surface} stroke={artwork.ink} strokeWidth=".6" />
  </svg>
}

function Shift({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".5" opacity=".88">
      {Array.from({ length: 18 }, (_, i) => <path key={i} d={'M3 ' + (12 + i * 4.5) + ' C28 ' + (2 + i * 5.2) + ', 35 ' + (28 + i * 2.2) + ', 55 ' + (14 + i * 4.1) + ' S82 ' + (7 + i * 5.4) + ', 97 ' + (17 + i * 4)} />)}
    </g>
    <path d="M4 52 C31 29 41 72 61 48 S84 38 97 53" fill="none" stroke={artwork.accent} strokeWidth="2.1" />
  </svg>
}

function Arc({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" strokeLinecap="round">
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={'M' + (15 + i * 2) + ' ' + (78 - i * 1.5) + ' Q' + (50 + i * 1.2) + ' ' + (8 + i * 1.8) + ' ' + (86 - i * 1.2) + ' ' + (72 - i * .9)} stroke={i === 4 ? artwork.accent : artwork.ink} strokeWidth={i === 4 ? 1.8 : .55} opacity={.95 - i * .035} />)}
    </g>
    <circle cx="61" cy="24" r="2.7" fill={artwork.accent} />
  </svg>
}

function Nodes({ artwork }: { artwork: Artwork }) {
  const nodes = [[18,28],[28,17],[41,27],[54,15],[69,25],[82,20],[15,51],[31,46],[46,55],[62,44],[79,50],[89,39],[21,73],[37,82],[51,69],[66,79],[83,71]]
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g stroke={artwork.ink} strokeWidth=".42" opacity=".54">
      {nodes.slice(0, -1).map(([x, y], i) => {
        const [nx, ny] = nodes[(i * 5 + 4) % nodes.length]
        return <line key={i} x1={x} y1={y} x2={nx} y2={ny} />
      })}
    </g>
    {nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 3.2 : 1.4} fill={i % 5 === 0 ? artwork.accent : artwork.ink} />)}
  </svg>
}


function Moire({ artwork }: { artwork: Artwork }) {
  const lines = Array.from({ length: 34 }, (_, i) => -18 + i * 4.1)
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".38" opacity=".72">
      {lines.map((x, i) => <path key={'a' + i} d={'M' + x + ' 5 Q50 50 ' + (x + 36) + ' 95'} />)}
      {lines.map((x, i) => <path key={'b' + i} d={'M' + (x + 12) + ' 4 Q54 54 ' + (x + 26) + ' 96'} transform="rotate(17 50 50)" opacity=".7" />)}
    </g>
    <line x1="18" y1="74" x2="83" y2="27" stroke={artwork.accent} strokeWidth="1.3" />
  </svg>
}

function Strata({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".72" strokeLinejoin="round">
      {Array.from({ length: 12 }, (_, i) => {
        const y = 18 + i * 5.7
        return <path key={i} d={'M10 ' + y + ' C23 ' + (y - 8 + i % 3) + ', 38 ' + (y + 5) + ', 49 ' + (y - 2) + ' S73 ' + (y + 7 - i % 4) + ', 91 ' + (y - 3)} opacity={.92 - i * .035} />
      })}
    </g>
    <path d="M22 65 C39 52 52 58 78 39" fill="none" stroke={artwork.accent} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
}

function Vortex({ artwork }: { artwork: Artwork }) {
  const marks = Array.from({ length: 72 }, (_, i) => {
    const t = i / 72 * Math.PI * 7
    const radius = 7 + i * .48
    return { x: 50 + Math.cos(t) * radius, y: 50 + Math.sin(t) * radius, angle: t * 180 / Math.PI + 90 }
  })
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g stroke={artwork.ink} strokeWidth=".7" strokeLinecap="round" opacity=".8">
      {marks.map(({ x, y, angle }, i) => <line key={i} x1={x - 2.6} y1={y} x2={x + 2.6} y2={y} transform={'rotate(' + angle + ' ' + x + ' ' + y + ')'} />)}
    </g>
    <circle cx="50" cy="50" r="5" fill={artwork.accent} /><circle cx="50" cy="50" r="1.6" fill={artwork.surface} />
  </svg>
}

function Prism({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <polygon points="18,76 39,18 82,26 71,81" fill="none" stroke={artwork.ink} strokeWidth=".9" />
    <polygon points="39,18 53,48 18,76" fill={artwork.ink} opacity=".9" />
    <polygon points="39,18 82,26 53,48" fill={artwork.accent} opacity=".92" />
    <polygon points="53,48 82,26 71,81" fill={artwork.ink} opacity=".18" />
    <polygon points="18,76 53,48 71,81" fill={artwork.ink} opacity=".48" />
    <line x1="53" y1="48" x2="89" y2="60" stroke={artwork.accent} strokeWidth="1.6" />
  </svg>
}

function Weave({ artwork }: { artwork: Artwork }) {
  const positions = Array.from({ length: 13 }, (_, i) => 14 + i * 6)
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" strokeLinecap="round">
      {positions.map((p, i) => <path key={'h' + i} d={'M8 ' + p + ' C28 ' + (p + (i % 2 ? 3 : -3)) + ', 72 ' + (p + (i % 2 ? -3 : 3)) + ', 92 ' + p} stroke={i === 6 ? artwork.accent : artwork.ink} strokeWidth={i === 6 ? 1.5 : .55} opacity=".82" />)}
      {positions.map((p, i) => <path key={'v' + i} d={'M' + p + ' 8 C' + (p + (i % 2 ? -3 : 3)) + ' 30, ' + (p + (i % 2 ? 3 : -3)) + ' 70, ' + p + ' 92'} stroke={artwork.ink} strokeWidth=".55" opacity=".68" />)}
    </g>
  </svg>
}

function Eclipse({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="42" cy="50" r="28" fill="none" stroke={artwork.ink} strokeWidth="1.2" />
    <circle cx="58" cy="50" r="28" fill="none" stroke={artwork.accent} strokeWidth="1.2" />
    <circle cx="42" cy="50" r="19" fill={artwork.ink} opacity=".88" />
    <circle cx="58" cy="50" r="19" fill={artwork.surface} stroke={artwork.accent} strokeWidth=".6" />
    <line x1="13" y1="50" x2="87" y2="50" stroke={artwork.ink} strokeWidth=".35" opacity=".55" />
    <line x1="50" y1="13" x2="50" y2="87" stroke={artwork.ink} strokeWidth=".35" opacity=".55" />
  </svg>
}

function Flux({ artwork }: { artwork: Artwork }) {
  const streams = Array.from({ length: 22 }, (_, i) => 8 + i * 4)
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".42" opacity=".75">
      {streams.map((y, i) => <path key={i} d={'M5 ' + y + ' C26 ' + (y - 8 * Math.sin(i * .7)) + ', 39 ' + (y + 10 * Math.cos(i * .4)) + ', 55 ' + (y - 4) + ' S79 ' + (y + 8 * Math.sin(i * .5)) + ', 95 ' + y} />)}
    </g>
    {[24,39,57,72].map((x, i) => <circle key={x} cx={x} cy={38 + i * 8} r={i === 2 ? 3.6 : 1.5} fill={i === 2 ? artwork.accent : artwork.ink} />)}
  </svg>
}

function Tiles({ artwork }: { artwork: Artwork }) {
  const cells = Array.from({ length: 49 }, (_, i) => {
    const col = i % 7, row = Math.floor(i / 7), fault = col > 3 && row > 2 ? 4 : 0
    return { x: 14 + col * 12 + fault, y: 14 + row * 12, hot: col === 4 && row >= 2 }
  })
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" strokeWidth=".6">
      {cells.map(({ x, y, hot }, i) => <rect key={i} x={x - 4.3} y={y - 4.3} width="8.6" height="8.6" transform={'rotate(45 ' + x + ' ' + y + ')'} stroke={hot ? artwork.accent : artwork.ink} opacity={hot ? 1 : .72} />)}
    </g>
    <path d="M52 8 56 92" stroke={artwork.accent} strokeWidth="1" strokeDasharray="2 3" />
  </svg>
}

function Contour({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".55">
      {Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx={48 + Math.sin(i * .7) * 4} cy={51 + Math.cos(i * .8) * 3} rx={39 - i * 2.7} ry={31 - i * 2} transform={'rotate(' + (i * 3 - 14) + ' 50 50)'} opacity={.9 - i * .035} />)}
    </g>
    <path d="M52 26 58 38 53 49 62 60 55 74" fill="none" stroke={artwork.accent} strokeWidth="1.7" strokeLinecap="round" />
  </svg>
}

function Constellation({ artwork }: { artwork: Artwork }) {
  const stars = [[14,25],[28,18],[42,31],[60,15],[78,29],[86,49],[70,61],[82,78],[54,82],[37,68],[18,76],[24,49],[49,50]]
  const edges = [[0,2],[1,2],[2,6],[3,4],[4,5],[5,6],[6,8],[7,8],[8,9],[9,10],[10,11],[11,2],[2,12],[12,6]]
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g stroke={artwork.ink} strokeWidth=".4" opacity=".5">
      {edges.map(([a,b], i) => <line key={i} x1={stars[a][0]} y1={stars[a][1]} x2={stars[b][0]} y2={stars[b][1]} />)}
    </g>
    {stars.map(([x,y], i) => <circle key={i} cx={x} cy={y} r={i === 12 ? 3.3 : i % 4 === 0 ? 1.7 : .95} fill={i === 12 ? artwork.accent : artwork.ink} />)}
    <circle cx="49" cy="50" r="10" fill="none" stroke={artwork.accent} strokeWidth=".45" strokeDasharray="1.6 2.1" />
  </svg>
}

function Chamber({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" strokeLinejoin="round">
      {Array.from({ length: 9 }, (_, i) => {
        const inset = 8 + i * 4.6, skew = i * .7
        return <polygon key={i} points={(inset + skew) + ',' + inset + ' ' + (100 - inset) + ',' + (inset + skew) + ' ' + (100 - inset - skew) + ',' + (100 - inset) + ' ' + inset + ',' + (100 - inset - skew)} stroke={i === 5 ? artwork.accent : artwork.ink} strokeWidth={i === 5 ? 1.5 : .55} opacity={.95 - i * .055} />
      })}
    </g>
    <circle cx="50" cy="50" r="2.5" fill={artwork.accent} />
  </svg>
}

function Spiral({ artwork }: { artwork: Artwork }) {
  const points = Array.from({ length: 150 }, (_, i) => {
    const t = i / 149 * Math.PI * 7.5, r = 2 + i * .27
    return [50 + Math.cos(t) * r, 50 + Math.sin(t) * r]
  })
  const d = points.map(([x,y], i) => (i ? 'L' : 'M') + x.toFixed(2) + ' ' + y.toFixed(2)).join(' ')
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <path d={d} fill="none" stroke={artwork.ink} strokeWidth=".65" strokeLinecap="round" />
    <path d={d} fill="none" stroke={artwork.accent} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1 15" />
    <circle cx="50" cy="50" r="3" fill={artwork.accent} />
  </svg>
}


function Bands({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".72">
      {Array.from({ length: 25 }, (_, i) => {
        const y = 10 + i * 3.35
        const gap = 35 + Math.sin(i * .72) * 8
        return <path key={i} d={'M7 ' + y + ' H' + gap + ' M' + (gap + 12) + ' ' + y + ' H93'} opacity={.92 - (i % 5) * .06} />
      })}
    </g>
    <rect x="46" y="8" width="4" height="84" rx="2" fill={artwork.accent} />
  </svg>
}

function Spokes({ artwork }: { artwork: Artwork }) {
  const marks = Array.from({ length: 84 }, (_, i) => {
    const a = i / 84 * Math.PI * 2
    const inner = 13 + (i % 7) * 1.1
    const outer = 38 + Math.sin(i * 1.73) * 3.6
    return {
      x1: 50 + Math.cos(a) * inner,
      y1: 50 + Math.sin(a) * inner,
      x2: 50 + Math.cos(a) * outer,
      y2: 50 + Math.sin(a) * outer,
    }
  })
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g stroke={artwork.ink} strokeWidth=".55" strokeLinecap="round">
      {marks.map((m, i) => <line key={i} {...m} opacity={i % 4 === 0 ? .95 : .62} />)}
    </g>
    <circle cx="50" cy="50" r="8.5" fill="none" stroke={artwork.accent} strokeWidth="2.4" />
    <circle cx="50" cy="50" r="2.2" fill={artwork.ink} />
  </svg>
}

function Portals({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".72">
      {Array.from({ length: 10 }, (_, i) => {
        const inset = 8 + i * 3.7
        const offset = i * .85
        const x1 = inset + offset
        const x2 = 100 - inset
        const top = 13 + i * 3.1
        const bottom = 92 - i * 1.4
        return <path key={i} d={'M' + x1 + ' ' + bottom + ' V' + (top + 16) + ' Q' + x1 + ' ' + top + ' ' + ((x1 + x2) / 2) + ' ' + top + ' Q' + x2 + ' ' + top + ' ' + x2 + ' ' + (top + 16) + ' V' + bottom} opacity={.95 - i * .055} />
      })}
    </g>
    <path d="M52 28 V85" stroke={artwork.accent} strokeWidth="1.8" />
  </svg>
}

function Bubbles({ artwork }: { artwork: Artwork }) {
  const cells = Array.from({ length: 64 }, (_, i) => {
    const col = i % 8
    const row = Math.floor(i / 8)
    const x = 10 + col * 11.5
    const y = 10 + row * 11.5
    const d = Math.hypot(x - 61, y - 42)
    const r = 1.25 + Math.max(0, 16 - d) * .16 + ((col * 3 + row * 5) % 4) * .34
    return { x, y, r }
  })
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".52" opacity=".8">
      {cells.map((cell, i) => <circle key={i} cx={cell.x} cy={cell.y} r={cell.r} />)}
    </g>
    <circle cx="61" cy="42" r="7.2" fill={artwork.accent} opacity=".9" />
    <circle cx="61" cy="42" r="2.2" fill={artwork.surface} />
  </svg>
}

function Measure({ artwork }: { artwork: Artwork }) {
  const ticks = Array.from({ length: 31 }, (_, i) => 9 + i * 2.75)
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <line x1="8" y1="52" x2="92" y2="52" stroke={artwork.ink} strokeWidth=".8" />
    {ticks.map((x, i) => <line key={i} x1={x} y1={i % 5 === 0 ? 38 : 44} x2={x} y2={i % 5 === 0 ? 66 : 60} stroke={i === 17 ? artwork.accent : artwork.ink} strokeWidth={i === 17 ? 2 : .55} />)}
    <rect x="18" y="21" width="22" height="5" fill={artwork.ink} />
    <rect x="44" y="21" width="9" height="5" fill={artwork.accent} />
    <rect x="58" y="21" width="27" height="5" fill={artwork.ink} opacity=".35" />
    <circle cx="55.75" cy="52" r="4" fill={artwork.surface} stroke={artwork.accent} strokeWidth="1.3" />
  </svg>
}

function Shear({ artwork }: { artwork: Artwork }) {
  const lines = Array.from({ length: 14 }, (_, i) => 11 + i * 6)
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".48" opacity=".8">
      {lines.map((y, i) => <path key={'h' + i} d={'M8 ' + y + ' H34 L' + (43 + i * .5) + ' ' + y + ' H67 L' + (76 - i * .35) + ' ' + y + ' H92'} />)}
      {lines.map((x, i) => <path key={'v' + i} d={'M' + x + ' 8 V33 L' + (x + 7) + ' 43 V66 L' + (x - 4) + ' 76 V92'} />)}
    </g>
    <path d="M12 69 91 35" stroke={artwork.accent} strokeWidth="1.7" />
  </svg>
}

function Fossil({ artwork }: { artwork: Artwork }) {
  const loops = Array.from({ length: 12 }, (_, ring) => {
    const pts = Array.from({ length: 54 }, (_, i) => {
      const a = i / 54 * Math.PI * 2
      const radius = 8 + ring * 2.35 + Math.sin(a * 3 + ring * .8) * (1.2 + ring * .08) + Math.cos(a * 5 - ring) * .7
      return [50 + Math.cos(a) * radius * 1.15, 50 + Math.sin(a) * radius * .82]
    })
    return pts.map(([x,y], i) => (i ? 'L' : 'M') + x.toFixed(2) + ' ' + y.toFixed(2)).join(' ') + ' Z'
  })
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".46">
      {loops.map((d, i) => <path key={i} d={d} opacity={.9 - i * .045} />)}
    </g>
    <path d={loops[4]} fill="none" stroke={artwork.accent} strokeWidth="1.5" />
  </svg>
}

function Suns({ artwork }: { artwork: Artwork }) {
  const rays = Array.from({ length: 72 }, (_, i) => {
    const a = i / 72 * Math.PI * 2
    const r1 = 26 + (i % 3) * 1.1
    const r2 = 36 + (i % 5) * .75
    return {
      x1: 50 + Math.cos(a) * r1, y1: 50 + Math.sin(a) * r1,
      x2: 50 + Math.cos(a) * r2, y2: 50 + Math.sin(a) * r2,
    }
  })
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="21" fill={artwork.ink} />
    <g stroke={artwork.ink} strokeLinecap="round">
      {rays.map((r, i) => <line key={i} {...r} strokeWidth={i % 6 === 0 ? 1.2 : .55} />)}
    </g>
    <circle cx="62" cy="38" r="4.2" fill={artwork.accent} />
  </svg>
}

function Counterform({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <rect x="10" y="16" width="40" height="68" fill={artwork.ink} />
    <rect x="50" y="27" width="40" height="57" fill={artwork.ink} opacity=".58" />
    <circle cx="50" cy="50" r="19" fill={artwork.surface} />
    <rect x="44" y="13" width="12" height="74" fill={artwork.surface} />
    <circle cx="50" cy="50" r="7" fill={artwork.accent} />
  </svg>
}

function Columns({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" strokeLinecap="round">
      {Array.from({ length: 15 }, (_, i) => {
        const x = 12 + i * 5.5
        return <path key={i} d={'M' + x + ' 8 C' + (x + Math.sin(i * .8) * 8) + ' 30, ' + (x + Math.cos(i * .55) * 9) + ' 68, ' + x + ' 92'} stroke={i === 8 ? artwork.accent : artwork.ink} strokeWidth={i === 8 ? 1.6 : .62} opacity={i === 8 ? 1 : .76} />
      })}
    </g>
  </svg>
}

function Tension({ artwork }: { artwork: Artwork }) {
  const anchors = [[12,18],[34,11],[61,15],[88,27],[91,70],[68,89],[35,86],[10,72],[16,48]]
  const nodes = [[48,43],[58,58],[39,64]]
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g stroke={artwork.ink} strokeWidth=".52" opacity=".72">
      {anchors.map(([x,y], i) => {
        const [nx,ny] = nodes[i % nodes.length]
        return <line key={i} x1={x} y1={y} x2={nx} y2={ny} />
      })}
      <line x1="48" y1="43" x2="58" y2="58" />
      <line x1="58" y1="58" x2="39" y2="64" />
      <line x1="39" y1="64" x2="48" y2="43" />
    </g>
    {anchors.map(([x,y], i) => <circle key={i} cx={x} cy={y} r=".9" fill={artwork.ink} />)}
    {nodes.map(([x,y], i) => <circle key={i} cx={x} cy={y} r={i === 1 ? 5 : 3.2} fill={i === 1 ? artwork.accent : artwork.ink} />)}
  </svg>
}

function Recursive({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" strokeLinejoin="round">
      {Array.from({ length: 14 }, (_, i) => {
        const size = 76 - i * 4.2
        const x = 50 - size / 2 + i * .6
        const y = 50 - size / 2 - i * .25
        return <rect key={i} x={x} y={y} width={size} height={size} stroke={i === 7 ? artwork.accent : artwork.ink} strokeWidth={i === 7 ? 1.6 : .55} opacity={.95 - i * .045} transform={'rotate(' + (i * 2.7) + ' 50 50)'} />
      })}
    </g>
  </svg>
}

function Pulse({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" strokeLinecap="round">
      {Array.from({ length: 17 }, (_, i) => {
        const y = 12 + i * 4.75
        const amp = 2 + (i % 6) * .9
        return <path key={i} d={'M5 ' + y + ' H24 L29 ' + (y - amp) + ' L35 ' + (y + amp) + ' L42 ' + y + ' H56 L62 ' + (y - amp * .7) + ' L69 ' + (y + amp * .55) + ' L75 ' + y + ' H95'} stroke={i === 8 ? artwork.accent : artwork.ink} strokeWidth={i === 8 ? 1.65 : .5} opacity={i === 8 ? 1 : .72} />
      })}
    </g>
  </svg>
}

function Polar({ artwork }: { artwork: Artwork }) {
  const makeRose = (phase: number, radius: number) => {
    const pts = Array.from({ length: 220 }, (_, i) => {
      const t = i / 219 * Math.PI * 2
      const r = Math.cos(5 * t + phase) * radius
      return [50 + Math.cos(t) * r, 50 + Math.sin(t) * r]
    })
    return pts.map(([x,y], i) => (i ? 'L' : 'M') + x.toFixed(2) + ' ' + y.toFixed(2)).join(' ')
  }
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={makeRose(i * .07, 17 + i * 2.5)} fill="none" stroke={i === 4 ? artwork.accent : artwork.ink} strokeWidth={i === 4 ? 1.4 : .42} opacity={.9 - i * .04} />)}
    <circle cx="50" cy="50" r="2.3" fill={artwork.ink} />
  </svg>
}

function Slipstream({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".5" opacity=".76">
      {Array.from({ length: 21 }, (_, i) => {
        const y = 11 + i * 3.85
        return <path key={i} d={'M4 ' + y + ' C24 ' + (y + Math.sin(i * .4) * 3) + ', 33 ' + (50 + (y - 50) * .35) + ', 48 ' + (50 + (y - 50) * .18) + ' S69 ' + (y + Math.cos(i * .52) * 4) + ', 96 ' + y} />
      })}
    </g>
    <path d="M5 51 C31 51 37 50 50 50 S72 50 95 50" fill="none" stroke={artwork.accent} strokeWidth="2" />
  </svg>
}

function Axis({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g transform="translate(50 50)">
      {Array.from({ length: 24 }, (_, i) => <g key={i} transform={'rotate(' + i * 15 + ')'} opacity={.92 - (i % 6) * .06}>
        <line x1="-37" y1="0" x2="37" y2="0" stroke={i % 6 === 0 ? artwork.accent : artwork.ink} strokeWidth={i % 6 === 0 ? 1.25 : .45} />
        <circle cx="24" cy="0" r={i % 6 === 0 ? 1.7 : .7} fill={i % 6 === 0 ? artwork.accent : artwork.ink} />
      </g>)}
    </g>
    <rect x="39" y="39" width="22" height="22" fill={artwork.surface} stroke={artwork.ink} strokeWidth=".75" transform="rotate(45 50 50)" />
    <circle cx="50" cy="50" r="4.5" fill={artwork.accent} />
  </svg>
}


function AnimatedBreathe({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {Array.from({ length: 9 }, (_, i) => (
      <circle key={i} cx="50" cy="50" r={9 + i * 4} fill="none" stroke={i === 4 ? artwork.accent : artwork.ink} strokeWidth={i === 4 ? 1.5 : .55} opacity={.82 - i * .045}>
        <animate attributeName="r" values={(9 + i * 4) + ';' + (11.5 + i * 4.5) + ';' + (9 + i * 4)} dur={(4.8 + i * .16) + 's'} begin={(-i * .17) + 's'} repeatCount="indefinite" />
        <animate attributeName="opacity" values={(.82 - i * .045) + ';' + (.38 + i * .02) + ';' + (.82 - i * .045)} dur={(4.8 + i * .16) + 's'} begin={(-i * .17) + 's'} repeatCount="indefinite" />
      </circle>
    ))}
    <circle cx="50" cy="50" r="4" fill={artwork.accent}>
      <animate attributeName="r" values="3.6;5;3.6" dur="5.2s" repeatCount="indefinite" />
    </circle>
  </svg>
}

function AnimatedOrbit({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".5" opacity=".7">
      <ellipse cx="50" cy="50" rx="37" ry="18" transform="rotate(-14 50 50)" />
      <ellipse cx="50" cy="50" rx="31" ry="27" transform="rotate(31 50 50)" />
      <ellipse cx="50" cy="50" rx="23" ry="38" transform="rotate(-38 50 50)" />
    </g>
    <circle r="2.7" fill={artwork.accent}>
      <animateMotion path="M13 50 C21 24 72 20 87 50 C72 80 21 76 13 50Z" dur="7.4s" repeatCount="indefinite" />
    </circle>
    <circle r="1.7" fill={artwork.ink}>
      <animateMotion path="M23 26 C59 8 88 46 75 74 C40 93 9 61 23 26Z" dur="9.6s" begin="-3.1s" repeatCount="indefinite" />
    </circle>
    <circle r="1.25" fill={artwork.accent}>
      <animateMotion path="M50 12 C74 18 82 72 50 88 C18 72 26 18 50 12Z" dur="5.9s" begin="-1.7s" repeatCount="indefinite" />
    </circle>
  </svg>
}

function AnimatedLoom({ artwork }: { artwork: Artwork }) {
  const lines = Array.from({ length: 18 }, (_, i) => 8 + i * 5)
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".38" opacity=".7">
      <g>
        {lines.map((x, i) => <path key={i} d={'M' + x + ' 3 C' + (x - 9) + ' 34 ' + (x + 9) + ' 66 ' + x + ' 97'} />)}
        <animateTransform attributeName="transform" type="translate" values="-4 0;4 0;-4 0" dur="7.8s" repeatCount="indefinite" />
      </g>
      <g opacity=".72">
        {lines.map((y, i) => <path key={i} d={'M3 ' + y + ' C34 ' + (y + 8) + ' 66 ' + (y - 8) + ' 97 ' + y} />)}
        <animateTransform attributeName="transform" type="translate" values="0 4;0 -4;0 4" dur="9.2s" repeatCount="indefinite" />
      </g>
    </g>
    <circle cx="50" cy="50" r="4.2" fill={artwork.accent} opacity=".9">
      <animate attributeName="opacity" values=".45;1;.45" dur="4.5s" repeatCount="indefinite" />
    </circle>
  </svg>
}

function AnimatedPendulum({ artwork }: { artwork: Artwork }) {
  const xs = Array.from({ length: 13 }, (_, i) => 14 + i * 6)
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <line x1="9" y1="18" x2="91" y2="18" stroke={artwork.ink} strokeWidth=".7" />
    {xs.map((x, i) => (
      <g key={i}>
        <line x1={x} y1="18" x2={x} y2={61 + (i % 4) * 3} stroke={i === 6 ? artwork.accent : artwork.ink} strokeWidth={i === 6 ? 1.3 : .55} />
        <circle cx={x} cy={64 + (i % 4) * 3} r={i === 6 ? 3.7 : 2.1} fill={i === 6 ? artwork.accent : artwork.ink} />
        <animateTransform attributeName="transform" type="rotate" values={'-' + (5 + i % 4) + ' ' + x + ' 18;' + (5 + i % 4) + ' ' + x + ' 18;-' + (5 + i % 4) + ' ' + x + ' 18'} dur={(3.7 + i * .11) + 's'} begin={(-i * .19) + 's'} repeatCount="indefinite" />
      </g>
    ))}
  </svg>
}

function AnimatedRose({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g transform="translate(50 50)">
      <g>
        {Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx="0" cy="-21" rx="5.8" ry="23" fill="none" stroke={i % 3 === 0 ? artwork.accent : artwork.ink} strokeWidth={i % 3 === 0 ? 1.1 : .48} opacity=".75" transform={'rotate(' + i * 30 + ')'} />)}
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="18s" repeatCount="indefinite" />
      </g>
      <g opacity=".48">
        {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx="0" cy="-14" rx="4" ry="16" fill="none" stroke={artwork.ink} strokeWidth=".45" transform={'rotate(' + i * 40 + ')'} />)}
        <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="12s" repeatCount="indefinite" />
      </g>
    </g>
    <circle cx="50" cy="50" r="4.4" fill={artwork.surface} stroke={artwork.accent} strokeWidth="1.1" />
  </svg>
}

function AnimatedScanner({ artwork }: { artwork: Artwork }) {
  const marks = Array.from({ length: 100 }, (_, i) => {
    const c = i % 10, r = Math.floor(i / 10)
    return { x: 10 + c * 8.9, y: 10 + r * 8.9 }
  })
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g stroke={artwork.ink} strokeWidth=".55" opacity=".63">
      {marks.map(({ x,y }, i) => <line key={i} x1={x - 1.5} y1={y} x2={x + 1.5} y2={y} transform={'rotate(' + ((i * 17) % 180) + ' ' + x + ' ' + y + ')'} />)}
    </g>
    <g>
      <rect x="6" y="8" width="7" height="84" rx="3.5" fill={artwork.accent} opacity=".16" />
      <line x1="9.5" y1="8" x2="9.5" y2="92" stroke={artwork.accent} strokeWidth="1.3" />
      <animateTransform attributeName="transform" type="translate" values="0 0;81 0;0 0" dur="6.8s" repeatCount="indefinite" />
    </g>
  </svg>
}

function AnimatedAperture({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {Array.from({ length: 8 }, (_, i) => {
      const size = 70 - i * 7
      const p = 50 - size / 2
      return <rect key={i} x={p} y={p} width={size} height={size} rx={i * .7} fill="none" stroke={i === 3 ? artwork.accent : artwork.ink} strokeWidth={i === 3 ? 1.4 : .55} opacity={.9 - i * .06}>
        <animate attributeName="x" values={p + ';' + (p - 2.5) + ';' + p} dur={(6 + i * .32) + 's'} begin={(-i * .24) + 's'} repeatCount="indefinite" />
        <animate attributeName="y" values={p + ';' + (p - 2.5) + ';' + p} dur={(6 + i * .32) + 's'} begin={(-i * .24) + 's'} repeatCount="indefinite" />
        <animate attributeName="width" values={size + ';' + (size + 5) + ';' + size} dur={(6 + i * .32) + 's'} begin={(-i * .24) + 's'} repeatCount="indefinite" />
        <animate attributeName="height" values={size + ';' + (size + 5) + ';' + size} dur={(6 + i * .32) + 's'} begin={(-i * .24) + 's'} repeatCount="indefinite" />
      </rect>
    })}
  </svg>
}

function AnimatedDrift({ artwork }: { artwork: Artwork }) {
  const circles = [[30,34,16],[59,31,21],[66,62,18],[36,68,23]]
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {circles.map(([cx,cy,r], i) => (
      <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={i === 1 ? artwork.accent : artwork.ink} strokeWidth={i === 1 ? 1.4 : .65} opacity={.76 - i * .06}>
        <animate attributeName="cx" values={(cx - 3) + ';' + (cx + 4) + ';' + (cx - 3)} dur={(7.2 + i * .8) + 's'} begin={(-i * .9) + 's'} repeatCount="indefinite" />
        <animate attributeName="cy" values={(cy + 2) + ';' + (cy - 3) + ';' + (cy + 2)} dur={(8.4 + i * .7) + 's'} begin={(-i * .7) + 's'} repeatCount="indefinite" />
      </circle>
    ))}
    <circle cx="50" cy="50" r="2.7" fill={artwork.accent} />
  </svg>
}

function AnimatedWaveGate({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeLinecap="round">
      {Array.from({ length: 13 }, (_, i) => {
        const y = 18 + i * 5.2
        return <path key={i} d={'M5 ' + y + ' C28 ' + (y - 10) + ' 35 ' + (y + 10) + ' 55 ' + y + ' S82 ' + (y - 8) + ' 95 ' + y} strokeWidth={i === 6 ? 1.5 : .55} stroke={i === 6 ? artwork.accent : artwork.ink} strokeDasharray={i === 6 ? '5 4' : '2.2 4.8'} opacity={i === 6 ? 1 : .68}>
          <animate attributeName="stroke-dashoffset" values="0;-28" dur={(2.8 + i * .12) + 's'} repeatCount="indefinite" />
        </path>
      })}
    </g>
  </svg>
}

function AnimatedDial({ artwork }: { artwork: Artwork }) {
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const a = i * 10 * Math.PI / 180
    return { x1: 50 + Math.cos(a) * 31, y1: 50 + Math.sin(a) * 31, x2: 50 + Math.cos(a) * (i % 3 === 0 ? 38 : 35), y2: 50 + Math.sin(a) * (i % 3 === 0 ? 38 : 35) }
  })
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g stroke={artwork.ink} strokeLinecap="round">
      {ticks.map((t,i) => <line key={i} {...t} strokeWidth={i % 3 === 0 ? 1 : .45} />)}
      <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="24s" repeatCount="indefinite" />
    </g>
    <g fill="none" stroke={artwork.accent} strokeWidth="1.2" strokeDasharray="4 7">
      <circle cx="50" cy="50" r="24" />
      <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="14s" repeatCount="indefinite" />
    </g>
    <line x1="50" y1="16" x2="50" y2="31" stroke={artwork.accent} strokeWidth="2.2" />
    <circle cx="50" cy="50" r="6" fill={artwork.surface} stroke={artwork.ink} strokeWidth=".7" />
  </svg>
}

function AnimatedConveyor({ artwork }: { artwork: Artwork }) {
  const blocks = Array.from({ length: 9 }, (_, i) => 3 + i * 13)
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g>
      <g fill={artwork.ink} opacity=".8">
        {blocks.map((x,i) => <rect key={i} x={x} y={20 + (i % 3) * 20} width="8" height="14" rx="1" />)}
      </g>
      <g fill={artwork.ink} opacity=".8" transform="translate(-117 0)">
        {blocks.map((x,i) => <rect key={i} x={x} y={20 + (i % 3) * 20} width="8" height="14" rx="1" />)}
      </g>
      <animateTransform attributeName="transform" type="translate" from="0 0" to="117 0" dur="7.2s" repeatCount="indefinite" />
    </g>
    <rect x="46" y="42" width="8" height="16" rx="1" fill={artwork.accent}>
      <animate attributeName="x" values="88;4;88" dur="8.4s" repeatCount="indefinite" />
    </rect>
  </svg>
}

function AnimatedGrid({ artwork }: { artwork: Artwork }) {
  const lines = Array.from({ length: 13 }, (_, i) => 14 + i * 6)
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".5" opacity=".72">
      <g>
        {lines.map((x,i) => <line key={i} x1={x} y1="8" x2={x} y2="92" />)}
        <animateTransform attributeName="transform" type="scale" values="1 1;1.08 .94;1 1" additive="sum" dur="6.8s" repeatCount="indefinite" />
      </g>
      <g>
        {lines.map((y,i) => <line key={i} x1="8" y1={y} x2="92" y2={y} />)}
        <animateTransform attributeName="transform" type="scale" values="1 1;.94 1.08;1 1" additive="sum" dur="6.8s" repeatCount="indefinite" />
      </g>
    </g>
    <circle cx="50" cy="50" r="4" fill={artwork.accent} />
  </svg>
}

function AnimatedTransit({ artwork }: { artwork: Artwork }) {
  const path = 'M6 52 C18 19 30 81 42 48 S67 18 79 51 S90 77 96 46'
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <path d={path} fill="none" stroke={artwork.ink} strokeWidth=".7" opacity=".7" />
    {[0,1,2].map((i) => <circle key={i} r={i === 0 ? 3.4 : 1.6} fill={i === 0 ? artwork.accent : artwork.ink} opacity={i === 0 ? 1 : .5}>
      <animateMotion path={path} dur={(5.4 + i * 1.7) + 's'} begin={(-i * 2.1) + 's'} repeatCount="indefinite" />
    </circle>)}
  </svg>
}

function AnimatedMatrix({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {Array.from({ length: 81 }, (_, i) => {
      const col = i % 9, row = Math.floor(i / 9), x = 14 + col * 9, y = 14 + row * 9
      const delay = -((col + row * 1.7) % 9) * .22
      const hot = (col + row) % 7 === 0
      return <circle key={i} cx={x} cy={y} r={hot ? 2.1 : 1.1} fill={hot ? artwork.accent : artwork.ink} opacity=".22">
        <animate attributeName="opacity" values=".18;.95;.18" dur="2.6s" begin={delay + 's'} repeatCount="indefinite" />
        <animate attributeName="r" values={(hot ? 1.7 : .9) + ';' + (hot ? 2.6 : 1.45) + ';' + (hot ? 1.7 : .9)} dur="2.6s" begin={delay + 's'} repeatCount="indefinite" />
      </circle>
    })}
  </svg>
}

function AnimatedTide({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {Array.from({ length: 10 }, (_, i) => {
      const rx = 38 - i * 3.1, ry = 30 - i * 2.2
      return <ellipse key={i} cx="50" cy="50" rx={rx} ry={ry} fill="none" stroke={i === 5 ? artwork.accent : artwork.ink} strokeWidth={i === 5 ? 1.35 : .5} opacity={.85 - i * .045} transform={'rotate(' + (i * 4 - 18) + ' 50 50)'}>
        <animate attributeName="rx" values={rx + ';' + (rx + 3.4) + ';' + rx} dur={(6.2 + i * .23) + 's'} begin={(-i * .28) + 's'} repeatCount="indefinite" />
        <animate attributeName="ry" values={ry + ';' + (ry - 2.2) + ';' + ry} dur={(6.2 + i * .23) + 's'} begin={(-i * .28) + 's'} repeatCount="indefinite" />
      </ellipse>
    })}
  </svg>
}

function AnimatedEngine({ artwork }: { artwork: Artwork }) {
  const rotor = (radius: number, count: number, accentEvery: number) => Array.from({ length: count }, (_, i) => {
    const a = i / count * Math.PI * 2
    const x = Math.cos(a) * radius, y = Math.sin(a) * radius
    return <g key={i} transform={'translate(' + x + ' ' + y + ') rotate(' + (i * 360 / count) + ')'}>
      <rect x="-1.5" y="-4" width="3" height="8" rx="1.2" fill={i % accentEvery === 0 ? artwork.accent : artwork.ink} />
    </g>
  })
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g transform="translate(50 50)">
      <g>
        {rotor(31, 18, 6)}
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="16s" repeatCount="indefinite" />
      </g>
      <g opacity=".72">
        {rotor(20, 12, 4)}
        <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="9s" repeatCount="indefinite" />
      </g>
      <circle cx="0" cy="0" r="10" fill={artwork.surface} stroke={artwork.ink} strokeWidth=".7" />
      <circle cx="0" cy="0" r="4.2" fill={artwork.accent}>
        <animate attributeName="r" values="3.7;5;3.7" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
}


function AnimatedMorph({ artwork }: { artwork: Artwork }) {
  const a = 'M8 50 C20 18 36 18 50 50 C64 82 80 82 92 50'
  const b = 'M8 50 C20 82 36 82 50 50 C64 18 80 18 92 50'
  const c = 'M8 50 C24 34 34 66 50 50 C66 34 76 66 92 50'
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {[0,1,2,3,4,5].map((i) => <path key={i} d={a} fill="none" stroke={i === 2 ? artwork.accent : artwork.ink} strokeWidth={i === 2 ? 1.6 : .55} opacity={.82 - i * .08} transform={'translate(0 ' + (i - 2.5) * 5 + ')'}>
      <animate attributeName="d" values={a + ';' + b + ';' + c + ';' + a} dur={(7.2 + i * .45) + 's'} begin={(-i * .4) + 's'} repeatCount="indefinite" />
    </path>)}
  </svg>
}

function AnimatedShutter({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g transform="translate(50 50)">
      {Array.from({ length: 10 }, (_, i) => <g key={i} transform={'rotate(' + i * 36 + ')'}>
        <path d="M7 -4 L35 -8 L35 8 L7 4Z" fill={i % 2 ? artwork.ink : artwork.accent} opacity={i % 2 ? .72 : .9}>
          <animateTransform attributeName="transform" type="rotate" values="-8 7 0;14 7 0;-8 7 0" dur={(5.4 + (i % 3) * .35) + 's'} begin={(-i * .18) + 's'} repeatCount="indefinite" />
        </path>
      </g>)}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="30s" repeatCount="indefinite" />
      </g>
      <circle cx="0" cy="0" r="9" fill={artwork.surface} stroke={artwork.ink} strokeWidth=".7">
        <animate attributeName="r" values="7.5;12;7.5" dur="5.8s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
}

function AnimatedChain({ artwork }: { artwork: Artwork }) {
  const pivots = [18,34,50,66,82]
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <line x1="10" y1="25" x2="90" y2="25" stroke={artwork.ink} strokeWidth=".55" opacity=".45" />
    {pivots.map((x, i) => <g key={i}>
      <circle cx={x} cy="25" r="2" fill={artwork.ink} />
      <g>
        <line x1={x} y1="25" x2={x} y2="66" stroke={i === 2 ? artwork.accent : artwork.ink} strokeWidth={i === 2 ? 1.4 : .65} />
        <circle cx={x} cy="66" r={i === 2 ? 4 : 2.7} fill={i === 2 ? artwork.accent : artwork.ink} />
        <animateTransform attributeName="transform" type="rotate" values={(-16 - i) + ' ' + x + ' 25;' + (16 + i) + ' ' + x + ' 25;' + (-16 - i) + ' ' + x + ' 25'} dur={(4.4 + i * .27) + 's'} begin={(-i * .34) + 's'} repeatCount="indefinite" />
      </g>
    </g>)}
  </svg>
}

function AnimatedRadar({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {[13,23,33,42].map((r,i) => <circle key={r} cx="50" cy="50" r={r} fill="none" stroke={artwork.ink} strokeWidth=".45" opacity={.58 - i * .07} />)}
    {[[31,29],[69,37],[62,71],[25,64]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="2.2" fill={artwork.accent} opacity=".18">
      <animate attributeName="opacity" values=".12;.95;.12" dur={(4.2 + i * .63) + 's'} begin={(-i * .85) + 's'} repeatCount="indefinite" />
    </circle>)}
    <g transform="rotate(0 50 50)">
      <path d="M50 50 L50 7 A43 43 0 0 1 72 13 Z" fill={artwork.accent} opacity=".08" />
      <line x1="50" y1="50" x2="50" y2="7" stroke={artwork.accent} strokeWidth="1.4" />
      <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="5.8s" repeatCount="indefinite" />
    </g>
    <circle cx="50" cy="50" r="3" fill={artwork.accent} />
  </svg>
}

function AnimatedPrismShift({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <polygon points="20,78 38,18 80,26 72,80" fill="none" stroke={artwork.ink} strokeWidth=".7" />
    <polygon points="38,18 53,49 20,78" fill={artwork.ink} opacity=".78">
      <animate attributeName="points" values="38,18 53,49 20,78;42,20 58,44 20,78;38,18 53,49 20,78" dur="7.5s" repeatCount="indefinite" />
    </polygon>
    <polygon points="38,18 80,26 53,49" fill={artwork.accent} opacity=".88">
      <animate attributeName="points" values="38,18 80,26 53,49;42,20 77,31 58,44;38,18 80,26 53,49" dur="7.5s" repeatCount="indefinite" />
    </polygon>
    <polygon points="53,49 80,26 72,80" fill={artwork.ink} opacity=".22">
      <animate attributeName="points" values="53,49 80,26 72,80;58,44 77,31 68,77;53,49 80,26 72,80" dur="7.5s" repeatCount="indefinite" />
    </polygon>
  </svg>
}

function AnimatedAccordion({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {Array.from({ length: 17 }, (_, i) => {
      const x = 10 + i * 5
      const mid = 50
      const swing = 2 + Math.abs(8 - i) * .22
      return <path key={i} d={'M' + x + ' 10 V90'} stroke={i === 8 ? artwork.accent : artwork.ink} strokeWidth={i === 8 ? 1.5 : .55} opacity={i === 8 ? 1 : .7}>
        <animate attributeName="d" values={
          'M' + x + ' 10 V90;' +
          'M' + (x + (i % 2 ? swing : -swing)) + ' 10 Q' + x + ' ' + mid + ' ' + (x - (i % 2 ? swing : -swing)) + ' 90;' +
          'M' + x + ' 10 V90'
        } dur={(5.5 + i * .08) + 's'} begin={(-i * .11) + 's'} repeatCount="indefinite" />
      </path>
    })}
  </svg>
}

function AnimatedLens({ artwork }: { artwork: Artwork }) {
  const leftA = 'M48 14 C22 28 22 72 48 86'
  const leftB = 'M48 14 C31 30 31 70 48 86'
  const rightA = 'M52 14 C78 28 78 72 52 86'
  const rightB = 'M52 14 C69 30 69 70 52 86'
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {[0,1,2,3].map((i) => <g key={i} opacity={.88 - i * .14} transform={'translate(' + (i - 1.5) * 2 + ' 0)'}>
      <path d={leftA} fill="none" stroke={i === 1 ? artwork.accent : artwork.ink} strokeWidth={i === 1 ? 1.5 : .58}>
        <animate attributeName="d" values={leftA + ';' + leftB + ';' + leftA} dur={(6.4 + i * .4) + 's'} begin={(-i * .5) + 's'} repeatCount="indefinite" />
      </path>
      <path d={rightA} fill="none" stroke={i === 1 ? artwork.accent : artwork.ink} strokeWidth={i === 1 ? 1.5 : .58}>
        <animate attributeName="d" values={rightA + ';' + rightB + ';' + rightA} dur={(6.4 + i * .4) + 's'} begin={(-i * .5) + 's'} repeatCount="indefinite" />
      </path>
    </g>)}
    <circle cx="50" cy="50" r="2.8" fill={artwork.accent} />
  </svg>
}

function AnimatedRain({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {Array.from({ length: 24 }, (_, i) => {
      const x = 8 + (i * 17 % 86)
      const h = 5 + (i % 5) * 2.3
      const dur = 3.6 + (i % 7) * .38
      return <rect key={i} x={x} y="-14" width={i % 6 === 0 ? 1.8 : .8} height={h} rx=".4" fill={i % 6 === 0 ? artwork.accent : artwork.ink} opacity={i % 6 === 0 ? .95 : .62}>
        <animate attributeName="y" values="-14;106" dur={dur + 's'} begin={(-i * .37) + 's'} repeatCount="indefinite" />
      </rect>
    })}
    <rect x="48" y="0" width="2" height="10" fill={artwork.accent}>
      <animate attributeName="y" values="100;-12" dur="5.2s" repeatCount="indefinite" />
    </rect>
  </svg>
}

function AnimatedHelix({ artwork }: { artwork: Artwork }) {
  const p1 = 'M5 50 C16 18 28 82 39 50 S62 18 73 50 S88 82 95 50'
  const p2 = 'M5 50 C16 82 28 18 39 50 S62 82 73 50 S88 18 95 50'
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <path d={p1} fill="none" stroke={artwork.ink} strokeWidth=".75" opacity=".72" />
    <path d={p2} fill="none" stroke={artwork.ink} strokeWidth=".75" opacity=".42" />
    {[0,1,2,3].map((i) => <circle key={i} r={i < 2 ? 2.6 : 1.35} fill={i % 2 === 0 ? artwork.accent : artwork.ink}>
      <animateMotion path={i % 2 === 0 ? p1 : p2} dur={(5.6 + i * 1.1) + 's'} begin={(-i * 1.2) + 's'} repeatCount="indefinite" />
    </circle>)}
  </svg>
}

function AnimatedTileScan({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {Array.from({ length: 64 }, (_, i) => {
      const col = i % 8, row = Math.floor(i / 8)
      const x = 10 + col * 11.4, y = 10 + row * 11.4
      const delay = -(col * .18 + row * .035)
      return <rect key={i} x={x} y={y} width="7" height="7" rx=".7" fill={artwork.ink} opacity=".18">
        <animate attributeName="opacity" values=".14;.9;.14" dur="2.25s" begin={delay + 's'} repeatCount="indefinite" />
        <animate attributeName="fill" values={artwork.ink + ';' + artwork.accent + ';' + artwork.ink} dur="2.25s" begin={delay + 's'} repeatCount="indefinite" />
      </rect>
    })}
  </svg>
}

function AnimatedCompass({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="38" fill="none" stroke={artwork.ink} strokeWidth=".6" opacity=".7" />
    {Array.from({ length: 24 }, (_, i) => {
      const a = i * 15 * Math.PI / 180
      return <line key={i} x1={50 + Math.cos(a) * 32} y1={50 + Math.sin(a) * 32} x2={50 + Math.cos(a) * 37} y2={50 + Math.sin(a) * 37} stroke={artwork.ink} strokeWidth={i % 6 === 0 ? 1.2 : .45} />
    })}
    <g>
      <path d="M50 18 54 50 50 58 46 50Z" fill={artwork.accent} />
      <path d="M50 82 54 50 50 58 46 50Z" fill={artwork.ink} opacity=".72" />
      <animateTransform attributeName="transform" type="rotate" values="0 50 50;63 50 50;38 50 50;122 50 50;0 50 50" keyTimes="0;.25;.46;.73;1" dur="9s" repeatCount="indefinite" />
    </g>
    <circle cx="50" cy="50" r="4" fill={artwork.surface} stroke={artwork.ink} strokeWidth=".7" />
  </svg>
}

function AnimatedEchoPulse({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {Array.from({ length: 9 }, (_, i) => <circle key={i} cx="50" cy="50" r="5" fill="none" stroke={i % 4 === 0 ? artwork.accent : artwork.ink} strokeWidth={i % 4 === 0 ? 1.3 : .5} opacity="0">
      <animate attributeName="r" values="5;43" dur="5.6s" begin={(-i * .62) + 's'} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;.78;0" dur="5.6s" begin={(-i * .62) + 's'} repeatCount="indefinite" />
    </circle>)}
    <circle cx="50" cy="50" r="4" fill={artwork.accent}>
      <animate attributeName="r" values="3;5.2;3" dur="2.8s" repeatCount="indefinite" />
    </circle>
  </svg>
}

function AnimatedCascade({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {Array.from({ length: 14 }, (_, i) => {
      const x = 11 + (i % 7) * 12
      const y = 9 + Math.floor(i / 7) * 22
      return <g key={i} transform={'translate(' + x + ' ' + y + ')'}>
        <rect x="-3" y="-3" width="6" height="6" rx="1" fill={i % 5 === 0 ? artwork.accent : artwork.ink} opacity={i % 5 === 0 ? .95 : .7} />
        <animateTransform attributeName="transform" additive="sum" type="translate" values="0 -18;0 72;0 72" keyTimes="0;.78;1" dur={(4.6 + (i % 4) * .35) + 's'} begin={(-i * .33) + 's'} repeatCount="indefinite" />
        <animate attributeName="opacity" values=".15;1;.15" dur={(4.6 + (i % 4) * .35) + 's'} begin={(-i * .33) + 's'} repeatCount="indefinite" />
      </g>
    })}
  </svg>
}

function AnimatedPiston({ artwork }: { artwork: Artwork }) {
  const xs = [18,34,50,66,82]
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <line x1="9" y1="81" x2="91" y2="81" stroke={artwork.ink} strokeWidth=".8" />
    {xs.map((x,i) => <g key={i}>
      <rect x={x - 4} y="32" width="8" height="18" rx="1.3" fill={i === 2 ? artwork.accent : artwork.ink} opacity={i === 2 ? 1 : .74} />
      <line x1={x} y1="50" x2={x} y2="78" stroke={artwork.ink} strokeWidth=".9" />
      <circle cx={x} cy="81" r="3" fill={artwork.surface} stroke={artwork.ink} strokeWidth=".7" />
      <animateTransform attributeName="transform" type="translate" values="0 -8;0 10;0 -8" dur={(3.8 + i * .26) + 's'} begin={(-i * .42) + 's'} repeatCount="indefinite" />
    </g>)}
  </svg>
}

function AnimatedRipple({ artwork }: { artwork: Artwork }) {
  const sources = [[34,45],[66,55]]
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {sources.map(([cx,cy], s) => <g key={s}>
      {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={cx} cy={cy} r="3" fill="none" stroke={s === 0 ? artwork.ink : artwork.accent} strokeWidth={s === 0 ? .48 : .7} opacity="0">
        <animate attributeName="r" values="3;38" dur="6.2s" begin={(-i * .88 - s * 1.1) + 's'} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;.68;0" dur="6.2s" begin={(-i * .88 - s * 1.1) + 's'} repeatCount="indefinite" />
      </circle>)}
      <circle cx={cx} cy={cy} r="2.7" fill={s === 0 ? artwork.ink : artwork.accent} />
    </g>)}
  </svg>
}

function AnimatedSwarm({ artwork }: { artwork: Artwork }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke={artwork.ink} strokeWidth=".35" opacity=".22">
      <ellipse cx="50" cy="50" rx="37" ry="20" transform="rotate(17 50 50)" />
      <ellipse cx="50" cy="50" rx="30" ry="34" transform="rotate(-31 50 50)" />
      <ellipse cx="50" cy="50" rx="21" ry="40" transform="rotate(48 50 50)" />
    </g>
    {Array.from({ length: 18 }, (_, i) => {
      const path = i % 3 === 0
        ? 'M13 50 C21 18 79 18 87 50 C79 82 21 82 13 50Z'
        : i % 3 === 1
          ? 'M50 10 C79 21 78 75 50 90 C22 75 21 21 50 10Z'
          : 'M20 24 C52 6 92 42 78 73 C44 94 8 65 20 24Z'
      return <circle key={i} r={i % 6 === 0 ? 2.3 : .9} fill={i % 6 === 0 ? artwork.accent : artwork.ink} opacity={i % 6 === 0 ? .95 : .62}>
        <animateMotion path={path} dur={(6.8 + (i % 7) * .83) + 's'} begin={(-i * .53) + 's'} repeatCount="indefinite" />
      </circle>
    })}
    <circle cx="50" cy="50" r="3.2" fill={artwork.accent} opacity=".9" />
  </svg>
}

type VisibilityCallback = (visible: boolean) => void

type VirtualObserverRecord = {
  observer: IntersectionObserver
  callbacks: Map<Element, VisibilityCallback>
  users: number
}

const rootedVirtualObservers = new WeakMap<Element, VirtualObserverRecord>()
let viewportVirtualObserver: VirtualObserverRecord | null = null

function createVirtualObserver(root: Element | null): VirtualObserverRecord {
  const callbacks = new Map<Element, VisibilityCallback>()
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      callbacks.get(entry.target)?.(entry.isIntersecting)
    }
  }, {
    root,
    rootMargin: root?.classList.contains('focus-filmstrip') ? '0px 700px' : '1200px 0px',
    threshold: 0,
  })

  return { observer, callbacks, users: 0 }
}

function getVirtualObserver(root: Element | null) {
  if (typeof IntersectionObserver === 'undefined') return null

  if (!root) {
    viewportVirtualObserver ??= createVirtualObserver(null)
    return viewportVirtualObserver
  }

  let record = rootedVirtualObservers.get(root)
  if (!record) {
    record = createVirtualObserver(root)
    rootedVirtualObservers.set(root, record)
  }
  return record
}

function releaseVirtualObserver(root: Element | null, record: VirtualObserverRecord) {
  if (record.users > 0) return
  record.observer.disconnect()

  if (root) rootedVirtualObservers.delete(root)
  else viewportVirtualObserver = null
}

export function VirtualArtworkVisual({
  artwork,
  eager = false,
}: {
  artwork: Artwork
  eager?: boolean
}) {
  const shellRef = useRef<HTMLDivElement>(null)
  const [nearViewport, setNearViewport] = useState(false)
  const canVirtualize = typeof IntersectionObserver !== 'undefined'
  const mounted = eager || nearViewport || !canVirtualize

  useEffect(() => {
    if (eager || !canVirtualize) return

    const shell = shellRef.current
    if (!shell) return

    const scrollRoot = shell.closest('.focus-filmstrip, .archive-content')
    const record = getVirtualObserver(scrollRoot)
    if (!record) return

    const update: VisibilityCallback = (visible) => setNearViewport(visible)
    record.callbacks.set(shell, update)
    record.users += 1
    record.observer.observe(shell)

    return () => {
      record.observer.unobserve(shell)
      record.callbacks.delete(shell)
      record.users -= 1
      releaseVirtualObserver(scrollRoot, record)
    }
  }, [canVirtualize, eager])

  return (
    <div ref={shellRef} className="art-virtual-shell" data-mounted={mounted || undefined}>
      {mounted ? <ArtworkVisual artwork={artwork} /> : <div className="art-virtual-placeholder" aria-hidden="true" />}
    </div>
  )
}

export function ArtworkVisual({ artwork }: { artwork: Artwork }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!artwork.animated) return

    const root = rootRef.current
    const svg = root?.querySelector('svg')
    if (!root || !(svg instanceof SVGSVGElement)) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = true

    const syncPlayback = () => {
      if (reducedMotion.matches || !visible) svg.pauseAnimations()
      else svg.unpauseAnimations()
    }

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true
      syncPlayback()
    }, { rootMargin: '96px' })

    observer.observe(root)
    reducedMotion.addEventListener('change', syncPlayback)
    syncPlayback()

    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', syncPlayback)
      svg.unpauseAnimations()
    }
  }, [artwork.animated, artwork.id])

  let visual
  switch (artwork.kind) {
    case 'signal': visual = <Signal artwork={artwork} />; break
    case 'orbit': visual = <Orbit artwork={artwork} />; break
    case 'fold': visual = <Fold artwork={artwork} />; break
    case 'lattice': visual = <Lattice artwork={artwork} />; break
    case 'echo': visual = <Echo artwork={artwork} />; break
    case 'ribbon': visual = <Ribbon artwork={artwork} />; break
    case 'halo': visual = <Halo artwork={artwork} />; break
    case 'field': visual = <Field artwork={artwork} />; break
    case 'petal': visual = <Petal artwork={artwork} />; break
    case 'shift': visual = <Shift artwork={artwork} />; break
    case 'arc': visual = <Arc artwork={artwork} />; break
    case 'nodes': visual = <Nodes artwork={artwork} />; break
    case 'moire': visual = <Moire artwork={artwork} />; break
    case 'strata': visual = <Strata artwork={artwork} />; break
    case 'vortex': visual = <Vortex artwork={artwork} />; break
    case 'prism': visual = <Prism artwork={artwork} />; break
    case 'weave': visual = <Weave artwork={artwork} />; break
    case 'eclipse': visual = <Eclipse artwork={artwork} />; break
    case 'flux': visual = <Flux artwork={artwork} />; break
    case 'tiles': visual = <Tiles artwork={artwork} />; break
    case 'contour': visual = <Contour artwork={artwork} />; break
    case 'constellation': visual = <Constellation artwork={artwork} />; break
    case 'chamber': visual = <Chamber artwork={artwork} />; break
    case 'spiral': visual = <Spiral artwork={artwork} />; break
    case 'bands': visual = <Bands artwork={artwork} />; break
    case 'spokes': visual = <Spokes artwork={artwork} />; break
    case 'portals': visual = <Portals artwork={artwork} />; break
    case 'bubbles': visual = <Bubbles artwork={artwork} />; break
    case 'measure': visual = <Measure artwork={artwork} />; break
    case 'shear': visual = <Shear artwork={artwork} />; break
    case 'fossil': visual = <Fossil artwork={artwork} />; break
    case 'suns': visual = <Suns artwork={artwork} />; break
    case 'counterform': visual = <Counterform artwork={artwork} />; break
    case 'columns': visual = <Columns artwork={artwork} />; break
    case 'tension': visual = <Tension artwork={artwork} />; break
    case 'recursive': visual = <Recursive artwork={artwork} />; break
    case 'pulse': visual = <Pulse artwork={artwork} />; break
    case 'polar': visual = <Polar artwork={artwork} />; break
    case 'slipstream': visual = <Slipstream artwork={artwork} />; break
    case 'axis': visual = <Axis artwork={artwork} />; break
    case 'anim-breathe': visual = <AnimatedBreathe artwork={artwork} />; break
    case 'anim-orbit': visual = <AnimatedOrbit artwork={artwork} />; break
    case 'anim-loom': visual = <AnimatedLoom artwork={artwork} />; break
    case 'anim-pendulum': visual = <AnimatedPendulum artwork={artwork} />; break
    case 'anim-rose': visual = <AnimatedRose artwork={artwork} />; break
    case 'anim-scanner': visual = <AnimatedScanner artwork={artwork} />; break
    case 'anim-aperture': visual = <AnimatedAperture artwork={artwork} />; break
    case 'anim-drift': visual = <AnimatedDrift artwork={artwork} />; break
    case 'anim-wavegate': visual = <AnimatedWaveGate artwork={artwork} />; break
    case 'anim-dial': visual = <AnimatedDial artwork={artwork} />; break
    case 'anim-conveyor': visual = <AnimatedConveyor artwork={artwork} />; break
    case 'anim-grid': visual = <AnimatedGrid artwork={artwork} />; break
    case 'anim-transit': visual = <AnimatedTransit artwork={artwork} />; break
    case 'anim-matrix': visual = <AnimatedMatrix artwork={artwork} />; break
    case 'anim-tide': visual = <AnimatedTide artwork={artwork} />; break
    case 'anim-engine': visual = <AnimatedEngine artwork={artwork} />; break
    case 'anim-morph': visual = <AnimatedMorph artwork={artwork} />; break
    case 'anim-shutter': visual = <AnimatedShutter artwork={artwork} />; break
    case 'anim-chain': visual = <AnimatedChain artwork={artwork} />; break
    case 'anim-radar': visual = <AnimatedRadar artwork={artwork} />; break
    case 'anim-prism': visual = <AnimatedPrismShift artwork={artwork} />; break
    case 'anim-accordion': visual = <AnimatedAccordion artwork={artwork} />; break
    case 'anim-lens': visual = <AnimatedLens artwork={artwork} />; break
    case 'anim-rain': visual = <AnimatedRain artwork={artwork} />; break
    case 'anim-helix': visual = <AnimatedHelix artwork={artwork} />; break
    case 'anim-tilescan': visual = <AnimatedTileScan artwork={artwork} />; break
    case 'anim-compass': visual = <AnimatedCompass artwork={artwork} />; break
    case 'anim-echo': visual = <AnimatedEchoPulse artwork={artwork} />; break
    case 'anim-cascade': visual = <AnimatedCascade artwork={artwork} />; break
    case 'anim-piston': visual = <AnimatedPiston artwork={artwork} />; break
    case 'anim-ripple': visual = <AnimatedRipple artwork={artwork} />; break
    case 'anim-swarm': visual = <AnimatedSwarm artwork={artwork} />; break
  }
  return <div ref={rootRef} className="art-visual" data-artwork-id={artwork.id} data-animated={artwork.animated || undefined}>{visual}</div>
}
