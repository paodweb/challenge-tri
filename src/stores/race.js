import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRaceStore = defineStore('race', () => {
  const raceLevel = ref('')
  const raceCoefficient = ref('')
  const raceIsChampionship = ref('')
  const raceIsTriathlon = ref('')
  const raceIsBritainForm = ref('')
  const raceIsTriathlonForm = ref('')
  const raceFormatTriathlonForm = ref('')
  const raceClassifiedMenNumber = ref('')
  const raceClassifiedWomenNumber = ref('')
  const raceManRunningTime = ref('')
  const raceWomanRunningTime = ref('')

  return {
    raceLevel,
    raceCoefficient,
    raceIsChampionship,
    raceIsTriathlon,
    raceIsBritainForm,
    raceIsTriathlonForm,
    raceFormatTriathlonForm,
    raceClassifiedMenNumber,
    raceClassifiedWomenNumber,
    raceManRunningTime,
    raceWomanRunningTime
  }
})
