const express = require('express')
const path = require('path')
const { generateBratBuffer, THEMES } = require('./src/brat')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/brat', async (req, res) => {
  try {
    const text = String(req.query.text || 'Brat Canvas 🎨').trim()
    const theme = String(req.query.theme || 'white').toLowerCase()
    const blur = Number(req.query.blur || 0)

    if (!text) {
      return res.status(400).json({
        status: false,
        message: 'Parameter text wajib diisi.'
      })
    }

    if (text.length > 500) {
      return res.status(400).json({
        status: false,
        message: 'Text maksimal 500 karakter.'
      })
    }

    if (!Object.keys(THEMES).includes(theme)) {
      return res.status(400).json({
        status: false,
        message: 'Theme hanya boleh black, white, atau green.'
      })
    }

    if (![0, 1, 2, 3].includes(blur)) {
      return res.status(400).json({
        status: false,
        message: 'Blur hanya boleh 0, 1, 2, atau 3.'
      })
    }

    const buffer = await generateBratBuffer({ text, theme, blur })

    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'public, max-age=60')
    res.setHeader('Content-Disposition', 'inline; filename="brat.png"')
    return res.send(buffer)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: false,
      message: error.message || 'Internal Server Error'
    })
  }
})

app.listen(PORT, () => {
  console.log(`BRAT Generator running at http://localhost:${PORT}`)
})
