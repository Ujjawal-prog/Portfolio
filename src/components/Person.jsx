// One consistent hand-drawn character. `climb` animates arms and legs alternately via CSS.
export default function Person({ shirt = '#A6BE9C', hair = '#243B2B', up = false, climb = false, size = 90 }) {
  return (
    <svg viewBox="0 0 80 140" width={size} height={size * 1.75} aria-hidden="true" fill="none"
      className={climb ? 'climbing' : ''} stroke="#243B2B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <g className="leg-l"><path d="M34 88L30 126" /><path d="M24 128h12" /></g>
      <g className="leg-r"><path d="M46 88L50 126" /><path d="M44 128h12" /></g>
      <rect x="26" y="44" width="28" height="44" rx="12" fill={shirt} />
      <circle cx="40" cy="26" r="15" fill="#F3D9C0" />
      <path d="M25 24c2-14 28-16 30 0-8-5-20-6-30 0z" fill={hair} />
      <circle cx="35" cy="28" r="1" fill="#243B2B" /><circle cx="45" cy="28" r="1" fill="#243B2B" />
      <path d="M36 34q4 3 8 0" strokeWidth="2" />
      {up ? <><g className="arm-l"><path d="M29 52L38 14" /><circle cx="38" cy="13" r="3" fill="#F3D9C0" /></g><g className="arm-r"><path d="M51 52L42 14" /><circle cx="42" cy="13" r="3" fill="#F3D9C0" /></g></>
        : <><path d="M28 54L16 80" /><path d="M52 54L64 80" /></>}
    </svg>
  )
}
