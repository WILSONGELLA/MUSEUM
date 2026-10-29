import { useEffect, useRef, useState } from 'react'
import './Reveal.css'

/* Scroll-reveal wrapper: replaces the data-reveal + IntersectionObserver code. */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect() }
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} data-reveal="" className={`${className}${on ? ' in' : ''}`.trim()} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}
