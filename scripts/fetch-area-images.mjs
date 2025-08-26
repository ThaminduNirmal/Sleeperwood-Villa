import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import https from 'node:https'
import sharp from 'sharp'
import { createClient } from 'pexels'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.join(__dirname, '..')
const envLocalPath = path.join(projectRoot, '.env.local')
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath })
} else {
  dotenv.config()
}

const PEXELS_API_KEY = process.env.PEXELS_API_KEY
if (!PEXELS_API_KEY) {
  console.error('Missing PEXELS_API_KEY')
  process.exit(1)
}

const pexels = createClient(PEXELS_API_KEY)

const outDir = path.join(__dirname, '..', 'public', 'images', 'area')
fs.mkdirSync(outDir, { recursive: true })

const manifestPath = path.join(__dirname, 'area-manifest.json')

const ratioMap = {
  'area-unawatuna-hero.jpg': ['16:9', 1920],
  'area-unawatuna-waves.jpg': ['4:3', 1800],
  'area-unawatuna-evening-cafes.jpg': ['3:2', 1800],
  'area-jungle-beach-cove.jpg': ['16:9', 1920],
  'area-jungle-beach-snorkeling.jpg': ['4:3', 1800],
  'area-peace-pagoda-exterior.jpg': ['3:2', 1800],
  'area-peace-pagoda-viewpoint.jpg': ['16:9', 1920],
  'area-galle-fort-lighthouse.jpg': ['16:9', 1920],
  'area-galle-fort-street.jpg': ['3:2', 1800],
  'area-dalawella-rope-swing-action.jpg': ['16:9', 1920],
  'area-dalawella-rope-swing.jpg': ['4:3', 1800],
  'area-local-tuk-tuks.jpg': ['3:2', 1800],
  'area-local-fruit-stand.jpg': ['4:3', 1800],
  'area-local-seafood-plate.jpg': ['4:3', 1800],
  'area-local-coconut-vendor.jpg': ['3:2', 1800]
}

let targets = []
if (fs.existsSync(manifestPath)) {
  const raw = fs.readFileSync(manifestPath, 'utf8')
  const map = JSON.parse(raw)
  targets = Object.entries(map).map(([filename, url]) => {
    const [ratio, width] = ratioMap[filename] || ['3:2', 1800]
    return { source: 'url', url, ratio, width, filename }
  })
} else {
  targets = []
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchBuffer(res.headers.location))
      }
      if (res.statusCode !== 200) {
        reject(new Error('HTTP ' + res.statusCode + ' for ' + url))
        return
      }
      const chunks = []
      res.on('data', d => chunks.push(d))
      res.on('end', () => resolve(Buffer.concat(chunks)))
    }).on('error', reject)
  })
}

async function searchPexels(query) {
  const res = await pexels.photos.search({ query, per_page: 1, orientation: 'landscape' })
  const photo = res.photos && res.photos[0]
  if (!photo) throw new Error('No Pexels result for ' + query)
  const url = photo.src.original || photo.src.large2x || photo.src.large
  return fetchBuffer(url)
}

async function searchUnsplash(query) {
  const encoded = encodeURIComponent(query)
  const seedSize = '2000x1333'
  const url = `https://source.unsplash.com/${seedSize}/?${encoded}`
  return fetchBuffer(url)
}

function fromUnsplashPhotoUrl(pageUrl) {
  try {
    const u = new URL(pageUrl)
    const parts = u.pathname.split('/')
    const id = parts.pop() || parts.pop()
    return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`
  } catch {
    return pageUrl
  }
}

async function fromPexelsPhotoPage(pageUrl) {
  const match = pageUrl.match(/pexels\.com\/photo\/[^/]*?(\d+)\/?/)
  if (!match) return fetchBuffer(pageUrl)
  const id = Number(match[1])
  const photo = await pexels.photos.show({ id })
  const url = photo.src.original || photo.src.large2x || photo.src.large
  return fetchBuffer(url)
}

function fromWikipediaFileUrl(pageUrl) {
  const m = pageUrl.match(/\/File:([^?#\s]+\.(?:jpg|jpeg|png))/i)
  const fileName = m ? m[1] : null
  if (!fileName) return fetchBuffer(pageUrl)
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`
  return fetchBuffer(url)
}

function toResizeOptions(ratio, width) {
  if (ratio === '16:9') return { width, height: Math.round((9 / 16) * width) }
  if (ratio === '4:3') return { width, height: Math.round((3 / 4) * width) }
  if (ratio === '3:2') return { width, height: Math.round((2 / 3) * width) }
  return { width }
}

async function processImage(inputBuffer, ratio, width) {
  const { height } = toResizeOptions(ratio, width)
  let pipeline = sharp(inputBuffer).rotate().resize({ width, height, fit: 'cover', position: 'entropy' }).jpeg({ quality: 76, mozjpeg: true })
  let output = await pipeline.toBuffer()
  let quality = 72
  while (output.length > 380_000 && quality >= 50) {
    output = await sharp(inputBuffer).rotate().resize({ width, height, fit: 'cover', position: 'entropy' }).jpeg({ quality, mozjpeg: true }).toBuffer()
    quality -= 4
  }
  return output
}

async function run() {
  for (const t of targets) {
    try {
      const dest = path.join(outDir, t.filename)
      let buf
      if (t.source === 'url') {
        if (/unsplash\.com\/photos\//i.test(t.url)) buf = await fetchBuffer(fromUnsplashPhotoUrl(t.url))
        else if (/wikipedia\.org\/wiki\/File:/i.test(t.url)) buf = await fromWikipediaFileUrl(t.url)
        else if (/pexels\.com\/photo\//i.test(t.url)) buf = await fromPexelsPhotoPage(t.url)
        else buf = await fetchBuffer(t.url)
      } else if (t.source === 'pexels') {
        buf = await searchPexels(t.query)
      } else {
        buf = await searchUnsplash(t.query)
      }
      const processed = await processImage(buf, t.ratio, t.width)
      fs.writeFileSync(dest, processed)
      console.log('Saved', t.filename, Math.round(processed.length / 1024) + 'KB')
    } catch (e) {
      console.error('Failed', t.filename, e.message)
    }
  }
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})


