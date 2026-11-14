import { useState } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
const links = [['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['experience', 'Experience'], ['github', 'GitHub'], ['contact', 'Contact']]
export default function Nav({ theme, toggle }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <a href="#top" className="logo">UR</a>
      <nav className={open ? 'open' : ''} aria-label="Primary">
        {links.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{l}</a>)}
      </nav>
      <div className="nav-actions">
        <button className="icon-btn" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
        <button className="icon-btn menu" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
    </header>
  )
}
