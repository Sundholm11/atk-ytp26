<script setup>
const schedule = [
  {
    date: '14.10.',
    datetime: '2026-10-14',
    dayparts: [
      {
        title: 'Aamupäivä',
        items: [
          { time: '09:00', title: 'Turkuun. Mennään.' },
        ],
      },
      {
        title: 'ehtopäivä',
        items: [
          { time: '', title: 'Ohjelma julkaistaan myöhemmin' },
        ],
      },
    ],
  },
  {
    date: '15.10.',
    datetime: '2026-10-15',
    dayparts: [
      {
        title: 'Aamupäivä',
        items: [
          { time: '', title: 'Ohjelma julkaistaan myöhemmin' },
        ],
      },
      {
        title: 'ehtopäivä',
        items: [],
      },
    ],
  },
  {
    date: '16.10.',
    datetime: '2026-10-16',
    dayparts: [
      {
        title: 'Aamupäivä',
        items: [
          { time: '', title: 'Ohjelma julkaistaan myöhemmin' },
        ],
      },
    ],
  },
]

const linkGroups = [
  {
    title: 'Opiskelija ravintolat ja Lounaslistat',
    links: [
      { label: 'Unica', href: 'https://www.unica.fi/' },
      { label: 'Kårkaféerna', href: 'https://www.karkafeerna.fi/fi/lounas/' },
      { label: 'Juvenes Block', href: 'https://juvenes.fi/block/' },
    ],
  },
  /*
  {
    title: 'Tapahtuma',
    links: [
      { label: 'Yhteydenotto', href: '#' },
    ],
  },
  */
  {
    title: 'Muut',
    links: [
      { label: 'Asteriski IG', href: 'https://www.instagram.com/asteriski_ry/' },
      { label: 'Oispa Kievin kanaa', href: 'https://oispa.kievinkanaa.com/' },
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
        ATK-yhteistoimintapäivät kokoaa Suomen IT-alan opiskelijat yhteen Suomen OG
        pääkaupunkiin Turkuun 14.-16.10.2026. Luvassa on kolme päivää luentoja, ohjelmaa
        ja hulluttelua seitsemän yliopisto kaupungin voimin. Hell yeah.
      </p>
    </section>

    <section class="content-panel" aria-labelledby="schedule-title">
      <p class="section-index">02 // Ohjelmasignaali</p>
      <h2 id="schedule-title">Aikataulu</h2>
      <div class="schedule-list">
        <div v-for="day in schedule" :key="day.datetime" class="schedule-day">
          <div v-for="(daypart, daypartIndex) in day.dayparts" :key="daypart.title" class="schedule-daypart">
            <time v-if="daypartIndex === 0" class="schedule-date" :datetime="day.datetime">{{ day.date }}</time>
            <span v-else class="schedule-date-empty" aria-hidden="true"></span>
            <h3>{{ daypart.title }}</h3>
            <div class="schedule-items">
              <div v-for="(item, index) in daypart.items" :key="`${day.datetime}-${daypart.title}-${index}`" class="schedule-item" :class="{ 'schedule-item--untimed': !item.time }">
                <time v-if="item.time" class="schedule-time">{{ item.time }}</time>
                <span>{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content-panel" aria-labelledby="location-title">
      <p class="section-index">03 // Koordinaatit</p>
      <h2 id="location-title">Paikkatieto</h2>
      <p>
        Tarkempi tapahtumapaikka, saapumisohjeet ja muu käytännön
        tieto päivitetään tähän ennen tapahtumaa.
      </p>
    </section>

    <section class="content-panel" aria-labelledby="links-title">
      <p class="section-index">04 // Yhteydet</p>
      <h2 id="links-title">Linkit</h2>
      <nav class="link-list" aria-label="Tapahtuman tärkeät linkit">
        <div v-for="group in linkGroups" :key="group.title" class="link-group">
          <h3>{{ group.title }}</h3>
          <a v-for="link in group.links" :key="link.label" :href="link.href" target="_blank" rel="noopener noreferrer">
            {{ link.label }} <span>→</span>
          </a>
        </div>
      </nav>
    </section>

    <section class="content-panel map-panel" aria-labelledby="map-title">
      <p class="section-index">05 // Visuaalinen yhteys</p>
      <h2 id="map-title">Kartta</h2>
      <div class="map-placeholder" aria-label="Kartta lisätään myöhemmin">
        <span>MAP SIGNAL PENDING</span>
        <!--
        <iframe width="425" height="350" src="https://www.openstreetmap.org/export/embed?bbox=21.621093750000004%2C60.20809856445641%2C23.20724487304688%2C60.6317855349207&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=11/60.4206/22.4142">Näytä isommalla kartalla</a></small>
        {/*<iframe src="https://www.google.com/maps/d/embed?mid=1bTEXTaFykf9Xgu3riXarONoMUR8V-SU&ehbc=2E312F&noprof=1" width="100%" height="480" style="margin-top: -60px"></iframe>}
        -->
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
  padding: 48px 0 96px;
  display: grid;
  gap: 16px;
}

.content-panel {
  position: relative;
  padding: clamp(24px, 5vw, 48px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: var(--darkblue);
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.65);
  color: var(--cream);
}

.content-panel:nth-child(even) {
  background: var(--blueblack);
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
  display: none;
}

h2 {
  position: relative;
  z-index: 1;
  display: block;
  margin: 0 0 24px;
  color: var(--cold-white);
  font-family: var(--font-vcr), monospace;
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
  text-align: center;
  text-transform: uppercase;
  animation: section-title-glitch 4.5s steps(1, end) infinite;
}

h2::before,
h2::after {
  content: '*****';
  color: var(--cold-white);
  letter-spacing: 0.08em;
}

h2::before {
  margin-right: 14px;
}

h2::after {
  margin-left: 14px;
}

@keyframes section-title-glitch {
  0%, 88%, 100% {
    text-shadow: none;
    transform: none;
  }

  89% {
    text-shadow: 3px 0 var(--cyan), -3px 0 var(--magenta);
    transform: translateX(-2px);
  }

  90% {
    text-shadow: -2px 0 var(--cyan), 2px 0 var(--magenta);
    transform: translateX(2px);
  }
}

.content-panel > p:not(.section-index) {
  position: relative;
  z-index: 1;
  max-width: 60ch;
  margin: 0;
  color: var(--cold-white);
  font-family: var(--font-vcr), monospace;
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  line-height: 1.6;
}

.schedule-list {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 12px;
  font-family: var(--font-vcr), monospace;
}

.schedule-day {
  display: grid;
  gap: 8px;
  padding: 0 0 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.schedule-day:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.schedule-date {
  width: fit-content;
  padding: 2px 4px;
  color: var(--darkblue);
  background: var(--cold-white);
  font-family: var(--font-vcr), monospace;
}

.schedule-items {
  grid-column: 1 / -1;
  display: grid;
  gap: 8px;
  min-width: 0;
}

.schedule-daypart {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  align-items: baseline;
  column-gap: 24px;
  row-gap: 6px;
  padding: 2px 0;
}

.schedule-daypart h3,
.link-group h3 {
  position: relative;
  z-index: 1;
  margin: 0;
  color: #fff;
  font-family: var(--font-vcr), monospace;
  font-size: 1.15rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  letter-spacing: 0;
  text-transform: uppercase;
}

.schedule-daypart h3 {
  display: none;
}

.schedule-item {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  align-items: baseline;
  gap: 24px;
  max-width: 100%;
}

.schedule-item--untimed span {
  grid-column: 2;
}

.schedule-time {
  min-width: 64px;
  color: var(--cold-white);
  font-family: var(--font-vcr), monospace;
}

.schedule-item span {
  max-width: 60ch;
  color: var(--cold-white);
  font-size: clamp(0.95rem, 1.6vw, 1.05rem);
}

.link-list {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 20px;
}

.link-group {
  display: grid;
  gap: 4px;
}

.link-list a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(222, 215, 196, 0.2);
  color: rgba(255, 255, 255, 0.82);
  font-family: var(--font-vcr), monospace;
  font-size: clamp(0.95rem, 1.6vw, 1.05rem);
  text-decoration: none;
}

.link-list a:hover,
.link-list a:focus-visible {
  color: var(--cyan);
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
    padding-top: 32px;
  }

  h2::before,
  h2::after {
    margin: 0 6px;
  }

  .schedule-daypart,
  .schedule-item {
    grid-template-columns: 56px minmax(0, 1fr);
    column-gap: 12px;
  }

  .schedule-time {
    min-width: 56px;
  }
}

@media (prefers-reduced-motion: reduce) {
  h2 {
    animation: none;
  }
}
</style>