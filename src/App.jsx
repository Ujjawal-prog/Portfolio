import { useEffect, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Rope from './components/Rope'
import Final from './components/Final'
import { Hero, About, Skills, Projects, Experience, GithubSection, Contact } from './components/Sections'
import { owner } from './data/content'
gsap.registerPlugin(ScrollTrigger)

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const stored = () => { try { return localStorage.getItem('theme') } catch { return null } }

export default function App() {
  const [theme, setTheme] = useState(stored() || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach(el =>
        gsap.from(el, { y: 40, autoAlpha: 0, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 85%' } }))
    })
    return () => ctx.revert()
  }, [])
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Nav theme={theme} toggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <Rope reduced={reduced} />
      <main>
        <Hero /><About /><Skills /><Projects /><Experience /><GithubSection /><Contact /><Final reduced={reduced} />
      </main>
      <footer className="footer">© 2026 {owner.name}</footer>
    </>
  )
}
