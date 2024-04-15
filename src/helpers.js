// levels
const levelCollection = {
  'code-level-a': { factor: 1.5, label: 'Championnat de Bretagne • x1.5' },
  'code-level-b': { factor: 1.5, label: 'Championnat de France sans qualification • x1.5' },
  'code-level-c': { factor: 2.0, label: 'Championnat de France sur sélection • x2' },
  'code-level-d': { factor: 3.0, label: 'Championnat international sur sélection • x3' },
  'code-level-e': { factor: 1.0, label: 'France Métropolitaine • x1' },
  'code-level-f': { factor: 1.5, label: 'Hors France métropolitaine • x1.5' },
  'code-level-g': { factor: 5.0, label: 'International Élite (CE, JO, Hawaï Pro) • x5' }
}

// coefficients
const coefficientCollection = {
  'code-coefficient-a': { factor: 3.0, label: 'Triathlon • x3' },
  'code-coefficient-b': { factor: 3.0, label: 'Duathlon • x3' },
  'code-coefficient-c': { factor: 1.5, label: 'Aquathlon • x1.5' },
  'code-coefficient-d': { factor: 1.5, label: 'Swim&Run / Run&Bike • x1.5' },
  'code-coefficient-e': { factor: 1.0, label: 'Autres • x1' }
}

export const getSelectOptions = (collection) => {
  let dataCollection = {}
  if (collection == 'coefficient') {
    dataCollection = coefficientCollection
  } else {
    dataCollection = levelCollection
  }
  // render list of objects...
  const list = []
  for (const [key, value] of Object.entries(dataCollection)) {
    list.push({ value: key, label: value.label })
  }
  return list
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

const init_fields = [
  'title',
  'date',
  'level',
  'coefficient',
  'format',
  'numberClassifiedWomenRunners',
  'numberClassifiedMenRunners',
  'timeFirstWoman',
  'timeFirstMan',
  'link',
  'comment'
]
const crypted_fields = [
  RACE_TITLE,
  RACE_DATE,
  RACE_LEVEL,
  RACE_COEFFICIENT,
  RACE_FORMAT,
  RACE_NUMBER_CLASSIFIED_WOMEN_RUNNERS,
  RACE_NUMBER_CLASSIFIED_MEN_RUNNERS,
  RACE_TIME_FIRST_WOMAN,
  RACE_TIME_FIRST_MAN,
  RACE_RESULTS_URL,
  RACE_COMMENT
]

export const keyiedRaceFields = (data) => {
  const mapped = {}
  init_fields.forEach((element, index) => {
    mapped[crypted_fields.at(index)] = data[element]
  })
  return mapped
}

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

// convert field ID into field name
const mapRaceField = (key, value) => {
  if (key == RACE_TITLE) {
    return { title: value }
  } else if (key == RACE_DATE) {
    return { date: value }
  } else if (key == RACE_LEVEL) {
    return { level: mapCollection(value) }
  } else if (key == RACE_COEFFICIENT) {
    return { coefficient: mapCollection(value, 'coefficient') }
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

const mapCollection = (code, collection) => {
  let dataCollection = {}
  if (collection == 'coefficient') {
    dataCollection = coefficientCollection
  } else {
    dataCollection = levelCollection
  }

  for (const [key, value] of Object.entries(dataCollection)) {
    if (key == code) {
      return value.factor.toString()
    }
  }
  return '1.0' // @TODO improve returning featured element
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
