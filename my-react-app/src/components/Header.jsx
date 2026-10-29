import { Link } from 'react-router-dom'
import './Header.css'

const LINKS = [['about', 'About'], ['exhibits', 'Exhibitions'], ['timeline', 'Explore'], ['destinations', 'Top 10']]

export default function Header({ active }) {
  return (
    <header className="site-header">
      <nav className="navigationBar">
        <Link className="brand" to={{ pathname: '/', hash: '#hero' }} aria-label="Online Museum home">
          <span className="brand-mark" aria-hidden="true"><img className="siteLogo" src="/assets/icons/favicon.png" alt="" /></span>
          <span className="brand-name">The Filipino Archive</span>
        </Link>
        <ul className="unorderedList-nav">
          {LINKS.map(([id, label]) => (
            <li className="list" key={id}>
              <Link className={`listlink${active === id ? ' current' : ''}`} to={{ pathname: '/', hash: '#' + id }}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
