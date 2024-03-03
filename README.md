# Challenge triathlon

Tiny web project to count points of licensees of the [DEL](https://www.landerneau-triathlon.com).
Licensees' points are based on the races they complete.

This application is used by administrators that fill points.

This is a [Vue.js](https://vuejs.org/) project bootstrapped with [Create Vue](https://github.com/vuejs/create-vue).

[See it live](https://paodweb.github.io/challenge-tri/).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Access to database

api key: cuW5RcSCnotiiWWO7cVCoV

app_id: cOWORcKM1fWRZcKqP6y8kk (db)

entity_id: cDWR8wWPHnWRhdPwKbW50i (form)

api_url: https://quintadb.com/

races
---
GET { api_url }apps/{ app_id }/dtypes/entity/{ entity_id }.json

response: [records].values

field id                    field label
---                         ---
cxW7LMWPzbBikNW4JcK8kA      Nom de la course
dcVCkwl8jeB4ktW6NdGmoS      Date de la course
aWW47cJ8nbalWEW5_dU8kE      Niveau de la course
dcQK8cWQjcSzvOWOarW7yn      Coefficient
ddL8o5DCnkW4eAsa7cOgrR      Format de la course
aYc8oMW4HokiklW4ZcHezb      Nombre de coureurs classés
b1W6VdH8nnhQC2WQBdNJKN      Nombre de coureuses classées
aOW4y2jgPcVyortmkYsJrl      Temps du premier
blhahdSCjeW49ub2alybuH      Temps de la première
a9ESozWO5cPQZcNdddKvXH      Lien aux résultats
ddVSkDWO1kWPRdH0ZdKCov      Commentaire
