import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { format } from "date-fns"

export const usePeriodStore = defineStore("period", () => {
    const periodCode = ref(format(new Date(), "yy MM"))
    const periodYear = computed(() => periodCode.value.split(" ")?.[0])
    const periodMonth = computed(() => periodCode.value.split(" ")?.[1])

    return { periodCode, periodMonth, periodYear }
})
