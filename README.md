# Challenge triathlon

Tiny web project to count points of licensees of the [DEL](https://www.landerneau-triathlon.com).
Licensees' points are based on the races they complete.

This application is used by administrators that fill points.

This is a [Vue.js](https://vuejs.org/) project bootstrapped with [Create Vue](https://github.com/vuejs/create-vue).

Data are stored in an online database [QuintaDB](https://quintadb.com/fr-api#forminfo)

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

## glossary

course :

* Nom de la course :                `title`
* Date de la course :               `date`
* Niveau de la course :             `level`
* Coefficient de la course :        `coefficient`
* Format de la course :             `format`
* Nombre de coureuses classées :    `numberClassifiedWomenRunners`
* Nombre de coureurs classés :      `numberClassifiedMenRunners`
* Temps de la première féminine :   `timeFirstWoman`
* Temps du premier masculin :       `timeFirstMan`
* Lien aux résultats :              `link`
* Commentaire :                     `comment`

résultats :

* Temps de la personne :                        `time`
* Classement de la personne :                   `ranking`
* Nombre de coureu.rs.ses dans la catégorie :   `classifiedCategory`
* Classement dans la catégorie :                `categoryRanking`
* Arbitre :                                     `referee`
* Bonus photo, vidéo, etc. :                    `bonus`
* Nombre de points acquis sur une course :      `points`
* Licencié.e :                                  `licensee`
