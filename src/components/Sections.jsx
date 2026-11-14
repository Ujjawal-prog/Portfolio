import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'
import { Github, Linkedin, Phone, Mail, Download, ExternalLink, GraduationCap } from 'lucide-react'
import { owner, about, skills, projects, experience } from '../data/content'

export const Section = ({ id, title, children }) => (
  <section id={id} className="section reveal"><h2>{title}</h2>{children}</section>
)

export const Hero = () => (
  <section id="top" className="hero">
    <p className="eyebrow">Portfolio 2026</p>
    <h1>{owner.name}</h1>
    <p className="quote">“{owner.quote}”</p>
    <p className="sub">{owner.title}</p>
    <div className="btns">
      <a className="btn primary" href="#projects">Explore My Work</a>
      <a className="btn" href="#contact">Contact Me</a>
      <a className="btn ghost" href={owner.resume} download="Ujjawal-Ranjan-Resume.pdf"><Download size={16} /> Resume</a>
    </div>
  </section>
)

export const About = () => (
  <Section id="about" title={about.heading}>
    <div className="grid two">
      <p className="lead">{about.text}</p>
      <div className="card"><GraduationCap /><ul className="plain">{about.education.map(e => <li key={e}>{e}</li>)}</ul></div>
    </div>
  </Section>
)

export const Skills = () => (
  <Section id="skills" title="Things I Work With">
    <div className="grid cards">
      {skills.map(s => { const I = Icons[s.icon] || Icons.Code2; return (
        <div className="card hover" key={s.cat} tabIndex={0}><I /><h3>{s.cat}</h3>
          <div className="chips">{s.items.map(i => <span key={i}>{i}</span>)}</div></div>) })}
    </div>
  </Section>
)

export const Projects = () => (
  <Section id="projects" title="Selected Projects">
    <div className="grid two">
      {projects.map(p => (
        <article className="card hover project" key={p.name} tabIndex={0}>
          {p.image ? <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" /> : <div className="shot" aria-hidden="true">{p.name[0]}</div>}
          <h3>{p.name}</h3><p>{p.desc}</p>
          <ul>{p.features.map(f => <li key={f}>{f}</li>)}</ul>
          <div className="chips">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
          <div className="btns">
            {p.github && <a className="btn" href={p.github} target="_blank" rel="noreferrer"><Github size={16} /> Code</a>}
            {p.demo && <a className="btn primary" href={p.demo} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Live demo</a>}
          </div>
        </article>))}
    </div>
  </Section>
)

export const Experience = () => (
  <Section id="experience" title="Experience & Beyond Coding">
    <ol className="timeline">
      {experience.map(e => (
        <li key={e.name}><span className="dot" /><small>{e.type}</small><h3>{e.name}</h3>
          {e.sub && <em>{e.sub}</em>}<p>{e.desc}</p></li>))}
    </ol>
  </Section>
)

export const GithubSection = () => {
  const [repos, setRepos] = useState([])
  useEffect(() => {
    const user = owner.github.split('/').pop()
    fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=6`)
      .then(r => (r.ok ? r.json() : [])).then(d => Array.isArray(d) && setRepos(d.filter(r => !r.fork))).catch(() => {})
  }, [])
  return (
    <Section id="github" title="My Coding Journey">
      <p className="lead">Everything I build lives on GitHub.</p>
      <div className="grid cards">
        {repos.map(r => (
          <a key={r.id} className="card hover" href={r.html_url} target="_blank" rel="noreferrer">
            <h3>{r.name}</h3><p>{r.description || 'Public repository'}</p><small>{r.language || ''}</small></a>))}
      </div>
      <div className="btns"><a className="btn primary" href={owner.github} target="_blank" rel="noreferrer"><Github size={16} /> View GitHub profile</a></div>
    </Section>
  )
}

export const Contact = () => {
  const [f, setF] = useState({ name: '', msg: '' })
  const href = `mailto:${owner.email}?subject=${encodeURIComponent('Hello from ' + (f.name || 'your portfolio'))}&body=${encodeURIComponent(f.msg)}`
  return (
    <Section id="contact" title="Have an idea? Let's build something together.">
      <p className="lead">Interested in collaborating, discussing ideas or building something meaningful? Feel free to connect.</p>
      <div className="grid two">
        <ul className="plain contact">
          <li><a href={`tel:${owner.phone}`}><Phone size={16} /> {owner.phone}</a></li>
          <li><a href={`mailto:${owner.email}`}><Mail size={16} /> {owner.email}</a></li>
          <li><a href={owner.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a></li>
          <li><a href={owner.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a></li>
        </ul>
        <div className="card form">
          <label>Your name<input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></label>
          <label>Message<textarea rows="4" value={f.msg} onChange={e => setF({ ...f, msg: e.target.value })} /></label>
          <a className="btn primary" href={href}>Send via email</a>
        </div>
      </div>
    </Section>
  )
}
