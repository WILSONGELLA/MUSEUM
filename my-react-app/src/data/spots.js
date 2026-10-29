/* Top 10 tourist spots per island group. Coordinates are approximate (good for a map pin, not for navigation).
   Palawan (MIMAROPA) is grouped with Luzon, following the Philippine Statistics Authority. */
const raw = {
  Luzon: [
    ['Banaue Rice Terraces', 'Ifugao, Cordillera', 16.9167, 121.0597, 'Hand-carved terraces that Ifugao communities have farmed for generations.'],
    ['Vigan Historic City', 'Ilocos Sur', 17.5747, 120.3869, 'Cobbled Calle Crisologo and Spanish-era ancestral houses, still lived in.'],
    ['Mayon Volcano', 'Albay, Bicol', 13.257, 123.6856, 'A near-perfect cone and the most active volcano in the country.'],
    ['Intramuros', 'Manila', 14.5896, 120.9747, 'The walled city of gates, churches and Fort Santiago.'],
    ['Hundred Islands', 'Alaminos, Pangasinan', 16.2, 119.9, 'A scatter of small limestone islands for kayaking, snorkeling and island hopping.'],
    ['Puerto Princesa Underground River', 'Palawan', 10.1667, 118.9167, 'A navigable river running through a cave, listed as a UNESCO World Heritage Site.'],
    ['El Nido', 'Palawan', 11.1784, 119.393, 'Limestone cliffs, hidden lagoons and clear bays around Bacuit Archipelago.'],
    ['Taal Volcano', 'Batangas', 14.0113, 120.998, 'A small volcano inside a lake, viewed from the ridge at Tagaytay.'],
    ['Sagada', 'Mountain Province', 17.0742, 120.901, 'Cool mountain town known for hanging coffins, caves and rice-terrace hikes.'],
    ['Mount Pulag', 'Benguet, Cordillera', 16.5958, 120.8883, 'The sea of clouds at sunrise from the third-highest peak in the country.']
  ],
  Visayas: [
    ['Chocolate Hills', 'Bohol', 9.8296, 124.1394, 'More than a thousand grass-covered mounds that turn brown in the dry season.'],
    ['Boracay', 'Aklan', 11.9674, 121.9248, 'White Beach, sunsets and a lively shoreline on a small island.'],
    ["Magellan's Cross", 'Cebu City', 10.2934, 123.9021, 'A cross traditionally linked to the arrival of Christianity in 1521.'],
    ['Basilica del Santo Niño', 'Cebu City', 10.2943, 123.9019, 'The church that houses the Santo Niño de Cebu and anchors the Sinulog festival.'],
    ['Miagao Church', 'Iloilo', 10.6446, 122.235, 'A hilltop fortress church with a carved façade, a UNESCO World Heritage Site.'],
    ['Kawasan Falls', 'Badian, Cebu', 9.8, 123.3644, 'Turquoise multi-tiered falls reached by a river trail.'],
    ['Moalboal', 'Cebu', 9.9467, 123.3961, 'Snorkel beside a huge sardine school just off the shore.'],
    ['Malapascua Island', 'Daanbantayan, Cebu', 11.3333, 124.1167, 'A quiet island known for diving with thresher sharks.'],
    ['Panglao and Alona Beach', 'Bohol', 9.5436, 123.7686, 'Beaches, reef diving and a base for Bohol tours.'],
    ['Siquijor', 'Siquijor', 9.2, 123.5, 'The "island of fire", with waterfalls, old churches and white-sand coves.']
  ],
  Mindanao: [
    ['Mount Apo', 'Davao and Cotabato', 6.9876, 125.2705, 'The highest peak in the Philippines at 2,954 meters.'],
    ['Island Garden City of Samal', 'Davao del Norte', 7.0667, 125.7, 'Beach resorts and caves a short boat ride from Davao City.'],
    ['Siargao', 'Surigao del Norte', 9.8143, 126.1627, 'Surf at Cloud 9, plus lagoons and palm-lined roads.'],
    ['Enchanted River', 'Hinatuan, Surigao del Sur', 8.3706, 126.3317, 'A deep, brilliant-blue spring that flows to the sea.'],
    ['Tinuy-an Falls', 'Bislig, Surigao del Sur', 8.5278, 126.1422, 'A wide, tiered curtain of water, often called the Niagara of the Philippines.'],
    ['Lake Sebu', 'South Cotabato', 6.2167, 124.7, 'Highland lakes and the T\'boli culture, with its weaving and brasswork.'],
    ['Camiguin', 'Camiguin', 9.17, 124.72, 'A small volcanic island with hot springs, waterfalls and a sunken cemetery.'],
    ['Great Santa Cruz Island', 'Zamboanga City', 6.9, 122.0667, 'A protected island with pinkish sand from crushed red coral.'],
    ['Mount Hamiguitan', 'Davao Oriental', 6.7, 126.17, 'A UNESCO-listed range of pygmy forest and rare wildlife.'],
    ['Dahican Beach', 'Mati, Davao Oriental', 6.88, 126.3, 'A long surf beach known for its skimboarding and sea turtle releases.']
  ]
}

export const REGION_COLORS = { Luzon: '#b4472f', Visayas: '#c8962e', Mindanao: '#2f7a6b' }
export const REGION_LIST = Object.keys(raw)
export const SPOTS = REGION_LIST.flatMap((region) =>
  raw[region].map(([name, place, lat, lng, desc], i) => ({
    id: `${region.toLowerCase()}-${i + 1}`, region, rank: i + 1, name, place, lat, lng, desc
  }))
)
