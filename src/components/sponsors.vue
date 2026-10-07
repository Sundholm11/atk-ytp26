<script setup>
import elisaLogo from '@logos/elisa_white.png'
import kongsbergMaritimeLogo from '@logos/kongsberg_maritime.png'
import marshallAiLogo from '@logos/marshallai_white.svg'
import sanomaLogo from '@logos/sanoma_white.png'
import tekLogo from '@logos/tek_white.png'
import vismaLogo from '@logos/visma_white.png'
</script>

<template>
  <section class="content-panel" aria-label="Tapahtuman yhteistyökumppanit">
    <h2>Sponsorit</h2>
    <div class="sponsor-strip__logos">
      <img :src="kongsbergMaritimeLogo.src" alt="Kongsberg Maritime" />
      <img :src="vismaLogo.src" alt="Visma" />
      <img :src="marshallAiLogo.src" alt="Marshall AI" />
      <img :src="tekLogo.src" alt="TEK" />
      <img :src="elisaLogo.src" alt="Elisa" />
      <img :src="sanomaLogo.src" alt="Sanoma" />
    </div>
  </section>
</template>

<style scoped>
.sponsor-strip {
  position: relative;
  z-index: 2;
  display: flex;
  min-width: 0%;
  max-width: 100%;
  /*
  width: min(calc(100% - 32px), 900px);
  margin: 0 auto;
  */
  padding: 56px 24px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border: 1px solid rgba(222, 215, 196, 0.2);
  background: var(--blueblack);
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.65);
}

.sponsor-strip__label {
  margin: 0;
  color: #fff;
  font-family: var(--font-vcr), monospace;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-align: center;
  text-transform: uppercase;
}

.sponsor-strip__logos {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  gap: clamp(20px, 4vw, 48px);
}

.sponsor-strip__logos img {
  display: block;
  width: 100%;
  max-width: none;
  height: 160px; /*clamp(160px, 18vw, 220px);*/
  padding: 10px 16px;
  object-fit: contain;
}

.sponsor-strip__logos img:last-child:nth-child(odd) {
  grid-column: 1 / -1;
  justify-self: center;
  width: 100%;
  max-width: calc((100% - clamp(20px, 4vw, 48px)) / 2);
}

@media (max-width: 560px) {
  .sponsor-strip {
    padding: 40px 16px;
  }

  .sponsor-strip__logos {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .sponsor-strip__logos img {
    width: min(70vw, 240px);
    justify-self: center;
    height: 88px;
  }

  .sponsor-strip__logos img:last-child:nth-child(odd) {
    grid-column: auto;
    width: min(70vw, 240px);
    max-width: none;
  }
}
</style>
