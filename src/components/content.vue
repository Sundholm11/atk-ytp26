<script setup>
import { ref } from 'vue'
import Sponsors from "@/components/sponsors.vue"

const schedule = [
  {
    date: '13.10.',
    datetime: '2026-10-13',
    dayparts: [
      {
        items: [
          { time: '22:00', title: 'Oulun pororeki lähtee kohti Turkua', location: 'Aamujaa' },
        ],
      }
    ],
  },
  {
    date: '14.10.',
    datetime: '2026-10-14',
    dayparts: [
      {
        items: [
          { time: '08:00', title: 'Majoitus auki', location: 'Rieskalähteen koulu, Jöllintie 3' },
          { time: '10:00', title: 'Majoitus sulkeutuu' },
          { time: '10:00', title: 'Järjestäjän tervehdys', location: 'Yliopistonmäki, Natura IX' },
          { time: '10:15', title: 'TiTOL & TEK' },
          { time: '11:00', title: 'Visma' },
          { time: '12:00', title: 'Kongsberg Maritime' },
          { time: '13:00', title: 'Sisusemi' },
          { time: '13:00', title: 'TiTOl liittokokous', location: 'Täl pual jokke' },
          { time: '14:00', title: 'TBA' },
        ],
      },
      {
        items: [
          { time: '15:00', title: 'Rastikierros info', location: 'Natura IX' },
          { time: '15:30', title: 'Rastikierros täl pual jokke' },
          { time: '18:00', title: 'Vätköt', location: 'Akatemiatalo, Rothoviuksenkatu 2' },
          { time: '21:00', title: 'Majoitus auki' },
          { time: '22:00', title: 'Jatkot *Salainen artisti*', location: 'Saaristobaari, Aurakatu 14' },
        ],
      },
    ],
  },
  {
    date: '15.10.',
    datetime: '2026-10-15',
    dayparts: [
      {
        items: [
          { time: '08:00', title: 'Aamusauna', location: 'TYY:n sauna, Rehtorinpellonkatu 4' },
          { time: '10:00', title: 'Majoitus sulkeutuu' },
          { time: '11:00', title: 'Vera Hiltunen', location: 'Natura IX' },
          { time: '12:00', title: 'Marshall AI' },
          { time: '13:00', title: 'Lounastauko' },
          { time: '14:00', title: 'Juha-Matti Santala' },
          { time: '15:00', title: 'Sanoma Media' },
        ],
      },
      {
        items: [
          { time: '16:30', title: 'ATK-YTG Laji 1', location: 'Educariumin takakenttä' },
          { time: '18:00', title: 'Vätköt', location: 'Akatemiatalo' },
          { time: '18:00', title: 'ATK-YTG Laji 2', location: 'Akatemiatalo' },
          { time: '19:00', title: 'ATK-YTG Laji 3: Lemminkäisenkierros', location: 'Akatemiatalo' },
          { time: '21:00', title: 'Majoitus auki' },
          { time: '22:00', title: '90s-bileet ft. Digit ry & Delta ry', location: 'Night Club Vegas, Eerikinkatu 19' },
        ],
      },
    ],
  },
  {
    date: '16.10.',
    datetime: '2026-10-16',
    dayparts: [
      {
        items: [
          { time: '10:00', title: 'Majoitus sulkeutuu' },
        ],
      },
      {
        items: [
          { time: '22:00', title: 'Oulu palannu igluihin' },
        ],
      },
    ],
  },
]

const infoGroups = [
  {
    title: 'ATK-YTG',
    text: [
      'ATK-YTG on ainejärjestöjen välinen kilpailu, jossa järjestöt pääsevät edustustiimien johdolla ottamaan mittaa toisistaan ja selvittämään näiden yhteistoimintapäivien kuninkuuden. Suoritettavia lajeja näistä kisoista löytyy kolme:',
      '1. laji vaatii pakkasenkestävää sinnikkyyttä sekä voimakasta heittokättä.',
      '2. laji vaatii tarkkaa silmää sekä vakaata kättä.',
      '3. laji voikin olla jollekin tuttu jo entuudestaan nimittäin Lemminkäisenkierros. Kyseessä on Asteriskin legendaarinen juomalautapeli, joka sisältää erittäin runsaasti alkoholia muiden haasteiden ohella, ja on tarkoitettu vain niille, jotka tuntevat olevansa valmiita koettelemukseen.',
    ],
  },
  {
    title: 'Majoitus',
    text: [
      'Ulkopaikkakuntalaisille on varattu majoittumistilat Rieskalähteen koululta (Jöllintie 3). Majosta on 2,5km kävelymatka Yliopistonmäelle ja 2km kävelymatka keskustaan, kun kulkee Rieskalähteentien puoleisista portaista. Majoituksesta lähin (800m) ruokakauppa on K-Market Tampereentie (07-22).',
      'Turussa pääsee hyvin kulkemaan myös bussilla eli Fölillä. Rieskalähteentien pysäkiltä (400m majosta) pääsee keskustaan ja Yliopistonmäelle linjoilla 2 ja 6 noin 5-10 minuutin välein, sekä keskustaan 6A-linjalla 20 minuutin välein.',
      'Majoitus on auki saapumispäivänä klo 10 asti ja sen jälkeen joka yö klo 21-10. Majoituksessa on jatkuvasti yövahdit valvomassa nukkumista ja turvallisuutta.',
    ],
  },
  {
    title: 'Ruokailu',
    text: [
      'Opiskelijaruokailun puolesta Turku on unelmapaikka, sillä korkeakoulut ovat keskittyneitä samalle alueelle ja sen ansiosta myös opiskelijaravintoloita on tarjolla parisenkymmentä. Luentosalia lähimpää löytyvät Galilei, Aurum, Assari, Monttu ja Astra. Opiskelijaravintoloiden aukioloajat ja lounaslistat löydät alempaa linkkilistasta. Pisimpään auki on Assari, jossa opiskelijalounasta voi nauttia aina klo 20 asti. Keskustassa opiskelijaruokaa tarjoaa Kulma klo 18 asti.',
      'Keskustassa on myös lukuisia muita ruokailuvaihtoehtoja tarjolla. Yöaikaan keskustassa tarjoilevat pikaruokaa muun muassa Burger King (22:00), Hesburger Hämeenkatu (23:30), KFC (01:00), Hesburger Antintalo (03:00/04:00), Subway Yliopistonkatu (05:00), sekä kellon ympäri Hesburger Linja-autoasema ja McDonald’s Sata.',
      'Lisäksi kauppatarpeissa palvelevat useat kaupat keskustan seudulla kello 23:00 asti, Sale Humalistonkatu klo 00:00 asti ja 24h palvelee Yliopistonmäen tuntumassa Sale Hämeenkatu.',
    ],
  },
  {
    title: 'Turvallinen tila',
    text: [
      'YTP:llä noudatetaan Asteriskin turvallisen tilan periaatteita ja tapahtumassa ei hyväksytä häirintää.',
      '1. Kohtele toisia, niin kuin toivoisit itseäsi kohdeltavan.',
      '2. Älä yleistä tai oleta toisten mielipiteitä tai ominaisuuksia.',
      '3. Ole avoin ja kuuntele, kunnioita toista ihmisenä. Vaadi kunnioitusta myös itsellesi.',
      '4. Älä kyseenalaista tai tuomitse toisen erilaisuutta tai eriäviä toimintatapoja.',
      '5. Älä häiritse ketään sanallisesti, koskemalla tai tuijottamalla. Ei tarkoittaa ei. Lopeta tai muuta käytöstäsi jos toinen sitä pyytää. Puutu todistamaasi häirintään.',
      '6. Asiattomasta kohtelusta saa antaa asiallista ja rakentavaa palautetta. Jos joku antaa sinulle palautetta toiminnastasi, kuuntele palautteen antajaa ja muuta toimintaasi.',
      '7. Älä painosta ketään tietynlaiseen toimintaan. Kunnioita toisen valintaa päihteiden käytön suhteen.',
      '8. Jos kaipaat apua tai tukea, älä epäröi pyytää sitä.',
      '9. Rakenna ja ylläpidä yhteisöä, jossa sinulla ja muilla on hyvä olla omana itsenään.',
      'Lisätietoa yhdenvertaisuudesta Asteriskin sivuilta.',
    ],
  },
]

const linkGroups = [
    {
    title: 'Luentosalin läheiset opiskelijaravintolat',
    links: [
      { label: 'Aurum', href: 'https://www.karkafeerna.fi/fi/lounas/viikonlista?restaurant=&id=8&year=2026&week=42' },
      { label: 'Assarin Ullakko & Brygge', href: 'https://www.unica.fi/ravintolat/yliopiston-kampus/assarin-ullakko/' },
      { label: 'Galilei', href: 'https://www.unica.fi/ravintolat/yliopiston-kampus/galilei/' },
      { label: 'Monttu', href: 'https://www.unica.fi/ravintolat/yliopiston-kampus/monttu-ja-mercatori/' },
    ],
  },
  {
    title: 'Kaikki opiskelijaravintolat ja lounaslistat',
    links: [
      { label: 'Unica', href: 'https://www.unica.fi/' },
      { label: 'Kårkaféerna', href: 'https://www.karkafeerna.fi/fi/lounas/' },
      { label: 'Juvenes Block', href: 'https://juvenes.fi/block/' },
    ],
  },
  {
    title: 'Muut',
    links: [
      { label: 'Fölin bussiaikataulu: Majo → Natura', href: 'https://reittiopas.foli.fi/reitti/Rieskal%C3%A4hteen%20koulu%2C%20J%C3%B6llintie%203%2C%20Turku%3A%3A60.466428%2C22.258328/Natura%2C%20Vesilinnantie%205%2C%20Turku%3A%3A60.454896%2C22.284817?time=1791039761' },
      { label: 'ATK-YTP IG', href: 'https://www.instagram.com/atkytp/' },
      { label: 'Oispa Kievin kanaa', href: 'https://oispa.kievinkanaa.com/' },
    ],
  },
]

const faqGroups = [
  {
    title: 'ATK-YTP?',
    text: [
      'Automaattisen tietojenkäsittelyn yhteistoimintapäivät.',
    ],
  },
  {
    title: 'Milloin Petri esiintyy?',
    text: [
      'Petri esiintyy YTP-viikon perjantaina 16.10. Savonlinnan House of Olafissa klo 20:30.',
    ],
  },
  {
    title: 'Kummal pual jokkee?',
    text: [
      'Molemmi pual jokkee pääsee temmeltää. Joessa temmeltäminen kielletty. Joessa pyöräily kielletty. Joessa skuuttailu kielletty.',
    ],
  },
  {
    title: 'Piispis vai berliininmunkki?',
    text: [
      'Piispanmunkki tai ulos.',
    ],
  },
  {
    title: 'Ottaako luennoitsija jallua?',
    text: [
      'Kysykää kohteliaasti.',
    ],
  },
]

const openTextGroups = ref(new Set())

const getTextGroupId = (section, title) => `${section}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

const isTextGroupOpen = (section, title) => openTextGroups.value.has(getTextGroupId(section, title))

const toggleTextGroup = (section, title) => {
  const groupId = getTextGroupId(section, title)
  const nextOpenGroups = new Set(openTextGroups.value)

  if (nextOpenGroups.has(groupId)) {
    nextOpenGroups.delete(groupId)
  } else {
    nextOpenGroups.add(groupId)
  }

  openTextGroups.value = nextOpenGroups
}

const asteriskiUrl = 'https://asteriski.fi/'
const asteriskiHarassmentUrl = 'https://asteriski.fi/hairinta/'
const titolUrl = 'https://titol.fi/'
</script>

<template>
  <main class="event-content">
    <section class="content-panel" aria-labelledby="info-title">
      <h2 id="info-title">Ohjelma</h2>
      <div class="info-text">
        <p>
          ATK-yhteistoimintapäivät kokoaa Suomen IT-alan opiskelijat yhteen Suomen OG-pääkaupunkiin Turkuun 14.-16.10.2026.
          Tapahtumaa järjestävät Turun yliopiston tietojenkäsittelytieteen opiskelijoiden ainejärjestö
          <a :href="asteriskiUrl" target="_blank" rel="noopener noreferrer">Asteriski ry</a>
          yhdessä Tietotekniikan opiskelijoiden liitto
          <a :href="titolUrl" target="_blank" rel="noopener noreferrer">TiTOL ry</a>:n kanssa.
          Luvassa on pari päivää luentoja, iltaohjelmaa ja hulluttelua seitsemän yliopistokaupungin voimin.
        </p>
        <p>
          Yhteistoimintapäivät startataan keskiviikkona 14.10. klo 10 Yliopistonmäellä Natura-rakennuksen salissa IX.
          Seminaarien jälkeen osallistujat pääsevät suuntaamaan perinteiselle rastikierrokselle, jossa tutustutaan Turun yliopiston ympäristöön ja keskustan tuntumaan.
          Myöhemmin illalla vätköillään Akatemiatalolla ja päivä huipentuu YTP-jatkoihin Saaristobaarissa klo 22 alkaen, missä esiintyy salainen jatkoartisti.
        </p>
        <p>
          Torstaina aamuvirkut pääsevät nauttimaan aamusaunan lämmöstä ja tarjoiluista klo 8. Luennot jatkuvat jälleen samassa Naturan IX-salissa klo 11.
          Luentojen jälkeen starttaa kolmiosainen spektaakkeli ATK-YTG, jossa ainejärjestöt pääsevät edustustiimien
          johdolla ottamaan mittaa toisistaan. Viimeisenä lajina pelataan kierros Asteriskin perinteistä Lemminkäisenkierros-lautapeliä, joka täyttää tänä vuonna 35 vuotta.
          Vätköjen kautta toinen ilta päättyy tietoteekkareiden (Digit ry) ja matemaatikoiden sekä fyysikoiden (Delta ry) kanssa 90s-bileisiin yökerho Vegasiin, joka on
          Turun opiskelijakulttuurin kehto. Täältä voit myös hankkia legendaariset lynihelmet haalareihisi roikkumaan!
        </p>
        <p>  
          Perjantaiaamuna on aika sanoa hyvästit Turkkuselle. Majoituksesta on poistuttava klo 10 mennessä.
        </p>
      </div>
    </section>

    <section class="content-panel" aria-labelledby="schedule-title">
      <h2 id="schedule-title">Aikataulu</h2>
      <div class="schedule-list">
        <div v-for="day in schedule" :key="day.datetime" class="schedule-day">
          <div v-for="(daypart, daypartIndex) in day.dayparts" :key="daypart.title" class="schedule-daypart">
            <time v-if="daypartIndex === 0" class="schedule-date" :datetime="day.datetime">{{ day.date }}</time>
            <span v-else class="schedule-date-empty" aria-hidden="true"></span>
            <div class="schedule-items">
              <div v-for="(item, index) in daypart.items" :key="`${day.datetime}-${daypart.title}-${index}`" class="schedule-item" :class="{ 'schedule-item--untimed': !item.time }">
                <time v-if="item.time" class="schedule-time">{{ item.time }}</time>
                <span>{{ item.title }}</span>
                <span v-if="item.location" class="schedule-location">{{ item.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Sponsors />

    <section class="content-panel" aria-labelledby="location-title">
      <h2 id="location-title">Info</h2>
      <div class="text-list">
        <div v-for="group in infoGroups" :key="group.title" class="text-group">
          <h3>
            <button
              class="text-group-toggle"
              type="button"
              :aria-expanded="isTextGroupOpen('info', group.title)"
              :aria-controls="getTextGroupId('info', group.title)"
              @click="toggleTextGroup('info', group.title)"
            >
              <span>{{ group.title }}</span>
              <span class="text-group-status">{{ isTextGroupOpen('info', group.title) ? 'Hanuri kii' : 'Hanuri auki' }}</span>
              <span class="text-group-icon" aria-hidden="true">+</span>
            </button>
          </h3>
          <div v-show="isTextGroupOpen('info', group.title)" :id="getTextGroupId('info', group.title)" class="text-group-content">
            <p v-for="(paragraph, index) in group.text" :key="`${group.title}-${index}`">
              <template v-if="paragraph.includes('Asteriskin sivuilta')">
                {{ paragraph.split('Asteriskin sivuilta')[0] }}<a :href="asteriskiHarassmentUrl" target="_blank" rel="noopener noreferrer">Asteriskin sivuilta</a>{{ paragraph.split('Asteriskin sivuilta')[1] }}
              </template>
              <template v-else>{{ paragraph }}</template>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="content-panel" aria-labelledby="links-title">
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
      <h2 id="map-title">Kartta</h2>
      <div class="map-placeholder" aria-label="Kartta lisätään myöhemmin">
        <span style="padding: 25px">Ei samperi eiks Turkuu oo kartotettu viel, no venaas meitsi hoitaa</span>
        <!--
        <iframe width="425" height="350" src="https://www.openstreetmap.org/export/embed?bbox=21.621093750000004%2C60.20809856445641%2C23.20724487304688%2C60.6317855349207&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=11/60.4206/22.4142">Näytä isommalla kartalla</a></small>
        {/*<iframe src="https://www.google.com/maps/d/embed?mid=1bTEXTaFykf9Xgu3riXarONoMUR8V-SU&ehbc=2E312F&noprof=1" width="100%" height="480" style="margin-top: -60px"></iframe>}
        -->
      </div>
    </section>

    <section class="content-panel" aria-labelledby="faq-title">
      <h2 id="faq-title">UKK</h2>
      <div class="text-list">
        <div v-for="group in faqGroups" :key="group.title" class="text-group">
          <h3 class="text-group-title">{{ group.title }}</h3>
          <div class="text-group-content">
            <p v-for="(paragraph, index) in group.text" :key="`${group.title}-${index}`">{{ paragraph }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.event-content {
  position: relative;
  z-index: 2;
  width: min(calc(100% - 32px), 900px);
  min-width: 0;
  margin: 0 auto;
  padding: 48px 0 96px;
  display: grid;
  gap: 16px;
}

.content-panel {
  position: relative;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
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

h2 {
  position: relative;
  z-index: 1;
  display: block;
  margin: 0 0 24px;
  color: var(--cold-white);
  font-family: var(--font-vcr), monospace;
  font-size: clamp(1.2rem, 5vw, 3rem);
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

.info-text {
  font-family: var(--font-space-mono), monospace;
  color: var(--cold-white);
}

.info-text a {
  color: var(--cold-white);
}

.info-text a:hover,
.info-text a:focus-visible {
  color: var(--cyan);
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
  grid-template-columns: 64px minmax(0, 1fr) max-content;
  align-items: baseline;
  gap: 24px;
  max-width: 100%;
}

.schedule-item--untimed span {
  grid-column: 2;
}

.schedule-item--untimed .schedule-location {
  grid-column: 3;
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

.schedule-location {
  color: var(--cream);
  font-size: clamp(0.8rem, 1.4vw, 0.95rem);
  text-align: right;
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

.text-list {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 20px;
}

.text-group {
  display: grid;
  gap: 0;
  border-bottom: 1px solid rgba(222, 215, 196, 0.2);
}

.text-group h3 {
  margin: 0;
}

.text-group-title {
  position: relative;
  z-index: 1;
  padding: 12px 0;
  color: #fff;
  font-family: var(--font-vcr), monospace;
  font-size: 1.15rem;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
}

.text-group-toggle {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border: 0;
  background: transparent;
  color: #fff;
  font-family: var(--font-vcr), monospace;
  font-size: 1.15rem;
  font-weight: 400;
  letter-spacing: 0;
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;
}

.text-group-toggle:hover,
.text-group-toggle:focus-visible {
  color: var(--cyan);
}

.text-group-toggle:focus-visible {
  outline: 1px solid var(--cyan);
  outline-offset: 4px;
}

.text-group-icon {
  flex: 0 0 auto;
  color: var(--cyan);
  font-size: 1.5rem;
  line-height: 1;
}

.text-group-status {
  margin-left: auto;
  color: var(--cold-white);
  font-family: var(--font-vcr), monospace;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: none;
}

.text-group-toggle[aria-expanded='true'] .text-group-icon {
  transform: rotate(45deg);
}

.text-group-content {
  font-family: var(--font-space-mono), monospace;
  position: relative;
  z-index: 1;
  padding: 4px 0 16px;
  color: var(--cold-white);
}

.text-group-content p {
  margin: 0.5em 0 0;
}

.text-group-content p:first-child {
  margin-top: 0;
}

.text-group-content a {
  color: var(--cold-white);
}

.text-group-content a:hover,
.text-group-content a:focus-visible {
  color: var(--cyan);
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
    width: calc(100% - 20px);
    padding-top: 32px;
  }

  h2::before,
  h2::after {
    margin: 0 6px;
  }

  .schedule-daypart,
  .schedule-item {
    grid-template-columns: 56px minmax(0, 1fr) max-content;
    column-gap: 12px;
  }

  .schedule-item {
    grid-template-columns: 56px minmax(0, 1fr);
    row-gap: 2px;
  }

  .schedule-time {
    min-width: 56px;
  }

  .schedule-item .schedule-location {
    grid-column: 2;
    grid-row: 2;
    max-width: 100%;
    text-align: left;
  }
}

</style>