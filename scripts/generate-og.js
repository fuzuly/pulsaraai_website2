import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputPath = path.resolve(__dirname, '../public/og-default.png')

// 1200×630 SVG rendered by sharp → PNG
// sharp uses librsvg which handles gradients, text, and shapes reliably.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e0a3c"/>
      <stop offset="100%" stop-color="#0d0620"/>
    </linearGradient>
    <radialGradient id="blob1" cx="20%" cy="25%" r="50%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blob2" cx="80%" cy="75%" r="50%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c4b5fd"/>
      <stop offset="50%" stop-color="#93c5fd"/>
      <stop offset="100%" stop-color="#c4b5fd"/>
    </linearGradient>
    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0"/>
      <stop offset="30%" stop-color="#7c3aed" stop-opacity="0.7"/>
      <stop offset="70%" stop-color="#3b82f6" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Glow blobs -->
  <ellipse cx="240" cy="157" rx="480" ry="360" fill="url(#blob1)"/>
  <ellipse cx="960" cy="472" rx="420" ry="320" fill="url(#blob2)"/>

  <!-- Subtle grid -->
  <g stroke="#7c3aed" stroke-opacity="0.06" stroke-width="1">
    <line x1="0" y1="105" x2="1200" y2="105"/>
    <line x1="0" y1="210" x2="1200" y2="210"/>
    <line x1="0" y1="315" x2="1200" y2="315"/>
    <line x1="0" y1="420" x2="1200" y2="420"/>
    <line x1="0" y1="525" x2="1200" y2="525"/>
    <line x1="200" y1="0" x2="200" y2="630"/>
    <line x1="400" y1="0" x2="400" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="800" y1="0" x2="800" y2="630"/>
    <line x1="1000" y1="0" x2="1000" y2="630"/>
  </g>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="1200" height="3" fill="url(#lineGrad)"/>

  <!-- Logo icon — stylised pulse/wave mark -->
  <g transform="translate(476, 188)">
    <polyline
      points="0,24 30,24 45,6 60,42 75,10 90,32 110,24 248,24"
      fill="none"
      stroke="url(#titleGrad)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>

  <!-- "Pulsara AI" wordmark -->
  <text
    x="600" y="310"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="100"
    font-weight="300"
    letter-spacing="-2"
    text-anchor="middle"
    fill="url(#titleGrad)"
  >Pulsara AI</text>

  <!-- Divider -->
  <rect x="350" y="334" width="500" height="1" fill="url(#lineGrad)"/>

  <!-- Tagline -->
  <text
    x="600" y="386"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="26"
    font-weight="300"
    letter-spacing="0.5"
    text-anchor="middle"
    fill="#a78bfa"
  >Enterprise AI &amp; IoT Solutions</text>

  <!-- Sub-tagline -->
  <text
    x="600" y="426"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="18"
    font-weight="300"
    text-anchor="middle"
    fill="#64748b"
  >AI Consulting · Custom Development · Integrations</text>

  <!-- Stat chips -->
  <g font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" text-anchor="middle">
    <rect x="274" y="478" width="160" height="58" rx="12" fill="#ffffff" fill-opacity="0.04" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>
    <text x="354" y="504" font-size="22" font-weight="700" fill="white">40+</text>
    <text x="354" y="524" font-size="12" fill="#64748b">Systems Live</text>

    <rect x="520" y="478" width="160" height="58" rx="12" fill="#ffffff" fill-opacity="0.04" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>
    <text x="600" y="504" font-size="22" font-weight="700" fill="white">8 weeks</text>
    <text x="600" y="524" font-size="12" fill="#64748b">To Production</text>

    <rect x="766" y="478" width="160" height="58" rx="12" fill="#ffffff" fill-opacity="0.04" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>
    <text x="846" y="504" font-size="22" font-weight="700" fill="white">2</text>
    <text x="846" y="524" font-size="12" fill="#64748b">Official Partnerships</text>
  </g>

  <!-- Domain watermark -->
  <text
    x="600" y="604"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="14"
    letter-spacing="1"
    text-anchor="middle"
    fill="#64748b"
    fill-opacity="0.5"
  >pulsaraai.com</text>
</svg>
`

sharp(Buffer.from(svg))
  .png()
  .toFile(outputPath)
  .then(() => {
    console.log(`✓ OG image generated → ${outputPath}`)
  })
  .catch((err) => {
    console.error('✗ Failed to generate OG image:', err.message)
    process.exit(1)
  })
