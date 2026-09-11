<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvas = ref(null)
const bgWrap = ref(null)
const turb = ref(null)
let animationFrame = 0
let resizeHandler = null

const startVhs = () => {
  if (!canvas.value) return
  const context = canvas.value.getContext('2d')
  if (!context) return
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
    if (!canvas.value) return
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
    if (!canvas.value) return
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
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    if (bgWrap.value) bgWrap.value.style.filter = 'none'
    if (turb.value) turb.value.querySelector('animate')?.setAttribute('repeatCount', '0')
  }
  startVhs()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
})
</script>

<template>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <filter id="crtWave" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence ref="turb" type="fractalNoise" baseFrequency="0.002 0.012" numOctaves="2" seed="7" result="turb">
        <animate attributeName="baseFrequency" values="0.0018 0.011;0.0035 0.017;0.0018 0.011" dur="9s" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="turb" scale="12" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </svg>

  <div ref="bgWrap" class="bg-wrap">
    <div class="colorbars">
      <div v-for="row in ['top', 'mid', 'bottom']" :key="row" class="cb-row" :class="`cb-${row}`">
        <div v-for="index in 7" :key="index" />
      </div>
    </div>
  </div>

  <div class="vignette" />
  <canvas id="vhs-bg" ref="canvas" />
</template>

<style scoped>
.bg-wrap {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  filter: url(#crtWave);
}

.colorbars {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
}

.cb-row {
  display: flex;
  width: 100%;
}

.cb-row > div {
  flex: 1 1 0;
}

.cb-top {
  flex: 0 0 66%;
}

.cb-top > div:nth-child(1) { background: #c0c0c0; }
.cb-top > div:nth-child(2) { background: #c0c000; }
.cb-top > div:nth-child(3) { background: #00c0c0; }
.cb-top > div:nth-child(4) { background: #00c000; }
.cb-top > div:nth-child(5) { background: #c000c0; }
.cb-top > div:nth-child(6) { background: #c00000; }
.cb-top > div:nth-child(7) { background: #0000c0; }

.cb-mid {
  flex: 0 0 8%;
}

.cb-mid > div:nth-child(1) { background: #0000c0; }
.cb-mid > div:nth-child(2) { background: #141414; }
.cb-mid > div:nth-child(3) { background: #c000c0; }
.cb-mid > div:nth-child(4) { background: #141414; }
.cb-mid > div:nth-child(5) { background: #00c0c0; }
.cb-mid > div:nth-child(6) { background: #141414; }
.cb-mid > div:nth-child(7) { background: #c0c0c0; }

.cb-bottom {
  display: flex;
  flex: 1 1 auto;
}

.cb-bottom > div:nth-child(1) { flex: 1.4; background: #00214d; }
.cb-bottom > div:nth-child(2) { flex: 1; background: #f2f2f2; }
.cb-bottom > div:nth-child(3) { flex: 1.4; background: #2a0a55; }
.cb-bottom > div:nth-child(4) { flex: 2.6; background: #0d0d0d; }
.cb-bottom > div:nth-child(5) { flex: 0.6; background: #050505; }
.cb-bottom > div:nth-child(6) { flex: 0.6; background: #161616; }
.cb-bottom > div:nth-child(7) { flex: 1.4; background: #0d0d0d; }

#vhs-bg {
  position: fixed;
  inset: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  pointer-events: none;
  filter: url(#crtWave);
  mix-blend-mode: overlay;
}

.vignette {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.15) 75%, rgba(0, 0, 0, 0.4) 100%);
}
</style>
