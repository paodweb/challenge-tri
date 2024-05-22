<template>
  <TheHeading title="Détail licencié.e" subtitle="STÉPHANE FER" :showButtons="false"></TheHeading>
  <div class="bg-white py-12">
    <div class="mx-auto max-w-custom px-custom">
      <div class="flow-root">
        <ul role="list" class="-mb-8">
          <li v-for="(item, eventIdx) in details" :key="item.id">
            <div class="relative pb-8">
              <span
                v-if="eventIdx !== details.length - 1"
                class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              />
              <div class="relative flex space-x-3">
                <div class="py-5">
                  <span
                    class="bg-pink-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                  >
                    <CheckIcon class="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div class="flex min-w-0 flex-1 justify-between space-x-4">
                  <div>
                    <div class="text-sm text-gray-500">
                      <h4 href="#!" class="font-medium text-gray-900">{{ item.raceName }} &nbsp; <small class="text-sm text-gray-400">{{ item.date }}</small></h4>
                        <div class="mt-1 mb-2">
                        <RankingDetail
                            label="classement"
                            :value="item.a"
                            is-first
                        ></RankingDetail>
                        <RankingDetail
                            label="chrono"
                            :value="item.c"
                        ></RankingDetail>
                        <RankingDetail
                            label="classement cat."
                            :value="item.e"
                        ></RankingDetail>
                        <p class="mt-1 mb-2">
                          NCH <span class="text-indigo-700">{{ item.b }}</span>
                           • 
                          NCF <span class="text-indigo-700">{{ item.d }}</span>
                           • 
                          NCC <span class="text-indigo-700">{{ item.f }}</span>
                           • 
                          T1H <span class="text-indigo-700">{{ item.g }}</span>
                           • 
                          T1F <span class="text-indigo-700">{{ item.h }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="whitespace-nowrap py-5 text-right text-sm text-gray-500">
                    <p class="inline-flex items-center rounded-full bg-pink-500 px-2 py-1 text-xs font-medium text-white">
                      <strong>{{ item.points }} points</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p class="py-3 footer-races-label">-- 9 courses • 905 points --</p>
        <p class="text-gray-500">
          <span>Légende : </span>
          <span class="text-gray-700">NCH</span> <em>nombre de coureurs Homme</em>
           • 
          <span class="text-gray-700">NCF</span> <em>nombre de coureuses Femme</em>
           •
          <span class="text-gray-700">NCC</span> <em>nombre de classé.s.es dans la catégorie</em>
           • 
          <span class="text-gray-700">T1H</span> <em>temps du 1<sup>er</sup> masculin</em>
           • 
          <span class="text-gray-700">T1F</span> <em>temps de la 1<sup>ère</sup> féminine</em>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRaw } from 'vue'
import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/vue/20/solid'
import TheBadge from '@/components/TheBadge.vue'
import TheHeading from '@/components/TheHeading.vue'
import RankingDetail from '@/components/RankingDetail.vue'

let details = ref([
  {
    date: '20/09/2023',
    raceName: 'LokiMan * S',
    a: 4,
    b: 157,
    c: '01:10:31',
    d: '01:05:41',
    e: 1,
    f: 7,
    g: 'c1',
    h: 'badge',
    gg: ('c1', 'badge'),
    points: 1024
  },
  {
    date: '10/09/2023',
    raceName: 'Triathlon Côte des Légendes * S',
    a: 9,
    b: 247,
    c: '01:10:10',
    d: '01:04:29',
    e: 1,
    f: 19,
    g: 'c1',
    h: 'badge',
    gg: ('c1', 'badge'),
    points: 1016
  }
])

const timeline = [
  {
    id: 1,
    content: 'Applied to',
    target: 'Front End Developer',
    href: '#',
    date: 'Sep 20',
    datetime: '2020-09-20',
    icon: UserIcon,
    iconBackground: 'bg-gray-400'
  },
  {
    id: 2,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 22',
    datetime: '2020-09-22',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500'
  },
  {
    id: 3,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    href: '#',
    date: 'Sep 28',
    datetime: '2020-09-28',
    icon: CheckIcon,
    iconBackground: 'bg-green-500'
  },
  {
    id: 4,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 30',
    datetime: '2020-09-30',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500'
  },
  {
    id: 5,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    href: '#',
    date: 'Oct 4',
    datetime: '2020-10-04',
    icon: CheckIcon,
    iconBackground: 'bg-green-500'
  }
]
</script>

<style scoped>
.footer-races-label {
  text-align-last: center;
  color: var(--color-green);
}
.max-w-custom {
  max-width: 58rem;
}
.px-custom {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
