<script setup>
import { computed, onMounted, ref } from "vue"
import { storeToRefs } from "pinia"
import { useEmployeeStore } from "@/stores/employee"
import { usePeriodStore } from "@/stores/period"
import { COMPANY_ID_LENGTH, EMPLOYEE_ID_LENGTH, PERIOD_CODE_LENGTH } from "@/globals"

const { accountant, companyId, companyName, employeeFullName, employeeId, employeeSignature, workingDays, workingHourCount } = storeToRefs(useEmployeeStore())
const { periodCode, periodMonth, periodYear } = storeToRefs(usePeriodStore())

const formLabels = {
    accountant: "Comptable",
    companyId: "Matricule de l'entreprise",
    companyName: "Nom de l'entreprise",
    employeeId: "Matricule de l'employé",
    employeeFullName: "Nom complet de l'employé",
    periodCode: "Période",
}

const leaveCodes = {
    A01: "Absence autorisée",
    A02: "Absence non justifiée",
    A03: "Absence maladie non professionnelle",
    A04: "Absence maladie professionnelle",
    A05: "Absence accident du travail",
    A06: "Absence maternité",
    A07: "Absence congés payés",
    A08: "Absence congés sans solde",
    A09: "Absence congés exceptionnels",
    A10: "Absence formation professionnelle",
    A11: "Absence chômage partiel",
    A12: "Absence chômage intempérie",
    A13: "Absence congés paternité",
    A14: "Absence congé de naissance",
}

const isEmployeeFormShown = ref(false)
const errorMessage = ref("")

const isCompanyIdValid = computed(() => {
    return companyId.value?.length === COMPANY_ID_LENGTH
})

const isEmployeeIdValid = computed(() => {
    return employeeId.value?.length === EMPLOYEE_ID_LENGTH
})

const isPeriodCodeValid = computed(() => {
    return periodCode.value?.length === PERIOD_CODE_LENGTH
})

function retrieveEmployeeDetails() {
    companyId.value = localStorage.getItem("companyId")
    companyName.value = localStorage.getItem("companyName")
    employeeId.value = localStorage.getItem("employeeId")
    employeeFullName.value = localStorage.getItem("employeeFullName")
    employeeSignature.value = localStorage.getItem("employeeSignature") || ""
    const localStorageWorkingDays = JSON.parse(localStorage.getItem("workingDays"))
    workingDays.value = Array.isArray(localStorageWorkingDays) ? localStorageWorkingDays : [1, 2, 3, 4, 5]
    workingHourCount.value = localStorage.getItem("workingHourCount") || 7
}

function saveEmployeeDetails() {
    companyId.value && localStorage.setItem("companyId", companyId.value)
    companyName.value && localStorage.setItem("companyName", companyName.value)
    employeeId.value && localStorage.setItem("employeeId", employeeId.value)
    employeeFullName.value && localStorage.setItem("employeeFullName", employeeFullName.value)
    employeeSignature.value && localStorage.setItem("employeeSignature", employeeSignature.value)
    localStorage.setItem("workingDays", JSON.stringify(workingDays.value))
    workingHourCount.value && localStorage.setItem("workingHourCount", workingHourCount.value)

    isEmployeeFormShown.value = false
}

function getPeriodDocumentTitle() {
    const fullYearPeriod = `20${periodYear.value}-${periodMonth.value}`
    const employeeAcronym = employeeFullName.value.split(/[ -]/).map((name) => name[0]).join("")
    return `${fullYearPeriod} - ${employeeAcronym}`
}

function printPreview() {
    const appName = document.title
    document.title = getPeriodDocumentTitle()
    window.print()
    document.title = appName
}

function submit() {
    errorMessage.value = ""

    const formValues = {
        companyName: companyName.value,
        companyId: isCompanyIdValid.value,
        employeeFullName: employeeFullName.value,
        employeeId: isEmployeeIdValid.value,
        periodCode: isPeriodCodeValid.value,
        accountant: accountant.value,
    }
    const isFormValid = Object.values(formValues).every(Boolean)
    if (!isFormValid) {
        errorMessage.value = Object.entries(formValues).filter((entry) => !entry[1]).map((entry) => formLabels[entry[0]]).join(", ")
        return
    }

    printPreview()
}

onMounted(() => {
    retrieveEmployeeDetails()
})
</script>

<template>
    <form @submit.prevent class="print:hidden h-screen w-auto flex flex-1 p-10 gap-10 justify-center items-center bg-slate-900 rounded-2xl shadow-2xl text-rose-300 italic overflow-y-auto">
        <form v-if="isEmployeeFormShown" class="h-full flex flex-col gap-5 items-center w-[400px]">
            <div class="flex flex-col gap-5">
                <label class="flex flex-col">
                    {{formLabels.companyName}}
                    <input v-model="companyName" placeholder="Nom De l'Entreprise" class="input" />
                </label>
                <label class="flex flex-col">
                    {{formLabels.companyId}}
                    <input v-model="companyId" :maxlength="COMPANY_ID_LENGTH" placeholder="00000" class="input" />
                </label>
                <label class="flex flex-col">
                    {{formLabels.employeeFullName}}
                    <input v-model="employeeFullName" placeholder="NOM DE FAMILLE Prénom" class="input" />
                </label>
                <label class="flex flex-col">
                    {{formLabels.employeeId}}
                    <input v-model="employeeId" :maxlength="EMPLOYEE_ID_LENGTH" placeholder="000" class="input" />
                </label>
                <label class="flex flex-col">
                    Signature de l'employé
                    <p class="text-slate-100">
                        Penser à ajouter
                        <span class="font-mono text-sm text-cyan-400">
                            class="<span class="text-amber-400">h-full w-full</span>"
                        </span>
                        au tag svg
                    </p>
                    <textarea v-model="employeeSignature" placeholder="<svg class='h-full w-full'>...</svg>" class="input" />
                </label>
                <label class="flex flex-col">
                    Heures travaillées par défaut
                    <input v-model.number="workingHourCount" type="number" class="w-20 input" />
                </label>
                <fieldset class="flex flex-col">
                    <legend>Jours travaillés par défaut</legend>
                    <label>
                        <input v-model="workingDays" type="checkbox" :value="1" />
                        Lundi
                    </label>
                    <label>
                        <input v-model="workingDays" type="checkbox" :value="2" />
                        Mardi
                    </label>
                    <label>
                        <input v-model="workingDays" type="checkbox" :value="3" />
                        Mercredi
                    </label>
                    <label>
                        <input v-model="workingDays" type="checkbox" :value="4" />
                        Jeudi
                    </label>
                    <label>
                        <input v-model="workingDays" type="checkbox" :value="5" />
                        Vendredi
                    </label>
                </fieldset>
            </div>
            <button class="button-secondary w-full" type="button" @click="saveEmployeeDetails">Sauvegarder mes informations</button>
        </form>
        <div v-else class="flex flex-col gap-8 max-w-[400px]">
            <button class="button-secondary w-full m-auto" type="button" @click="isEmployeeFormShown = true">Modifier mes informations</button>
            <fieldset class="flex gap-5">
                <label class="flex flex-col">
                    {{formLabels.periodCode}}
                    <input v-model="periodCode" placeholder="AA MM" :maxlength="PERIOD_CODE_LENGTH" class="w-20 input" />
                </label>
                <label class="flex flex-col w-full">
                    {{formLabels.accountant}}
                    <input v-model="accountant" placeholder="Prénom" class="input" />
                </label>
            </fieldset>
            <footer class="flex flex-col gap-5 items-center">
                <div class="flex flex-col gap-2 w-full">
                    <button class="button-primary" type="submit" @click="submit">Générer pdf</button>
                    <p v-if="errorMessage" class="text-rose-600">Les informations suivantes sont invalides&nbsp;: <span class="text-rose-300">{{errorMessage}}</span></p>
                </div>
                <details class="details w-full">
                    <summary class="summary w-full">Problèmes lors de la prévisualisation</summary>
                    <div class="details-body flex flex-col gap-6">
                        <p class="text-sm text-slate-100">Penser à désactiver les marges dans la fenêtre d'impression.</p>
                        <p class="text-sm text-slate-100">Pour préserver les nuances de gris, penser à activer les graphiques d'arrière-plan dans la fenêtre d'impression.</p>
                        <div>

                            <p class="text-sm text-slate-100">Certains navigateurs prévisualisent mal les tableaux, mais produisent quand-même le rendu final attendu&nbsp;:</p>
                            <table class="text-sm text-center w-full max-w-md mt-2">
                                <thead>
                                    <tr>
                                        <th>Navigateur</th>
                                        <th>Prévisualisation</th>
                                        <th>Rendu</th>
                                    </tr>
                                </thead>
                                <tbody class="not-italic">
                                    <tr>
                                        <th class="p-1"><img class="max-h-6 m-auto" src="@/assets/images/logos/brave.png" alt="Logo de Brave" /></th>
                                        <td><div class="w-3 h-3 m-auto bg-green-500 rounded-full" /></td>
                                        <td><div class="w-3 h-3 m-auto bg-green-500 rounded-full" /></td>
                                    </tr>
                                    <tr>
                                        <th class="p-1"><img class="max-h-6 m-auto" src="@/assets/images/logos/google-chrome.png" alt="Logo de Google Chrome" /></th>
                                        <td><div class="w-3 h-3 m-auto bg-green-500 rounded-full" /></td>
                                        <td><div class="w-3 h-3 m-auto bg-green-500 rounded-full" /></td>
                                    </tr>
                                    <tr>
                                        <th class="p-1"><img class="max-h-6 m-auto" src="@/assets/images/logos/firefox.png" alt="Logo de Firefox" /></th>
                                        <td><div class="w-3 h-3 m-auto bg-rose-700 rounded-full" /></td>
                                        <td><div class="w-3 h-3 m-auto bg-green-500 rounded-full" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </details>
                <details class="details w-full">
                    <summary class="summary">Codes d'absence</summary>
                    <dl class="details-body">
                        <div v-for="(value, key) in leaveCodes" :key="key" class="flex gap-2">
                            <dt class="w-10 text-slate-100 text-right">{{key}}</dt>
                            <dd>{{value}}</dd>
                        </div>
                    </dl>
                </details>
            </footer>
        </div>
    </form>
</template>
