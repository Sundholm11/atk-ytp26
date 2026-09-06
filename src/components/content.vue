<script setup>
const schedule = [
  {
    date: '14.10.',
    datetime: '2026-10-14',
    items: [
      { time: '09:00', title: 'Turkuun. Mennään.'},
      { time: '', title: 'Ohjelma julkaistaan myöhemmin' },
    ],
  },
  {
    date: '15.10.',
    datetime: '2026-10-15',
    items: [
      { time: '', title: 'Ohjelma julkaistaan myöhemmin' },
    ],
  },
  {
    date: '16.10.',
    datetime: '2026-10-16',
    items: [
      { time: '', title: 'Ohjelma julkaistaan myöhemmin' },
    ],
  },
]
</script>

<template>
  <main class="event-content">
    <section class="content-panel" aria-labelledby="info-title">
      <p class="section-index">01 // Lähetys alkaa</p>
      <h2 id="info-title">Info</h2>
      <p>
        ATK-yhteistoimintapäivät kokoaa Suomen IT-alan opiskelijat yhteen Turkuun
        14.-16.10.2026. Luvassa on kolme päivää luentoja, ohjelmaa ja
        hulluttelua meininkiä seitsemän yliopisto kaupungin voimin. Hell yeah.
      </p>
    </section>

    <section class="content-panel" aria-labelledby="schedule-title">
      <p class="section-index">02 // Ohjelmasignaali</p>
      <h2 id="schedule-title">Aikataulu</h2>
      <div class="schedule-list">
        <div v-for="day in schedule" :key="day.datetime" class="schedule-day">
          <time class="schedule-date" :datetime="day.datetime">{{ day.date }}</time>
          <div class="schedule-items">
            <div v-for="(item, index) in day.items" :key="`${day.datetime}-${index}`" class="schedule-item">
              <time v-if="item.time" class="schedule-time">{{ item.time }}</time>
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content-panel" aria-labelledby="location-title">
      <p class="section-index">03 // Koordinaatit</p>
      <h2 id="location-title">Paikkatieto</h2>
      <p>
        Tapahtuma järjestetään Turussa. Tarkempi tapahtumapaikka,
        saapumisohjeet ja muu käytännön tieto päivitetään tähän ennen
        tapahtumaa.
      </p>
    </section>

    <section class="content-panel map-panel" aria-labelledby="map-title">
      <p class="section-index">04 // Visuaalinen yhteys</p>
      <h2 id="map-title">Kartta</h2>
      <div class="map-placeholder" aria-label="Kartta lisätään myöhemmin">
        <span>MAP SIGNAL PENDING</span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.event-content {
  position: relative;
  z-index: 2;
  width: min(100% - 32px, 900px);
  margin: 0 auto;
  padding: 72px 0 120px;
  display: grid;
  gap: 24px;
}

.content-panel {
  position: relative;
  padding: clamp(24px, 5vw, 48px);
  border: 1px solid rgba(222, 215, 196, 0.28);
  background: rgba(4, 4, 8, 0.88);
  box-shadow: 8px 8px 0 rgba(255, 47, 146, 0.14), -4px -4px 0 rgba(33, 230, 255, 0.1);
  color: var(--cream);
}

.content-panel::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  opacity: 0.1;
  background: repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(255, 255, 255, 0.16) 4px);
}

.section-index {
  position: relative;
  z-index: 1;
  margin: 0 0 12px;
  color: var(--cyan);
  font-family: var(--font-vcr), monospace;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h2 {
  position: relative;
  z-index: 1;
  display: inline-block;
  margin: 0 0 24px;
  color: #fff;
  font-family: var(--font-vcr), monospace;
  font-size: clamp(2rem, 7vw, 4.5rem);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: 0.04em;
  text-shadow: 3px 0 var(--magenta), -3px 0 var(--cyan);
}

h2::after {
  display: block;
  width: 100%;
  height: 2px;
  margin-top: 12px;
  background: linear-gradient(90deg, var(--magenta), var(--cyan));
  content: '';
}

.content-panel > p:not(.section-index) {
  position: relative;
  z-index: 1;
  max-width: 60ch;
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-family: var(--font-space-mono), monospace;
  font-size: clamp(0.85rem, 1.6vw, 1rem);
  line-height: 1.8;
}

.schedule-list {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 12px;
  font-family: var(--font-space-mono), monospace;
}

.schedule-day {
  display: grid;
  grid-template-columns: 88px 1fr;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(222, 215, 196, 0.2);
}

.schedule-date {
  align-self: start;
  color: var(--magenta);
  font-family: var(--font-vcr), monospace;
}

.schedule-items {
  display: grid;
  gap: 12px;
  min-width: 0;
}

.schedule-item {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 16px;
  max-width: 100%;
}

.schedule-time {
  color: var(--cyan);
  font-family: var(--font-vcr), monospace;
}

.schedule-item span {
  max-width: 60ch;
  color: rgba(255, 255, 255, 0.72);
}

.map-placeholder {
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 220px;
  place-items: center;
  border: 1px dashed rgba(33, 230, 255, 0.5);
  background: linear-gradient(135deg, rgba(33, 230, 255, 0.08), rgba(255, 47, 146, 0.08));
  color: var(--cyan);
  font-family: var(--font-vcr), monospace;
  font-size: 0.8rem;
  letter-spacing: 0.16em;
}

@media (max-width: 560px) {
  .event-content {
    width: min(100% - 20px, 900px);
    padding-top: 48px;
  }

  .schedule-day {
    grid-template-columns: 64px 1fr;
    gap: 10px;
  }

  .schedule-item {
    gap: 10px;
  }
}
</style>