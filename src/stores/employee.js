import { ref } from "vue"
import { defineStore } from "pinia"

export const useEmployeeStore = defineStore("employee", () => {
    const employeeFullName = ref("")
    const employeeId = ref("")
    const employeeSignature = ref("")
    const companyName = ref("")
    const companyId = ref("")
    const workingDays = ref([1, 2, 3, 4, 5])
    const workingHourCount = ref(7)
    const accountant = ref("")

    return { accountant, companyId, companyName, employeeFullName, employeeId, employeeSignature, workingDays, workingHourCount }
})
