const form = document.getElementById('bratForm')
const textInput = document.getElementById('text')
const themeInput = document.getElementById('theme')
const blurInput = document.getElementById('blur')
const blurValue = document.getElementById('blurValue')
const count = document.getElementById('count')
const preview = document.getElementById('preview')
const requestUrl = document.getElementById('requestUrl')
const openImage = document.getElementById('openImage')
const downloadBtn = document.getElementById('downloadBtn')
const copyBtn = document.getElementById('copyBtn')
const generateBtn = document.getElementById('generateBtn')

function buildUrl() {
  const params = new URLSearchParams({
    text: textInput.value.trim() || 'Brat Canvas 🎨',
    theme: themeInput.value,
    blur: blurInput.value
  })

  return `/api/brat?${params.toString()}`
}

function updateUi() {
  const url = buildUrl()
  blurValue.textContent = blurInput.value
  count.textContent = `${textInput.value.length}/500`
  requestUrl.textContent = url
  openImage.href = url
  downloadBtn.href = url
}

async function generateImage() {
  const url = `${buildUrl()}&t=${Date.now()}`

  generateBtn.disabled = true
  generateBtn.textContent = 'Generating...'
  preview.style.opacity = '.45'
  preview.style.transform = 'scale(.96) rotate(-1deg)'

  await new Promise((resolve) => setTimeout(resolve, 250))

  preview.src = url
  preview.onload = () => {
    preview.style.opacity = '1'
    preview.style.transform = 'scale(1) rotate(0deg)'
    generateBtn.disabled = false
    generateBtn.textContent = 'Generate BRAT'
  }

  preview.onerror = () => {
    generateBtn.disabled = false
    generateBtn.textContent = 'Generate BRAT'
    alert('Gagal generate gambar. Cek server/backend kamu.')
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  updateUi()
  await generateImage()
})

textInput.addEventListener('input', updateUi)
themeInput.addEventListener('change', updateUi)
blurInput.addEventListener('input', updateUi)

copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(`${location.origin}${buildUrl()}`)
  copyBtn.textContent = 'COPIED'
  setTimeout(() => {
    copyBtn.textContent = 'COPY'
  }, 1200)
})

updateUi()
