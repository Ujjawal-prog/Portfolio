import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Person from './Person'
gsap.registerPlugin(ScrollTrigger)
const crew = [['#E5EDDF', '#547458'], ['#547458', '#243B2B'], ['#A6BE9C', '#8a5a3c'], ['#243B2B', '#243B2B']]
// Finale: the main character drops in, bounces, and joins four decorative fictional characters.
export default function Final({ reduced }) {
  const main = useRef(null)
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('.crew > *:not(.main)', { y: 30, autoAlpha: 0, stagger: 0.12, scrollTrigger: { trigger: '#final', start: 'top 55%' } })
      gsap.timeline({ scrollTrigger: { trigger: '#final', start: 'top 60%' } })
        .from(main.current, { y: -520, rotation: -20, autoAlpha: 0, duration: 0.3 })
        .to(main.current, { rotation: 0, duration: 0.01 }, 0.3)
        .from(main.current, { y: -520, ease: 'bounce.out', duration: 1.5 }, 0.3)
    })
    return () => ctx.revert()
  }, [reduced])
  return (
    <section id="final" className="section final">
      <h2>And that's a little bit of my journey.</h2>
      <div className="crew" role="img" aria-label="Five illustrated characters standing together">
        <Person shirt={crew[0][0]} hair={crew[0][1]} /><Person shirt={crew[1][0]} hair={crew[1][1]} />
        <div ref={main} className="main"><Person size={100} /></div>
        <Person shirt={crew[2][0]} hair={crew[2][1]} /><Person shirt={crew[3][0]} hair={crew[3][1]} />
      </div>
      <p className="lead" style={{ margin: '0 auto 20px' }}>Different ideas. One curious mind. Endless possibilities.</p>
      <a className="btn primary" href="#contact">Let's Connect</a>
    </section>
  )
}
