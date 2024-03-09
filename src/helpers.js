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

export const mapRacesFields = (records) => {
  const obj_list = []
  for (let record of records) {
    let obj = { id: record.id }
    for (const [key, value] of Object.entries(record.values)) {
      // convert field ID into field name
      Object.assign(obj, mapRaceField(key, value))
    }
    obj_list.push(obj)
  }
  return obj_list
}

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

// convert field ID into field name
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
    return { numberClassifiedWomenRunners: value }
  } else if (key == RACE_NUMBER_CLASSIFIED_MEN_RUNNERS) {
    return { numberClassifiedMenRunners: value }
  } else if (key == RACE_TIME_FIRST_WOMAN) {
    return { timeFirstWoman: value }
  } else if (key == RACE_TIME_FIRST_MAN) {
    return { timeFirstMan: value }
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

// results fields
const RESULT_RELATION = 'aewCkDWQrdVkldTdy1quOq'
const RESULT_TIME = 'dcP0FdTSnfWR4QWPb5W5qR'
const RESULT_RANKING = 'aMWPtcHdLpCOkalxfPu3Pg'
const RESULT_CLASSIFIED_CATEGORY = 'dcGSoOWPHcLQSCWPeWkCo7'
const RESULT_CATEGORY_RANKING = 'bUW6jIW4HlW5JdGWvWemoR'
const RESULT_REFEREE = 'dcL8kbW5zmWPxcPZWKW4uP'
const RESULT_BONUS = 'ddKSk9WRnjW4JcReebWPv4'
const RESULT_POINTS = 'auyCoscNHhWQuanmo0iCoA'
const RESULT_LICENSEE = 'dcO8k-vSjnBkpcPSkpn8km'

export const mapResultFields = (race_id, records) => {
  const obj_list = []
  for (let record of records) {
    // filter results
    if (record.rel_values[RESULT_RELATION].includes(race_id)) {
      let obj = { id: record.id }
      for (const [key, value] of Object.entries(record.values)) {
        // convert field ID into field name
        Object.assign(obj, mapResultField(key, value))
      }
      obj_list.push(obj)
    }
  }
  return obj_list
}

// convert field ID into field name
const mapResultField = (key, value) => {
  if (key == RESULT_RELATION) {
    return { relation: value }
  } else if (key == RESULT_TIME) {
    return { time: value }
  } else if (key == RESULT_RANKING) {
    return { ranking: value }
  } else if (key == RESULT_CLASSIFIED_CATEGORY) {
    return { classifiedCategory: value }
  } else if (key == RESULT_CATEGORY_RANKING) {
    return { categoryRanking: value }
  } else if (key == RESULT_REFEREE) {
    return { referee: value }
  } else if (key == RESULT_BONUS) {
    return { bonus: value }
  } else if (key == RESULT_POINTS) {
    return { points: value }
  } else if (key == RESULT_LICENSEE) {
    return { licensee: value }
  } else {
    return {}
  }
}
