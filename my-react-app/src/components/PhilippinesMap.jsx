import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './PhilippinesMap.css'
import { SPOTS, REGION_COLORS } from '../data/spots.js'

/* Southwest and northeast corners that frame the whole country, from Batanes to Tawi-Tawi */
const PH_BOUNDS = [[4.4, 116.7], [21.3, 127.0]]

const pin = (s, active, dim) => L.divIcon({
  className: 'pin-wrap',
  html: `<span class="pin${active ? ' active' : ''}${dim ? ' dim' : ''}" style="--c:${REGION_COLORS[s.region]}">${s.rank}</span>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
})

/* Map of every spot. region = group in focus, selected = spot id (or null), onSelect(id) when a pin is clicked */
export default function PhilippinesMap({ region, selected, onSelect }) {
  const box = useRef(null)
  const map = useRef(null)
  const markers = useRef({})
  const first = useRef(true)
  const pick = useRef(onSelect)
  pick.current = onSelect

  /* Create the map once */
  useEffect(() => {
    const m = L.map(box.current, { scrollWheelZoom: false, minZoom: 5, maxBounds: [[-2, 108], [27, 135]] })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(m)
    m.fitBounds(PH_BOUNDS)
    SPOTS.forEach((s) => {
      markers.current[s.id] = L.marker([s.lat, s.lng], { icon: pin(s, false, false), title: `${s.name}, ${s.place}` })
        .addTo(m)
        .bindPopup(`<strong>${s.name}</strong><br>${s.place}`)
        .on('click', () => pick.current(s.id))
    })
    map.current = m
    return () => { m.remove(); map.current = null; markers.current = {} }
  }, [])

  /* Restyle pins when the region or the selected spot changes */
  useEffect(() => {
    SPOTS.forEach((s) => {
      const mk = markers.current[s.id]
      if (!mk) return
      mk.setIcon(pin(s, s.id === selected, s.region !== region))
      mk.setZIndexOffset(s.id === selected ? 1000 : s.region === region ? 500 : 0)
    })
  }, [region, selected])

  /* Zoom to the chosen island group (skipped on first load so the full country shows) */
  useEffect(() => {
    if (first.current) { first.current = false; return }
    const pts = SPOTS.filter((s) => s.region === region).map((s) => [s.lat, s.lng])
    map.current?.flyToBounds(pts, { padding: [40, 40], duration: 0.8 })
  }, [region])

  /* Fly to a selected spot and open its popup */
  useEffect(() => {
    const s = SPOTS.find((x) => x.id === selected)
    if (!map.current) return
    if (!s) {
      Object.values(markers.current).forEach((marker) => marker.closePopup())
      return
    }
    map.current.flyTo([s.lat, s.lng], Math.max(map.current.getZoom(), 9), { duration: 0.8 })
    markers.current[s.id]?.openPopup()
  }, [selected])

  return (
    <div className="ph-map-wrap">
      <div className="ph-map" ref={box} role="region" aria-label="Map of the Philippines with the top tourist spots" />
      <button type="button" className="ph-map-reset" onClick={() => map.current?.flyToBounds(PH_BOUNDS, { duration: 0.8 })}>
        Show the whole Philippines
      </button>
      <ul className="ph-legend" aria-label="Map legend">
        {Object.entries(REGION_COLORS).map(([r, c]) => (
          <li key={r}><span style={{ background: c }} />{r}</li>
        ))}
      </ul>
    </div>
  )
}
