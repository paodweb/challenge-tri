<script setup>
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { addWeeks, eachDayOfInterval, endOfWeek, format, getDay, getMonth, getYear, isMonday, isSaturday, isSunday, isValid, setDefaultOptions, startOfWeek } from "date-fns"
import { fr } from "date-fns/locale"
import Holidays from "date-holidays"
import { useEmployeeStore } from "@/stores/employee"
import { usePeriodStore } from "@/stores/period"
import { DAYS_IN_WEEK, FIRST_ELIGIBLE_PERIOD_DAY, PERIOD_CODE_LENGTH } from "@/globals"

setDefaultOptions({ locale: fr })
const dateHolidays = new Holidays("FR")

const { accountant, companyId, companyName, employeeFullName, employeeId, employeeSignature, workingDays, workingHourCount } = storeToRefs(useEmployeeStore())
const { periodCode } = storeToRefs(usePeriodStore())

// Periods are made of complete weeks (from Monday to Sunday) starting from the 16th of each month and ending so at the 15th of the following month
const periodStartDate = computed(() => {
    if (!periodCode.value || periodCode.value.length !== PERIOD_CODE_LENGTH) return
    const [periodYear, periodMonth] = periodCode.value.split(" ")
    const year = `20${periodYear}`
    const month = +periodMonth
    const monthIndex = month - 1
    const previousMonthIndex = monthIndex - 1
    const earliestEligibleDate = new Date(year, previousMonthIndex, FIRST_ELIGIBLE_PERIOD_DAY)
    return isMonday(earliestEligibleDate) ? earliestEligibleDate : startOfWeek(addWeeks(earliestEligibleDate, 1))
})

const periodEndDate = computed(() => {
    if (!periodStartDate.value) return
    const earliestEligibleDate = new Date(getYear(periodStartDate.value), getMonth(periodStartDate.value) + 1, FIRST_ELIGIBLE_PERIOD_DAY - 1)
    return isSunday(earliestEligibleDate) ? earliestEligibleDate : endOfWeek(earliestEligibleDate) // TODO vérifier février ?
})

const periodDays = computed(() => {
    if (!periodStartDate.value || !periodEndDate.value) return
    return eachDayOfInterval({ start: periodStartDate.value, end: periodEndDate.value })
})

const tableRows = computed(() => {
    return periodDays.value.reduce((days, day, index) => {
        days.push(day)
        if ((index + 1) % DAYS_IN_WEEK === 0) {
            days.push(null)
        }
        return days
    }, [])
})

const sheetId = computed(() => {
    return `${companyId.value} ${employeeId.value} ${periodCode.value}`
})

function getWorkingCount(date) {
    if (dateHolidays.isHoliday(date)) return "Fér."
    if (isSaturday(date) || isSunday(date)) return
    if (!workingDays?.value?.includes(getDay(date))) return "Non travaillé"
    return workingHourCount?.value
}
</script>

<template>
<div class="preview bg-white p-6 pr-10 leading-none h-screen overflow-y-scroll print:overflow-y-visible" id="preview">
    <div class="flex">
        <span class="uppercase font-bold">{{ companyName }}</span>
        <span class="px-10 py-1 pb-0.5 text-lg leading-none ml-auto mr-1 mb-1 bg-gray-100">{{ isValid(periodEndDate) && format(periodEndDate, "MMMM yyyy") }}</span>
        <span class="text-[0.9rem] font-bold">{{ sheetId }}</span>
    </div>
    <table class="border-collapse text-xs">
        <thead class="align-top">
            <tr>
                <th colspan="6" class="text-left pl-5 font-bold text-sm">{{ employeeFullName }}</th>
                <th colspan="4" class="border border-black uppercase">Horaires de travail</th>
                <th colspan="7">
                    Du <span class="font-bold">{{ isValid(periodStartDate) && format(periodStartDate, "dd/MM/yyyy") }}</span>
                    au <span class="font-bold">{{ isValid(periodEndDate) && format(periodEndDate, "dd/MM/yyyy") }}</span>
                </th>
            </tr>
            <tr class="h-10">
                <th rowspan="2" class="w-[4.7rem]" />
                <th rowspan="2" class="border border-black">Heures travaillées</th>
                <th colspan="2" class="border border-black">Absences</th>
                <th colspan="2" class="border border-black">Quantités</th>
                <th colspan="2" class="border border-black">Période 1</th>
                <th colspan="2" class="border border-black">Période 2</th>
                <th colspan="2" class="border border-black uppercase w-40">Zone libre</th>
                <th class="border-0" />
                <th colspan="4" class="border border-black uppercase">Zone service paie</th>
            </tr>
            <tr>
                <th class="border border-black">Code*</th>
                <th class="border border-black">Heures</th>
                <th class="border border-black">Code*</th>
                <th class="border border-black">Quantité</th>
                <th class="border border-black leading-none w-[3rem]">Heure arrivée</th>
                <th class="border border-black leading-none w-[3rem]">Heure départ</th>
                <th class="border border-black leading-none w-[3rem]">Heure arrivée</th>
                <th class="border border-black leading-none w-[3rem]">Heure départ</th>
                <th v-for="index in 7" :key="index" class="border border-black" :class="{ 'border-0': index === 3 }">{{ index === 3 ? "" : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="day in tableRows" :key="day" :class="[2, 4, 6].includes(getDay(day)) && 'bg-gray-100'">
                <template v-if="!day">
                    <th class="block h-5" />
                    <td v-for="index in 12" :key="index" />
                    <td colspan="4" class="border border-black" />
                </template>
                <template v-else>
                    <th class="border border-black p-0 capitalize text-right text-sm/none">{{ format(day, "E dd/MM").replace(".", "") }}</th>
                    <td class="border border-black"><input class="h-full w-full bg-inherit" :value="getWorkingCount(day)" /></td>
                    <td v-for="index in 4" :key="index" class="border border-black"><input class="h-full w-9 bg-inherit" /></td>
                    <td v-for="index in 11" :key="index" class="border border-black" :class="{ 'border-0': index === 7 }" />
                </template>
            </tr>
        </tbody>
    </table>
    <footer class="grid w-full mt-8 text-sm">
        <div class="flex w-full">
            <span class="uppercase text-right w-1/4">Congés payés du&nbsp;:</span>
            <span>
                <input class="w-10 text-center" />/<input class="w-10 text-center" />/<input class="w-10 text-center" />
            </span>
            <span class="text-xs">(1er jour où le salarié aurait du travailler s'il n'était pas en congé)</span>
        </div>
        <div class="flex w-full">
            <span class="uppercase text-right w-1/4">au&nbsp;:</span>
            <span>
                <input class="w-10 text-center" />/<input class="w-10 text-center" />/<input class="w-10 text-center" />
            </span>
            <span class="text-xs">(veille du jour de reprise)</span>
        </div>
        <div class="flex">
            <div>
                <div>
                    <span class="uppercase">Journée de solidarité&nbsp;:</span>
                    <span><input class="w-5 text-center" /> heures, le</span>
                    <span>
                        <input class="w-7" />/<input class="w-7" />
                    </span>
                </div>
                <div class="flex gap-2 mr-4">
                    <label class="flex flex-col border border-black flex-1 h-[4rem]">
                        Signature du salarié&nbsp;:
                        <span v-html="employeeSignature" class="w-full h-3/4" />
                    </label>
                    <div class="flex flex-col">
                        <span class="text-[0.75rem] font-bold">{{ sheetId }}</span>
                        <span class="text-xs">Traitement par</span>
                        <span class="font-bold">{{ accountant }}</span>
                    </div>
                </div>
                <p class="text-xs">*&nbsp;: Utiliser les codes joints</p>
            </div>
            <div>
                <label class="flex flex-col border border-black h-full">
                    <span class="uppercase text-xs">Informations complémentaires&nbsp;:</span>
                    <div class="h-full m-1">
                        <textarea class="w-full h-full resize-none" />
                    </div>
                </label>
                <p class="uppercase text-xs">En cas de sortie du salarié, compléter le cadre ci-joint</p>
            </div>
        </div>
    </footer>
</div>
</template>

<style scoped>
.preview {
    width: 210mm;
    /* height: 297mm; */
}
</style>
