import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Reveal from './Reveal.jsx'
import ExhibitCard from './ExhibitCard.jsx'
import './Exhibit.css'
import { getImageUrl, getVideoUrl } from '../assets.js'
import { EXHIBITS } from '../data/exhibits.js'

export default function Exhibit() {
  const { id } = useParams()
  const e = EXHIBITS[id]
  useEffect(() => { if (e) document.title = `${e.t} | Online Museum` }, [e])
  if (!e) return <Navigate to="/" replace />

  const others = Object.entries(EXHIBITS).filter(([k]) => k !== id)
  const related = [...others.filter(([, x]) => x.r === e.r), ...others.filter(([, x]) => x.r !== e.r)].slice(0, 3)

  return (
    <>
      <Header />
      <main className="mainComponent">
        <section className="exhibit-hero">
          {e.img
            ? <img className="exhibit-hero-img" src={getImageUrl(e.img)} alt={e.alt} />
            : <i className={`fa-solid ${e.ic} exhibit-hero-icon`} aria-hidden="true" />}
          <div className="exhibit-hero-content wrap">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to={{ pathname: '/', hash: '#exhibits' }}>Gallery</Link> / {e.r} / {e.t}
            </nav>
            <p className="mostPopular-exhibitLabel">{e.r} · {e.p}</p>
            <h1>{e.t}</h1>
            <p className="exhibit-lede">{e.lede}</p>
          </div>
        </section>

        <section className="section">
          <div className="wrap exhibit-layout">
            <article className="exhibit-article">
              {e.video && (
                <video
                  className="exhibit-video"
                  src={getVideoUrl(e.video)}
                  controls
                  preload="metadata"
                  aria-label={`${e.t} video`}
                />
              )}
              <Reveal as="h2">The story</Reveal>
              {e.story.map((p, i) => <Reveal as="p" key={i}>{p}</Reveal>)}
              {e.originSections
                ? e.originSections.map(({ heading, paragraphs }) => (
                    <section key={heading}>
                      <Reveal as="h2">{heading}</Reveal>
                      {paragraphs.map((p, i) => <Reveal as="p" key={i}>{p}</Reveal>)}
                    </section>
                  ))
                : <>
                    <Reveal as="h2">{e.oh}</Reveal>
                    {e.origin.map((p, i) => {
                      const colonIndex = p.indexOf(':')
                      return (
                        <Reveal as="p" key={i}>
                          {id === 'galleon' && colonIndex !== -1
                            ? <><strong>{p.slice(0, colonIndex + 1)}</strong>{p.slice(colonIndex + 1)}</>
                            : p}
                        </Reveal>
                      )
                    })}
                  </>}
              <Reveal as="h2">
                {id === 'mayon' ? 'The historical eruptions of Mayon Volcano' : 'Timeline'}
              </Reveal>
              <ol className="history">
                {e.tl.map(([y, t]) => (
                  <Reveal as="li" key={y}><span className="yr">{y}</span><p>{t}</p></Reveal>
                ))}
              </ol>
              <Reveal as="h2">
                {id === 'mayon'
                  ? 'Why is Mayon Volcano important?'
                  : id === 'santonino'
                    ? 'Why is the basilica important?'
                    : id === 'miagao'
                      ? 'Why is Miagao Church important?'
                    : id === 'hamiguitan'
                      ? 'Why is Mount Hamiguitan important?'
                    : id === 'vigan' ? 'Why is Vigan important?' : 'Why it matters'}
              </Reveal>
              {Array.isArray(e.why)
                ? e.why.map((item, i) => {
                    const colonIndex = item.indexOf(':')
                    const boldLabels = id === 'santonino'
                      ? ['Religious significance', 'Architectural heritage', 'Cultural identity']
                      : id === 'miagao'
                        ? ['Religious heritage', 'Historical heritage', 'Cultural identity']
                        : id === 'hamiguitan'
                          ? ['Natural Heritage', 'Scientific importance', 'Cultural heritage', 'Environmental protection']
                          : null
                    const shouldBoldLabel = colonIndex !== -1
                      && (boldLabels === null || boldLabels.includes(item.slice(0, colonIndex)))
                    return (
                      <Reveal as="p" key={i}>
                        {shouldBoldLabel
                          ? <><strong>{item.slice(0, colonIndex + 1)}</strong>{item.slice(colonIndex + 1)}</>
                          : item}
                      </Reveal>
                    )
                  })
                : <Reveal as="p">{e.why}</Reveal>}
              <Link className="read-more" to={{ pathname: '/', hash: '#exhibits' }}>← Back to the gallery</Link>
            </article>
            <Reveal as="aside" className="exhibit-facts">
              <h2>At a glance</h2>
              <dl>{e.facts.map(([k, v]) => <div key={k} style={{ display: 'contents' }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </Reveal>
          </div>
        </section>

        <section className="section section-dark">
          <div className="wrap">
            <div className="section-head"><h2>Keep exploring</h2></div>
            <div className="exhibit-grid">
              {related.map(([k, x]) => (
                <ExhibitCard key={k} x={x} meta={`${x.r} · ${x.p}`} title={x.t} desc={x.lede} to={`/exhibit/${k}`} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
