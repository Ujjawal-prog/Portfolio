import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Person from './Person'
gsap.registerPlugin(ScrollTrigger)

// Fixed rope + ONE climber. Separate wrappers per transform so tweens never overwrite each other:
// .climber (scroll y) > .sway (entrance x + scroll-velocity shift) > .swing (rotation) > <Person/>
export default function Rope({ reduced }) {
  const wrap = useRef(null), climber = useRef(null), sway = useRef(null), swing = useRef(null), rope = useRef(null)
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const range = { trigger: document.body, start: 'top top', end: 'bottom bottom' }
      gsap.fromTo(climber.current, { y: '8vh' }, { y: '62vh', ease: 'none', scrollTrigger: { ...range, scrub: 0.6 } })
      gsap.from(sway.current, { x: -160, autoAlpha: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 })
      gsap.to(swing.current, { rotation: 6, transformOrigin: '50% 8%', yoyo: true, repeat: -1, duration: 2.2, ease: 'sine.inOut' })
      gsap.to(rope.current, { skewX: 4, transformOrigin: '50% 0', yoyo: true, repeat: -1, duration: 2.2, ease: 'sine.inOut' })
      // sliding feel: faster scroll = bigger sideways shift + stretch
      const sx = gsap.quickTo(sway.current, 'x', { duration: 0.4 })
      ScrollTrigger.create({ ...range, onUpdate: s => sx(Math.sin(s.progress * 40) * 4 * (0.4 + Math.min(Math.abs(s.getVelocity()) / 1500, 1))) })
      // finale: let go and fall; Final.jsx then drops the same character into the crew
      ScrollTrigger.create({ trigger: '#final', start: 'top 70%',
        onEnter: () => gsap.to(climber.current, { y: '+=18vh', rotation: 25, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }),
        onLeaveBack: () => gsap.to(climber.current, { y: (_, el) => gsap.getProperty(el, 'y'), rotation: 0, autoAlpha: 1, duration: 0.3, overwrite: false }) })
    }, wrap)
    return () => ctx.revert()
  }, [reduced])
  if (reduced) return null
  return (
    <div ref={wrap} className="rope" aria-hidden="true">
      <svg ref={rope} className="rope-line" width="14" height="100%" preserveAspectRatio="none" viewBox="0 0 14 100">
        <path d="M7 0 C3 12 11 24 7 36 S3 62 7 74 S11 92 7 100" stroke="#547458" strokeWidth="2.5" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      <div ref={climber} className="climber"><div ref={sway}><div ref={swing}><Person up climb size={80} /></div></div></div>
    </div>
  )
}
