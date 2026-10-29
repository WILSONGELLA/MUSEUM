import { getImageUrl, getVideoUrl } from '../assets.js'

/* Media if the exhibit has it, otherwise its icon. */
export default function Art({ x }) {
  if (x.video) {
    return <video src={getVideoUrl(x.video)} controls preload="metadata" aria-label={`${x.title || x.t || 'Exhibit'} video`} />
  }
  return x.img
    ? <img src={getImageUrl(x.img)} alt={x.alt} loading="lazy" />
    : <i className={`fa-solid ${x.ic}`} aria-hidden="true" />
}
