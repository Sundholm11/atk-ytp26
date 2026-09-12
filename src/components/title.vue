<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ytpLogoColdWhite from '@images/ytplogo-pixel-coldwhite.svg?url'
//import ytpLogoDarkGrey from '@images/ytplogo-darkgrey.svg?url'

const tagline = ref('Never stop the madness')
const taglineMarkup = ref('Never stop the madness')
const titleGlitch = ref(false)
const countdownStyle = ref({})
const countdown = ref({ days: '00', hours: '00', minutes: '00', seconds: '00' })
const units = [
  { key: 'days', label: 'päivää' },
  { key: 'hours', label: 'tuntia' },
  { key: 'minutes', label: 'minuuttia' },
  { key: 'seconds', label: 'sekuntia' },
]
const phrases = [
  'Varokaa jokituupparia',
  'Never stop the madness',
  'Och samma på svenska',
  'Lahnan pää ku lamppan pää, hauen pää ku halon pää, kuhan pää ku Juhan pää',
  'Zyn zyn zyn zyn zyn zyn zyn zyn zyn zyn',
  'Gogoustauko',
  'Avataan gogous ajassa',
  'Funikulaari toiminnassa',
  'Funikulaari epäkunnossa',
  'Täl puol vai tois puol jokke',
  'Iha ok juttu mut ootko kattonu YTP sarjasta jakson miljoonan mäen Turku',
  'Miten voi suorittaa neljännes triathlonin jos siinä on vaan kolme lajia',
  'Hyvää pönkeliwappua',
  'Hunajata, hunajata, hunajata sulle',
  'Ja mä maksan kovaa hintaa',
  'Niin se menee ymmärrän, pääpöytä ymmärrä mua ei',
  'Muuttaako se lopulta niitä päiviä, jotka sun kanssa vietin mä kerran Turussa',
  'Agoralle siis polkuni käy ja reppu kilisee - kaljaa',
  'Mä Lynin vessaan käperryn ”Poke, salli yöksi jään” mut kun aamu on, mä majostani herään',
  'Kunnes kerran kuihtuu ruusu rinnassain',
  'Ajamassa skuuttei aurajokeen',
  'Onko setti?',
  'PGP pilligate',
  'AATUillaanhan taas yhdessä <3',
  'Liikuntavastaavan vika',
  'Piltit sekoo',
  'Paskapostatkaa @asteriski jodelissa',
  'Ratikka tulee - tule sinäkin!',
  'Monelt Petri alottaa',
  'Varför Paris vi har ju Åbo'
]
const longestPhrase = phrases.reduce((longest, phrase) => phrase.length > longest.length ? phrase : longest, '')
let countdownTimer = 0
let glitchTimer = 0
let taglineTimer = 0
let scrambleFrame = 0
let taglineStopped = false

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

onMounted(() => {
  updateCountdown()
  countdownTimer = window.setInterval(updateCountdown, 1000)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion) {
    const nextPhrase = () => {
      if (taglineStopped) return
      const availablePhrases = phrases.filter((phrase) => phrase !== tagline.value)
      const next = availablePhrases[Math.floor(Math.random() * availablePhrases.length)]
      scramble(next)
      taglineTimer = window.setTimeout(nextPhrase, 5000)
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
})

onBeforeUnmount(() => {
  cancelAnimationFrame(scrambleFrame)
  window.clearInterval(countdownTimer)
  window.clearTimeout(glitchTimer)
  window.clearTimeout(taglineTimer)
})
</script>

<template>
  <div class="title-hero">
    <div class="title-panel">
      <div class="label-wrap">
        <div class="reel spin" />
        <div class="logo-wrap" :class="{ glitching: titleGlitch }" aria-label="ATK-YTP" >
          <img class="logo-base" :src="ytpLogoColdWhite" alt="ATK-YTP" />
          <img class="logo-g1" :src="ytpLogoColdWhite" alt="" aria-hidden="true" />
          <img class="logo-g2" :src="ytpLogoColdWhite" alt="" aria-hidden="true" />
        </div>
        <div class="reel spin" />
      </div>

      <div class="tagline" aria-live="polite">
        <span class="tagline-sizer" aria-hidden="true">{{ longestPhrase }}</span>
        <span class="tagline-current" v-html="taglineMarkup" />
      </div>

      <div class="countdown">
        <div v-for="unit in units" :key="unit.key" class="unit">
          <div class="num">{{ countdown[unit.key] }}</div>
          <div class="lbl">{{ unit.label }}</div>
        </div>
      </div>

      <div class="date-location">
        <span>TURKU</span>
        <span class="date-location-dates">14.10.2026 - 16.10.2026</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-hero {
  position: relative;
  z-index: 2;
  display: flex;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 4vh, 48px);
}

.title-panel {
  position: relative;
  z-index: 10;
  display: flex;
  width: min(calc(100vw - 32px), 900px);
  max-width: 900px;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  gap: clamp(20px, 4vh, 48px);
  padding: clamp(24px, 5vh, 56px) clamp(20px, 6vw, 72px);
  border: 1px solid rgba(222, 215, 196, 0.28);
  background: var(--blueblack);
  box-shadow: 8px 8px 0 rgba(255, 47, 146, 0.14), -4px -4px 0 rgba(33, 230, 255, 0.1);
  backdrop-filter: blur(2px);
}

.title-panel::after {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  content: '';
  opacity: 0.1;
  background: repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(255, 255, 255, 0.16) 4px);
}

.label-wrap {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 2vw, 28px);
}

.logo-wrap {
  position: relative;
  display: inline-block;
  width: clamp(220px, 42vw, 480px);
  aspect-ratio: 687 / 330;
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
  filter: sepia(1) saturate(12) hue-rotate(285deg) brightness(1.2);
}

.logo-wrap.glitching .logo-g2 {
  opacity: 1;
  animation: glitch-2 140ms steps(3, end) infinite;
  filter: sepia(1) saturate(10) hue-rotate(145deg) brightness(1.2);
}

.tagline {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0 16px;
  color: #fff;
  font-size: clamp(0.7rem, 1.6vw, 1rem);
  line-height: 1.5;
  letter-spacing: 0.35em;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  opacity: 0.85;
}

.tagline-sizer {
  display: block;
  visibility: hidden;
}

.tagline-current {
  position: absolute;
  inset: 0;
  overflow-wrap: anywhere;
  text-align: center;
}

.tagline :deep(.dud) {
  color: var(--cyan);
  opacity: 0.6;
}

.countdown {
  display: flex;
  width: 100%;
  gap: clamp(4px, 2.2vw, 22px);
}

.unit {
  position: relative;
  display: flex;
  min-width: 0;
  flex: 1 1 0;
  flex-direction: column;
  align-items: center;
  /*
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: linear-gradient(180deg, #100e17, #08070c);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03), 0 10px 20px rgba(0, 0, 0, 0.5);
  */
}

.unit .num {
  color: #fff;
  font-family: var(--font-vcr), monospace;
  font-size: clamp(2.2rem, 7vw, 4.6rem);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
}

.unit .lbl {
  align-self: stretch;
  margin-bottom: 6px;
  color: #fff;
  font-family: var(--font-vcr), monospace;
  font-size: clamp(0.45rem, 1.2vw, 0.7rem);
  letter-spacing: clamp(0.08em, 0.2vw, 0.2em);
  text-align: center;
  /* opacity: 0.7; */
  opacity: 0.8;
}

.date-location {
  color: #fff;
  font-size: clamp(0.65rem, 1.3vw, 0.8rem);
  letter-spacing: 0.25em;
  text-align: center;
  /* opacity: 0.55; */
  opacity: 0.8;
}

.date-location-dates {
  display: block;
  padding-top: 0.5em;
}

@keyframes glitch-1 {
  0% { clip-path: inset(20% 0 65% 0); transform: translate(-4px, 0); }
  25% { clip-path: inset(70% 0 10% 0); transform: translate(5px, 0); }
  50% { clip-path: inset(40% 0 35% 0); transform: translate(-2px, 0); }
  75% { clip-path: inset(5% 0 80% 0); transform: translate(3px, 0); }
  100% { clip-path: inset(55% 0 20% 0); transform: translate(-4px, 0); }
}

@keyframes glitch-2 {
  0% { clip-path: inset(60% 0 15% 0); transform: translate(4px, 0); }
  30% { clip-path: inset(10% 0 70% 0); transform: translate(-5px, 0); }
  60% { clip-path: inset(35% 0 40% 0); transform: translate(2px, 0); }
  100% { clip-path: inset(75% 0 5% 0); transform: translate(5px, 0); }
}

@media (max-width: 560px) {
  .countdown {
    max-width: 100%;
  }

  .reel {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reel.spin,
  .logo-wrap.glitching .logo-g1,
  .logo-wrap.glitching .logo-g2 {
    animation: none !important;
  }
}
</style>