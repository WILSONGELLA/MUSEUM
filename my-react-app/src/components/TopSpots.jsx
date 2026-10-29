import { useState } from 'react'
import { REGION_LIST, SPOTS } from '../data/spots.js'
import Reveal from './Reveal.jsx'
import PhilippinesMap from './PhilippinesMap.jsx'
import { getImageUrl } from '../assets.js'
import './TopSpots.css'

const SPOT_IMAGES = {
  'luzon-1': 'banaueu-rice-terraces.webp',
  'luzon-2': 'Historic Town of Vigan.jpg',
  'luzon-3': 'Mayon Volcano.jpg',
  'luzon-4': 'Walled City.jpg',
  'luzon-5': 'Hundred island.jpg',
  'luzon-6': 'puerto princesa.jpg',
  'luzon-7': 'El Nido.jpg',
  'luzon-8': 'Taal Volcano.jpg',
  'luzon-9': 'Sagada.jpg',
  'luzon-10': 'Mount Pulag.jpg',
  'visayas-1': 'chocolateHills.webp',
  'visayas-2': 'Boracay.jpg',
  'visayas-3': 'magellansCross.jpg',
  'visayas-4': 'Basilica Minore del Santo Niño.jpg',
  'visayas-5': 'Miagao church.jpg',
  'visayas-6': 'kawasan falls.jpg',
  'visayas-7': 'Moalboal.jpg',
  'visayas-8': 'malapascua.jpg',
  'visayas-9': 'Pangao and Alona.png',
  'visayas-10': 'Siquijor beach.jpg',
  'mindanao-1': 'mountApo.webp',
  'mindanao-2': 'Samal.jpg',
  'mindanao-3': 'Siargao.jpg',
  'mindanao-4': 'Enchanted River.jpg',
  'mindanao-5': 'Tinuy-an Falls.jpg',
  'mindanao-6': 'Lake Sebu.jpg',
  'mindanao-7': 'camiguin.jpg',
  'mindanao-8': 'great santa cruz.jpg',
  'mindanao-9': 'Mount Hamiguitan Range.jpg',
  'mindanao-10': 'Dahican Beach.jpg'
}

export default function TopSpots() {
  const [region, setRegion] = useState(REGION_LIST[0])
  const [selected, setSelected] = useState(null)
  const spots = SPOTS.filter((spot) => spot.region === region)
  const activeSpot = spots.find((spot) => spot.id === selected)

  return (
    <section className="section" id="destinations">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>Top 10 places to explore</h2>
          <p>Discover notable destinations across the Philippines, grouped by island region.</p>
        </Reveal>
        <div className="spots-tabs" role="group" aria-label="Filter destinations by region">
          {REGION_LIST.map((item) => (
            <button
              type="button"
              key={item}
              className={`spots-tab${region === item ? ' active' : ''}`}
              aria-pressed={region === item}
              onClick={() => {
                setRegion(item)
                setSelected(null)
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="spots-layout">
          <ol className="spots-list" aria-label={`Top destinations in ${region}`}>
            {spots.map((spot) => (
              <li key={spot.id}>
                <button
                  type="button"
                  className={`spot${selected === spot.id ? ' open' : ''}`}
                  aria-expanded={selected === spot.id}
                  onClick={() => setSelected(selected === spot.id ? null : spot.id)}
                >
                  {SPOT_IMAGES[spot.id] && (
                    <img className="spot-image" src={getImageUrl(SPOT_IMAGES[spot.id])} alt={spot.name} />
                  )}
                  <span className="spot-text">
                    <span className="spot-name">{spot.name}</span>
                    <span className="spot-place">{spot.place}</span>
                    {selected === spot.id && <span className="spot-desc">{spot.desc}</span>}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <PhilippinesMap region={region} selected={selected} onSelect={setSelected} />
        </div>
      </div>
    </section>
  )
}
