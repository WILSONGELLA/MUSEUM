import heroVideo from './assets/video/herovideo.mp4'

const imageAssets = import.meta.glob('./assets/images/*', {
  eager: true,
  import: 'default',
  query: '?url'
})

const videoAssets = import.meta.glob('./assets/video/*', {
  eager: true,
  import: 'default',
  query: '?url'
})

export { heroVideo }

export function getImageUrl(filename) {
  const url = imageAssets[`./assets/images/${filename}`]
  if (typeof url !== 'string') {
    throw new Error(`Image asset not found: ${filename}`)
  }
  return url
}

export function getVideoUrl(filename) {
  const url = videoAssets[`./assets/video/${filename}`]
  if (typeof url !== 'string') {
    throw new Error(`Video asset not found: ${filename}`)
  }
  return url
}
