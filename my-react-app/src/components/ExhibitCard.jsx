import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import Art from './Art.jsx'
import './ExhibitCard.css'

/* One exhibit card. Pass delay to make it fade in on scroll; omit "to" for cards without a page. */
export default function ExhibitCard({ x, meta, title, desc, to, delay }) {
  const body = (
    <>
      <div className="ex-art"><Art x={x} /></div>
      <div className="ex-body">
        <p className="meta">{meta}</p>
        <h3>{title}</h3>
        <p>{desc}</p>
        {to && <Link className="read-more" to={to}>Read more</Link>}
      </div>
    </>
  )
  return delay === undefined
    ? <article className="exhibit">{body}</article>
    : <Reveal as="article" className="exhibit" delay={delay}>{body}</Reveal>
}
