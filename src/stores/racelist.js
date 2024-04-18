import { computed, ref, toRaw } from 'vue'
import { defineStore } from 'pinia'

export const useRaceListStore = defineStore('racelist', () => {
  // state

  // actions

  // getters

  const races = ref([])
  const getList = computed(() => races.value)
  const getRaceById = computed(() => {
    return (raceId) => races.value.find((race) => toRaw(race).id === parseInt(raceId))
  })

  function getRace(raceId) {
    const records = toRaw(races)
    records.forEach(function (item) {
      if (item.id === raceId) {
        return item
      }
    })
  }

  function add(records) {
    records.forEach(function (item) {
      races.value.push(item)
    })
  }

  return { getRaceById, add, getList, getRace }
})
