<script setup>
import { onMounted, ref } from 'vue'
import {
  LMap,
  LMarker,
  LPopup,
  LTileLayer,
} from '@vue-leaflet/vue-leaflet'
import alko from '@markers/map-alko.png'
import edunkentta from '@markers/map-edu.png'
import jatkot from '@markers/map-jatkot.png'
import kauppa from '@markers/map-kauppa.png'
import luennot from '@markers/map-luennot.png'
import majoitus from '@markers/map-majo.png'
import pikaruoka from '@markers/map-pikaruoka.png'
import pomppulinna from '@markers/map-pomppulinna.png'
import posankka from '@markers/map-posankka.png'
import pub from '@markers/map-pub.png'
import ravintola from '@markers/map-ravintola.png'
import toimisto from '@markers/map-toimisto.png'
import vatkot from '@markers/map-vatkot.png'
import 'leaflet/dist/leaflet.css'

const center = [60.4554062,22.2793129]
const zoom = 13

const locations = [
  {
    id: 'alko',
    name: 'Alko Kupittaa',
    address: 'Uudenmaantie 17',
    coordinates: [60.44220938681233, 22.286786532216603],
    type: 'Alko',
    icon: alko,
  },
  {
    id: 'alko',
    name: 'Alko Stockmann',
    address: 'Yliopistonkatu 22, krs -1',
    coordinates: [60.4505541953069, 22.263069600450816],
    type: 'Alko',
    icon: alko,
  },
  {
    id: 'alko',
    name: 'Alko Wiklund',
    address: 'Kauppiaskatu 9, krs -1',
    coordinates: [60.451935390932455, 22.268675306541542],
    type: 'Alko',
    icon: alko,
  },
  {
    id: 'akatemiatalo',
    name: 'Akatemiatalo',
    address: 'Rothoviuksenkatu 2',
    coordinates: [60.45199013252892, 22.279467154236233],
    type: 'Vätköt',
    icon: vatkot,
  },
  {
    id: 'educariumkentta',
    name: 'Educarium Takakenttä',
    address: 'Arwidssoninkatu 1',
    coordinates: [60.458371567120686, 22.284219554127432],
    type: 'ATK-YTG Laji 1',
    icon: edunkentta,
  },
  {
    id: 'majoitus',
    name: 'Majoitus',
    address: 'Rieskalähteen koulu, Jöllintie 3',
    coordinates: [60.466209, 22.259067],
    type: 'Majoitus',
    icon: majoitus,
  },
  {
    id: 'natura',
    name: 'Natura IX',
    address: 'Yliopistonmäki, Natura, krs 1',
    coordinates: [60.454999, 22.285154],
    type: 'Luennot',
    icon: luennot,
  },
  {
    id: 'pomppulinna',
    name: 'Pomppulinna',
    address: 'Yliopistonmäki, Naturan edusta',
    coordinates: [60.454628123312176, 22.28434598091356],
    type: 'Boing boing',
    icon: pomppulinna,
  },
  {
    id: 'posankka',
    name: 'Posankka',
    address: 'Pispalantie 5',
    coordinates: [60.458585847229244, 22.289614092006875],
    type: 'Possuankka',
    icon: posankka,
  },
  {
    id: 'saaristobaari',
    name: 'Saaristobaari',
    address: 'Aurakatu 14',
    coordinates: [60.452006612724595, 22.264565060801317],
    type: 'Keskiviikko Jatkot',
    icon: jatkot,
  },
  {
    id: 'toimisto',
    name: 'Asteriskin Toimisto',
    address: 'Yliopistonmäki, Agora, krs -1',
    coordinates: [60.455703230940976, 22.285807625365642],
    type: 'Luennot',
    icon: toimisto,
  },
  {
    id: 'vegas',
    name: 'Night Club Vegas',
    address: 'Eerikinkatu 19',
    coordinates: [60.44945771874566, 22.26252604361681],
    type: 'Torstai Jatkot',
    icon: jatkot,
  },
  {
    id: 'arken',
    name: 'Arken',
    address: 'Tehtaankatu 2',
    coordinates: [60.45722206165204, 22.27916529050319],
    type: 'Opiskelijaravintola',
    icon: ravintola,
  },
  {
    id: 'aurum',
    name: 'Aurum',
    address: 'Henrikinkatu 2',
    coordinates: [60.45476418521163, 22.282550609186142],
    type: 'Opiskelijaravintola',
    icon: ravintola,
  },
  {
    id: 'assari',
    name: 'Assarin Ullakko & Brygge',
    address: 'Rehtorinpellonkatu 4A, 2 krs',
    coordinates: [60.454375327881884, 22.28714229174851],
    type: 'Opiskelijaravintola',
    icon: ravintola,
  },
  {
    id: 'astra',
    name: 'Astra',
    address: 'Porthaninkatu 3',
    coordinates: [60.45382073396205, 22.279741741486028],
    type: 'Opiskelijaravintola',
    icon: ravintola,
  },
  {
    id: 'galilei',
    name: 'Galilei',
    address: 'Yliopistonmäki, Agora, 1 krs',
    coordinates: [60.45575331762877, 22.28560668635975],
    type: 'Opiskelijaravintola',
    icon: ravintola,
  },
  {
    id: 'maccis',
    name: 'Macciavelli & Pikku Maccia',
    address: 'Assistentinkatu 5, Alakampus',
    coordinates: [60.4580018568888, 22.285548522924223],
    type: 'Opiskelijaravintola',
    icon: ravintola,
  },
  {
    id: 'monttu',
    name: 'Monttu',
    address: 'Rehtorinpellonkatu 3, Kauppis, krs -1',
    coordinates: [60.45470231347598, 22.28898489071121],
    type: 'Opiskelijaravintola',
    icon: ravintola,
  },
  {
    id: 'kulma',
    name: 'Kulma',
    address: 'Brahenkatu 2',
    coordinates: [60.45137153792812, 22.271968584138182],
    type: 'Opiskelijaravintola',
    icon: ravintola,
  },
  {
    id: 'proffa',
    name: 'Proffan Kellari',
    address: 'Rehtorinpellonkatu 6',
    coordinates: [60.454525800475146, 22.2874573004455],
    type: 'Legendaarinen Baari (bilis, darts)',
    icon: pub,
  },
  {
    id: 'hameenonni',
    name: 'Hämeen Onni',
    address: 'Hämeenkatu 7',
    coordinates: [60.45217460145221, 22.282408219598263],
    type: 'Baari',
    icon: pub,
  },
  {
    id: 'bristol',
    name: 'Bar Bristol',
    address: 'Hämeenkatu 16',
    coordinates: [60.45048004229717, 22.27862846043804],
    type: 'Baari',
    icon: pub,
  },
  {
    id: 'proffa',
    name: "Hunter's Inn",
    address: 'Brahenkatu 3',
    coordinates: [60.45200540914174, 22.27181753308997],
    type: 'Legendaarinen Baari (ilmane darts)',
    icon: pub,
  },
  {
    id: 'edison',
    name: 'Bar Edison',
    address: 'Kauppiaskatu 4',
    coordinates: [60.450397690666534, 22.269855368098753],
    type: 'Baari',
    icon: pub,
  },
  {
    id: 'pocket',
    name: 'Pocket Bar',
    address: 'Yliopistonkatu 31',
    coordinates: [60.44986500047592, 22.259176841150193],
    type: 'Baari (ilmanen bilis)',
    icon: pub,
  },
  {
    id: 'akateeminenhese',
    name: 'Akateeminen Hese',
    address: 'Rehtorinpellonkatu 2',
    coordinates: [60.45359966725652, 22.28681083588778],
    type: 'GOATED Academic Hessu',
    icon: pikaruoka,
  },
  {
    id: 'sotto',
    name: 'Sotto Pizzeria',
    address: 'Hämeenkatu 16',
    coordinates: [60.45054786156494, 22.278774196909033],
    type: 'Paras hintasuhde pizzaa',
    icon: pikaruoka,
  },
  {
    id: 'mcdolan',
    name: "Mc Donald's Turku Sata",
    address: 'Aninkaistenkatu 15',
    coordinates: [60.457358366521184, 22.26989220196046],
    type: '24/7 auki',
    icon: pikaruoka,
  },
  {
    id: 'heselinja',
    name: 'Hesburger Linja-autoasema',
    address: 'Läntinen Pitkäkatu 1',
    coordinates: [60.45760242881932, 22.267825337620863],
    type: '24/7 auki',
    icon: pikaruoka,
  },
  {
    id: 'sale',
    name: 'Sale',
    address: 'Hämeenkatu 6',
    coordinates: [60.45231105277279, 22.28431020646649],
    type: 'Kauppa',
    icon: kauppa,
  },
  {
    id: 'kmarkethamis',
    name: 'K-Market Hämismies',
    address: 'Hämeenkatu 5',
    coordinates: [60.45257480860301, 22.28379432909252],
    type: 'Kauppa',
    icon: kauppa,
  },
  {
    id: 'lidl',
    name: 'Lidl',
    address: 'Eerikinkatu 4',
    coordinates: [60.45237636504711, 22.272200057049687],
    type: 'Kauppa',
    icon: kauppa,
  },
  {
    id: 'prismawikke',
    name: 'Prisma Wiklund',
    address: 'Eerikinkatu 11, krs -1',
    coordinates: [60.45187181939775, 22.26877576865794],
    type: 'Kauppa',
    icon: kauppa,
  },
]

const icons = ref({})

onMounted(async () => {
  const { default: L } = await import('leaflet')

  icons.value = Object.fromEntries(
    locations.map((location) => [
      location.id,
      L.icon({
        iconUrl: location.icon.src,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -26],
      }),
    ]),
  )
})
</script>

<template>
  <div class="map-wrapper">
    <div class="map-frame" aria-label="Turun kartta tapahtuman sijainneilla">
      <LMap :center="center" :zoom="zoom" :scroll-wheel-zoom="false">
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        />
        <template v-if="Object.keys(icons).length">
          <LMarker
            v-for="location in locations"
            :key="location.id"
            :lat-lng="location.coordinates"
            :icon="icons[location.id]"
          >
            <LPopup>
              <strong>{{ location.name }}</strong>
              <br />
              <span>{{ location.type }}</span>
              <br />
              {{ location.address }}
            </LPopup>
          </LMarker>
        </template>
      </LMap>
    </div>
  </div>
</template>

<style>
.map-wrapper {
  position: relative;
  z-index: 1;
}

.map-frame {
  height: min(62vw, 460px);
  min-height: 300px;
  overflow: hidden;
  border: 1px solid rgba(33, 230, 255, 0.5);
  background: #13222b;
}

.map-frame .leaflet-container {
  height: 100%;
  min-height: 300px;
  background: #13222b;
  font-family: var(--font-space-mono), monospace;
}

.map-frame .leaflet-control-zoom a {
  color: #13222b;
}

.map-frame .leaflet-popup-content-wrapper,
.map-frame .leaflet-popup-tip {
  background: var(--cold-white);
  color: #13222b;
}

.map-frame .leaflet-popup-content {
  line-height: 1.5;
}

.map-note {
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.62);
  font-family: var(--font-space-mono), monospace;
  font-size: 0.72rem;
}
</style>
