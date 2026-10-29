import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import { EVENTS } from '../data/gallery.js'
import './Timeline.css'

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Timeline() {
  const [i, setI] = useState(-1)
  const [swap, setSwap] = useState(0)
  const track = useRef(null)
  const timer = useRef(null)
  const show = (n) => { setI(n); setSwap((s) => s + 1) }
  const stop = () => clearInterval(timer.current)

  /* The timeline plays itself once when it scrolls into view */
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      let n = 0
      show(0)
      if (reduce) return
      timer.current = setInterval(() => {
        n++; show(n)
        if (n >= EVENTS.length - 1) stop()
      }, 900)
    }, { threshold: 0.5 })
    io.observe(track.current)
    return () => { io.disconnect(); stop() }
  }, [])

  const ev = EVENTS[i]
  return (
    <section className="section" id="timeline">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>Five centuries of trade and culture</h2>
          <p>Choose a year to see how ports, ships and customs shaped the culture we know today.</p>
        </Reveal>
        <Reveal className="tl">
          <div className="tl-track" ref={track} role="tablist" aria-label="Timeline years">
            <span className="tl-progress" style={{ width: `${(Math.max(i, 0) / (EVENTS.length - 1)) * 100}%` }} />
            {EVENTS.map((e, n) => (
              <button key={e.year} role="tab" aria-selected={n === i}
                className={`tl-dot${n === i ? ' active' : ''}${n <= i ? ' reached' : ''}`}
                onClick={() => { stop(); show(n) }}>{e.year}</button>
            ))}
          </div>
          <article className={`tl-panel${reduce ? '' : ' swap'}`} key={swap} aria-live="polite">
            {ev && (<><h3>{ev.title}</h3><p>{ev.text}</p></>)}
          </article>
        </Reveal>
      </div>
    </section>
  )
}
