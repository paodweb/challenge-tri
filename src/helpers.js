export const mapRacesFields = (records) => {
  const obj_list = []
  for (let record of records) {
    let obj = { id: record.id }
    for (const [key, value] of Object.entries(record.values)) {
      Object.assign(obj, mapRaceField(key, value))
    }
    obj_list.push(obj)
  }
  return obj_list
}

export const mapResultFields = (records) => {
  const obj_list = []
  for (let record of records) {
    let obj = { id: record.id }
    for (const [key, value] of Object.entries(record.values)) {
      Object.assign(obj, mapRaceField(key, value))
    }
    obj_list.push(obj)
  }
  return obj_list
}

// races fields
const RACE_TITLE = 'cxW7LMWPzbBikNW4JcK8kA'
const RACE_DATE = 'dcVCkwl8jeB4ktW6NdGmoS'
const RACE_LEVEL = 'aWW47cJ8nbalWEW5_dU8kE'
const RACE_COEFFICIENT = 'dcQK8cWQjcSzvOWOarW7yn'
const RACE_FORMAT = 'ddL8o5DCnkW4eAsa7cOgrR'
const RACE_NUMBER_CLASSIFIED_WOMEN_RUNNERS = 'b1W6VdH8nnhQC2WQBdNJKN'
const RACE_NUMBER_CLASSIFIED_MEN_RUNNERS = 'aYc8oMW4HokiklW4ZcHezb'
const RACE_TIME_FIRST_WOMAN = 'blhahdSCjeW49ub2alybuH'
const RACE_TIME_FIRST_MAN = 'aOW4y2jgPcVyortmkYsJrl'
const RACE_RESULTS_URL = 'a9ESozWO5cPQZcNdddKvXH'
const RACE_COMMENT = 'ddVSkDWO1kWPRdH0ZdKCov'
const RACE_CHILDREN = 'bjWQLQWQfhWQ_dUSk6DSoE'

// results fields
const RACE_COMMENT_ = 'ddVSkDWO1kWPRdH0ZdKCov'

const mapCoefficient = (key) => {
  if (key == 'Triathlon • x3') {
    return '3.0'
  } else if (key == 'Duathlon • x3') {
    return '3.0'
  } else if (key == 'Swim&Run / Run&Bike • x1.5') {
    return '1.5'
  } else if (key == 'Aquathlon • x1.5') {
    return '1.5'
  } else {
    // Autres • x1
    return '1.0'
  }
}

const mapLevel = (key) => {
  if (key == 'Championnat de Bretagne • x1.5') {
    return '1.5'
  } else if (key == 'Championnat de France sans qualification • x1.5') {
    return '1.5'
  } else if (key == 'Championnat de France sur sélection • x2') {
    return '2.0'
  } else if (key == 'Championnat international sur sélection • x3') {
    return '3.0'
  } else if (key == 'Hors France métropolitaine • x1.5') {
    return '1.5'
  } else if (key == 'International Elite (CE, JO, Hawaï Pro) • x5') {
    return '5.0'
  } else {
    // France Métropolitaine • x1
    return '1.0'
  }
}

const mapRaceField = (key, value) => {
  if (key == RACE_TITLE) {
    return { title: value }
  } else if (key == RACE_DATE) {
    return { date: value }
  } else if (key == RACE_LEVEL) {
    return { level: mapLevel(value) }
  } else if (key == RACE_COEFFICIENT) {
    return { coefficient: mapCoefficient(value) }
  } else if (key == RACE_FORMAT) {
    return { format: value }
  } else if (key == RACE_NUMBER_CLASSIFIED_WOMEN_RUNNERS) {
    return { number_classified_women_runners: value }
  } else if (key == RACE_NUMBER_CLASSIFIED_MEN_RUNNERS) {
    return { number_classified_men_runners: value }
  } else if (key == RACE_TIME_FIRST_WOMAN) {
    return { time_first_woman: value }
  } else if (key == RACE_TIME_FIRST_MAN) {
    return { time_first_man: value }
  } else if (key == RACE_RESULTS_URL) {
    return { link: value }
  } else if (key == RACE_COMMENT) {
    return { comment: value }
  } else if (key == RACE_CHILDREN) {
    return { children: value }
  } else {
    return {}
  }
}
