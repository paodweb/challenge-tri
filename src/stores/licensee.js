import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLicenseeStore = defineStore('licensee', () => {
  const licenseeRunnerRanking = ref('')
  const licenseeClassifiedInCategory = ref('')
  const licenseeRankingInCategory = ref('')
  const licenseeRunnerRunningTime = ref('')
  const licenseeBonusReferee = ref('')
  const licenseeBonusPhoto = ref('')
  const licenseeBonusVideo = ref('')
  const licenseeBonus = ref('')

  return {
    licenseeRunnerRanking,
    licenseeClassifiedInCategory,
    licenseeRankingInCategory,
    licenseeRunnerRunningTime,
    licenseeBonusReferee,
    licenseeBonusPhoto,
    licenseeBonusVideo,
    licenseeBonus
  }
})
