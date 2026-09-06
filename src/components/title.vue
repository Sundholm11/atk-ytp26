<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ytpLogoColdWhite from '@images/ytplogo-coldwhite.svg?url'
import ytpLogoDarkGrey from '@images/ytplogo-darkgrey.svg?url'

const tagline = ref('Never stop the madness')
const taglineMarkup = ref('Never stop the madness')
const titleGlitch = ref(false)
const countdownStyle = ref({})
const countdown = ref({ days: '00', hours: '00', minutes: '00', seconds: '00' })
const canvas = ref(null)
const units = [
  { key: 'days', label: 'päivää' },
  { key: 'hours', label: 'tuntia' },
  { key: 'minutes', label: 'minuuttia' },
  { key: 'seconds', label: 'sekuntia' },
]
const phrases = ['Never stop the madness', 'Älä koskaan pysäytä hulluutta', 'Och samma på svenska']
let countdownTimer = 0
let glitchTimer = 0
let taglineTimer = 0
let animationFrame = 0
let scrambleFrame = 0
let taglineStopped = false
let context = null
let resizeHandler = null

const pad = (value) => String(value).padStart(2, '0')

const updateCountdown = () => {
  const difference = Math.max(0, new Date('2026-10-14T09:00:00+03:00').getTime() - Date.now())

  countdown.value = {
    days: pad(Math.floor(difference / 86400000)),
    hours: pad(Math.floor((difference % 86400000) / 3600000)),
    minutes: pad(Math.floor((difference % 3600000) / 60000)),
    seconds: pad(Math.floor((difference % 60000) / 1000)),
  }

  if (difference <= 0) {
    taglineStopped = true
    cancelAnimationFrame(scrambleFrame)
    tagline.value = 'Nyt käynnissä'
    taglineMarkup.value = 'Nyt käynnissä'
  }
}

const scramble = (next) => {
  const previous = tagline.value
  const chars = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'
  const length = Math.max(previous.length, next.length)
  let frame = 0
  const queue = Array.from({ length }, (_, index) => {
    const start = Math.floor(Math.random() * 20)
    return { from: previous[index] || '', to: next[index] || '', start, end: start + Math.floor(Math.random() * 20) + 10 }
  })
  cancelAnimationFrame(scrambleFrame)
  const animate = () => {
    let output = ''
    let complete = 0
    queue.forEach((item) => {
      if (frame >= item.end) {
        complete += 1
        output += item.to
      } else if (frame >= item.start) {
        item.char = item.char && Math.random() >= 0.28 ? item.char : chars[Math.floor(Math.random() * chars.length)]
        output += `<span class="dud">${item.char}</span>`
      } else output += item.from
    })
    taglineMarkup.value = output
    tagline.value = output.replace(/<[^>]+>/g, '')
    if (complete === queue.length) {
      taglineMarkup.value = next
      tagline.value = next
    }
    else {
      scrambleFrame = requestAnimationFrame(animate)
      frame += 1
    }
  }
  animate()
}

const startVhs = () => {
  if (!canvas.value || !context) return
  const buffer = document.createElement('canvas')
  const bufferContext = buffer.getContext('2d')
  if (!bufferContext) return
  const scale = 3
  let width = 0
  let height = 0
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const bands = [
    { y: Math.random(), speed: 0.0009, height: 0.03, tint: [255, 255, 255] },
    { y: Math.random(), speed: 0.0006, height: 0.015, tint: [33, 230, 255] },
    { y: Math.random(), speed: 0.0011, height: 0.012, tint: [255, 47, 146] },
  ]
  const resize = () => {
    if (!canvas.value || !context) return
    canvas.value.width = innerWidth
    canvas.value.height = innerHeight
    width = Math.ceil(canvas.value.width / scale)
    height = Math.ceil(canvas.value.height / scale)
    buffer.width = width
    buffer.height = height
    context.imageSmoothingEnabled = false
  }
  resizeHandler = resize
  window.addEventListener('resize', resize)
  resize()
  const draw = () => {
    if (!canvas.value || !context) return
    const image = bufferContext.createImageData(width, height)
    for (let index = 0; index < image.data.length; index += 4) {
      const value = 40 + Math.random() * 60
      image.data[index] = value
      image.data[index + 1] = value
      image.data[index + 2] = value
      image.data[index + 3] = 255
    }
    bufferContext.putImageData(image, 0, 0)
    bufferContext.globalCompositeOperation = 'multiply'
    bufferContext.fillStyle = 'rgba(255,255,255,1)'
    for (let y = 0; y < height; y += 2) bufferContext.fillRect(0, y, width, 1)
    bufferContext.globalCompositeOperation = 'source-over'
    bands.forEach((band) => {
      bufferContext.fillStyle = `rgba(${band.tint.join(',')},${0.06 + Math.random() * 0.05})`
      bufferContext.fillRect(0, band.y * height, width, band.height * height)
      if (!reduceMotion) band.y = band.y > 1.2 ? -0.2 : band.y + band.speed
    })
    if (!reduceMotion && Math.random() < 0.02) {
      bufferContext.fillStyle = 'rgba(255,255,255,0.08)'
      bufferContext.fillRect(0, 0, width, height)
    }
    context.clearRect(0, 0, canvas.value.width, canvas.value.height)
    context.drawImage(buffer, 0, 0, width, height, 0, 0, canvas.value.width, canvas.value.height)
    if (!reduceMotion && Math.random() < 0.015) {
      const stripHeight = 6 + Math.random() * 10
      const stripY = Math.random() * canvas.value.height
      const shift = (Math.random() - 0.5) * 16
      const strip = context.getImageData(0, stripY, canvas.value.width, stripHeight)
      context.putImageData(strip, shift, stripY)
    }
    animationFrame = requestAnimationFrame(draw)
  }
  draw()
}

onMounted(() => {
  context = canvas.value.getContext('2d')
  updateCountdown()
  countdownTimer = window.setInterval(updateCountdown, 1000)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion) {
    let phraseIndex = 0
    const nextPhrase = () => {
        if (taglineStopped) return
      if (taglineStopped) return
      scramble(phrases[phraseIndex % phrases.length])
      phraseIndex += 1
      taglineTimer = window.setTimeout(nextPhrase, 2200)
    }
    nextPhrase()
  }
  const glitch = () => {
    if (!reduceMotion) {
      titleGlitch.value = true
      countdownStyle.value = {
        filter: 'contrast(1.3) saturate(1.4)',
        transform: `translateX(${(Math.random() * 6 - 3).toFixed(1)}px)`,
      }
      const glitchDuration = 120 + Math.random() * 100
      window.setTimeout(() => {
        titleGlitch.value = false
        countdownStyle.value = {}
      }, glitchDuration)
    }
    glitchTimer = window.setTimeout(glitch, 2500 + Math.random() * 3500)
  }
  glitch()
  const bgWrap = document.getElementById('bgWrap')
  const turb = document.getElementById('crtTurb')
  if (reduceMotion) {
    if (bgWrap) bgWrap.style.filter = 'none'
    const animation = turb && turb.querySelector('animate')
    if (animation) animation.setAttribute('repeatCount', '0')
  }
  startVhs()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame)
  cancelAnimationFrame(scrambleFrame)
  window.clearInterval(countdownTimer)
  window.clearTimeout(glitchTimer)
  window.clearTimeout(taglineTimer)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
})
</script>

<template>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <filter id="crtWave" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence id="crtTurb" type="fractalNoise" baseFrequency="0.002 0.012" numOctaves="2" seed="7" result="turb">
        <animate attributeName="baseFrequency" values="0.0018 0.011;0.0035 0.017;0.0018 0.011" dur="9s" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="turb" scale="12" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </svg>

  <div class="bg-wrap">
    <div class="colorbars">
      <div v-for="row in ['top', 'mid', 'bottom']" :key="row" class="cb-row" :class="`cb-${row}`">
        <div v-for="index in 7" :key="index" />
      </div>
    </div>
    <canvas id="vhs-bg" ref="canvas" />
  </div>

    <div class="vignette" />

  <div class="stage">
    <div class="title-panel">
      <div class="label-wrap">
        <div class="reel spin" />
        <div class="logo-wrap" :class="{ glitching: titleGlitch }" aria-label="ATK-YTP" >
          <img class="logo-base" :src="ytpLogoColdWhite" alt="ATK-YTP" />
          <img class="logo-g1" :src="ytpLogoColdWhite" alt="" aria-hidden="true" />
          <img class="logo-g2" :src="ytpLogoDarkGrey" alt="" aria-hidden="true" />
        </div>
        <div class="reel spin" />
      </div>

      <div class="tagline" aria-live="polite">{{ tagline }}</div>

      <div class="countdown">
        <div v-for="unit in units" :key="unit.key" class="unit">
          <div class="num">{{ countdown[unit.key] }}</div>
          <div class="lbl">{{ unit.label }}</div>
        </div>
      </div>

      <div class="date-location">TURKU <br /> 14.10.2026 - 16.10.2026</div>
    </div>
  </div>
</template>

<style>
:root{
  --magenta: #ff2f92;
  --cyan: #21e6ff;
  --cream: #ded7c4;

  /* NOT USED CURRENTLY
  --bg: #0b0b12;
  --bg2: #15121d;
  --red: #ff3b3b;
  --yellow: #ffcf3f;
  --ink: #1a1710;
  --paper-shadow: rgba(0,0,0,0.5);
  */
}

*{ box-sizing: border-box; }

html, body{
  margin:0; padding:0; height:100%;
  background: #050508;
  color: var(--cream);
  font-family: var(--font-space-mono), monospace;
  overflow-x: hidden;
  overflow-y: auto;
}

/* ---------- SMPTE-style colour bar backdrop ---------- */
.bg-wrap{
  position: fixed;
  inset: 0;
  z-index: 0;
  filter: url(#crtWave);
}

.colorbars{
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
}
.cb-row{ display:flex; width:100%; }
.cb-row > div{ flex: 1 1 0; }

.cb-top{ flex: 0 0 66%; }
.cb-top > div:nth-child(1){ background:#c0c0c0; }
.cb-top > div:nth-child(2){ background:#c0c000; }
.cb-top > div:nth-child(3){ background:#00c0c0; }
.cb-top > div:nth-child(4){ background:#00c000; }
.cb-top > div:nth-child(5){ background:#c000c0; }
.cb-top > div:nth-child(6){ background:#c00000; }
.cb-top > div:nth-child(7){ background:#0000c0; }

.cb-mid{ flex: 0 0 8%; }
.cb-mid > div:nth-child(1){ background:#0000c0; }
.cb-mid > div:nth-child(2){ background:#141414; }
.cb-mid > div:nth-child(3){ background:#c000c0; }
.cb-mid > div:nth-child(4){ background:#141414; }
.cb-mid > div:nth-child(5){ background:#00c0c0; }
.cb-mid > div:nth-child(6){ background:#141414; }
.cb-mid > div:nth-child(7){ background:#c0c0c0; }

.cb-bottom{ flex: 1 1 auto; display:flex; }
.cb-bottom > div:nth-child(1){ background:#00214d; flex: 1.4; }
.cb-bottom > div:nth-child(2){ background:#f2f2f2; flex: 1; }
.cb-bottom > div:nth-child(3){ background:#2a0a55; flex: 1.4; }
.cb-bottom > div:nth-child(4){ background:#0d0d0d; flex: 2.6; }
.cb-bottom > div:nth-child(5){ background:#050505; flex: 0.6; }
.cb-bottom > div:nth-child(6){ background:#161616; flex: 0.6; }
.cb-bottom > div:nth-child(7){ background:#0d0d0d; flex: 1.4; }

#vhs-bg{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: overlay;
}

.stage{
  position: relative;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 4vh, 48px);
}

.vignette{
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%);
}

/* dark caption panel so text stays legible over busy colour bars */
.title-panel{
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(20px, 4vh, 48px);
  padding: clamp(24px,5vh,56px) clamp(20px,6vw,72px);
  background: rgba(4, 4, 8, 0.75);
  backdrop-filter: blur(2px);
  max-width: 680px;
}

/* ---------- cassette label / title ---------- */
.label-wrap{
  position:relative;
  display:flex; align-items:center; justify-content:center;
  gap: clamp(10px, 2vw, 28px);
}

.logo-wrap{
  position:relative;
  width: clamp(220px, 42vw, 480px);
  aspect-ratio: 687 / 330;
}
.logo-g1, .logo-g2{
  opacity:0;
  mask-size: contain; mask-repeat:no-repeat; mask-position:center;
  -webkit-mask-size: contain; -webkit-mask-repeat:no-repeat; -webkit-mask-position:center;
}
/*.glitching .logo-g1{ background: var(--magenta); opacity:0.8; transform: translate(3px,-1px); mix-blend-mode: screen; } */
/*.glitching .logo-g2{ background: var(--cyan); opacity:0.8; transform: translate(-3px,1px); mix-blend-mode: screen; } */

.tagline{
  font-size: clamp(0.7rem, 1.6vw, 1rem);
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #ffffff;
  opacity: 0.85;
  text-shadow: 0 0 10px rgba(255,255,255,0.3);
  text-align:center;
  padding: 0 16px;
}
.tagline .dud{
  color: var(--cyan);
  opacity: 0.6;
}

/* ---------- countdown ---------- */
.countdown{
  display:flex;
  gap: clamp(50px, 2.2vw, 22px);
}
.unit{
  display:flex; flex-direction:column; align-items:center;
  background: linear-gradient(180deg, #100e17, #08070c);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  /* padding: clamp(8px,1.6vh,16px) clamp(10px,2vw,22px); */
  min-width: clamp(58px, 12vw, 110px);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.03), 0 10px 20px rgba(0,0,0,0.5);
  position:relative;
}
.unit .num{
  font-family: var(--font-vcr);
  font-size: clamp(2.2rem, 7vw, 4.6rem);
  line-height:1;
  color: #ffffff;
  text-shadow: 0 0 6px rgba(255,255,255,0.4);
  font-variant-numeric: tabular-nums;
}
.unit .lbl{
  font-family: var(--font-vcr);
  margin-top: 6px;
  font-size: clamp(0.55rem, 1.2vw, 0.7rem);
  letter-spacing: 0.2em;
  color: #ffffff;
  opacity:0.7;
  align-self:stretch;
  text-align:center;
}

.date-location {
  font-size: clamp(0.65rem, 1.3vw, 0.8rem);
  letter-spacing: 0.25em;
  color: #ffffff;
  opacity:0.55;
  text-align:center;
}

@media (max-width: 560px) {
  .countdown{ flex-wrap: wrap; justify-content:center; max-width: 320px; }
  .reel{ display:none; }
  .content-panel{ padding: clamp(18px,5vh,32px) clamp(14px,5vw,28px); }
}

@media (max-width: 360px) {
  .title{ font-size: clamp(2rem, 15vw, 8rem); }
}

@media (prefers-reduced-motion: reduce) {
  .reel.spin{ animation: none !important; }
}

.logo-wrap {
  position: relative;
  display: inline-block;
}

.logo-base,
.logo-g1,
.logo-g2 {
  display: block;
  width: 100%;
  height: auto;
}

.logo-g1,
.logo-g2 {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
}

.logo-wrap.glitching .logo-g1 {
  opacity: 1;
  animation: glitch-1 180ms steps(3, end) infinite;
  background: var(--magenta);
  mix-blend-mode: screen;
}

.logo-wrap.glitching .logo-g2 {
  opacity: 1;
  animation: glitch-2 140ms steps(3, end) infinite;
  background: var(--cyan);
  mix-blend-mode: screen;
}

@keyframes glitch-1 {
  0% {
    clip-path: inset(20% 0 65% 0);
    transform: translate(-4px, 0);
  }

  25% {
    clip-path: inset(70% 0 10% 0);
    transform: translate(5px, 0);
  }

  50% {
    clip-path: inset(40% 0 35% 0);
    transform: translate(-2px, 0);
  }

  75% {
    clip-path: inset(5% 0 80% 0);
    transform: translate(3px, 0);
  }

  100% {
    clip-path: inset(55% 0 20% 0);
    transform: translate(-4px, 0);
  }
}

@keyframes glitch-2 {
  0% {
    clip-path: inset(60% 0 15% 0);
    transform: translate(4px, 0);
  }

  30% {
    clip-path: inset(10% 0 70% 0);
    transform: translate(-5px, 0);
  }

  60% {
    clip-path: inset(35% 0 40% 0);
    transform: translate(2px, 0);
  }

  100% {
    clip-path: inset(75% 0 5% 0);
    transform: translate(5px, 0);
  }
}
</style>