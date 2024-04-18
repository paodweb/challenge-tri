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
const RACE_TITLE = 'field_2033316'
const RACE_DATE = 'field_2033317'
const RACE_LEVEL = 'field_2033318'
const RACE_COEFFICIENT = 'field_2033323'
const RACE_FORMAT = 'field_2033325'
const RACE_NUMBER_CLASSIFIED_WOMEN = 'field_2033326'
const RACE_NUMBER_CLASSIFIED_MEN = 'field_2033327'
const RACE_TIME_FIRST_WOMAN = 'field_2033328'
const RACE_TIME_FIRST_MAN = 'field_2033329'
const RACE_RESULTS_URL = 'field_2033330'
const RACE_COMMENT = 'field_2033332'
const RACE_CHILDREN = 'field_2041497'

const init_fields = [
  'title',
  'date',
  'level',
  'coefficient',
  'format',
  'numberClassifiedWomen',
  'numberClassifiedMen',
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
  RACE_NUMBER_CLASSIFIED_WOMEN,
  RACE_NUMBER_CLASSIFIED_MEN,
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
  for (const record of records) {
    const obj = { id: record.id }
    for (const [key, value_or_array] of Object.entries(record)) {
      // convert field ID into field name
      Object.assign(obj, mapRaceField(key, value_or_array))
    }
    obj_list.push(obj)
  }
  return obj_list
}

// convert field ID into field name, mixed can be value or array
const mapRaceField = (key, mixed) => {
  if (key == RACE_TITLE) {
    return { title: mixed }
  } else if (key == RACE_DATE) {
    return { date: mixed }
  } else if (key == RACE_LEVEL) {
    return { level: mixed }
  } else if (key == RACE_COEFFICIENT) {
    return { coefficient: mixed }
  } else if (key == RACE_FORMAT) {
    return { format: mixed }
  } else if (key == RACE_NUMBER_CLASSIFIED_WOMEN) {
    return { numberClassifiedWomen: mixed }
  } else if (key == RACE_NUMBER_CLASSIFIED_MEN) {
    return { numberClassifiedMen: mixed }
  } else if (key == RACE_TIME_FIRST_WOMAN) {
    return { timeFirstWoman: mixed }
  } else if (key == RACE_TIME_FIRST_MAN) {
    return { timeFirstMan: mixed }
  } else if (key == RACE_RESULTS_URL) {
    return { link: mixed }
  } else if (key == RACE_COMMENT) {
    return { comment: mixed }
  } else if (key == RACE_CHILDREN) {
    // array here
    return { children: mixed.length }
  } else {
    return {}
  }
}

export const mapCollection = (object_key, collection) => {
  let dataCollection = {}
  if (collection == 'coefficient') {
    dataCollection = coefficientCollection
  } else {
    dataCollection = levelCollection
  }

  for (const [key, value] of Object.entries(dataCollection)) {
    if (key == object_key) {
      return value.factor.toString()
    }
  }
  return '1.0' // @TODO improve returning featured element
}

// results fields
const RESULT_LICENSEE = 'field_2039120'
const RESULT_TIME = 'field_2039121'
const RESULT_RANKING = 'field_2039122'
const RESULT_CLASSIFIED_CATEGORY = 'field_2039143'
const RESULT_CATEGORY_RANKING = 'field_2039144'
const RESULT_REFEREE = 'field_2039145'
const RESULT_BONUS = 'field_2039146'
const RESULT_POINTS = 'field_2039147'
const RESULT_RELATION = 'field_2041403'

export const mapResultFields = (records) => {
  const obj_list = []
  for (let record of records) {
    const obj = { id: record.id }
    for (const [key, value_or_object_or_array] of Object.entries(record)) {
      // convert field ID into field name
      Object.assign(obj, mapResultField(key, value_or_object_or_array))
    }
    obj_list.push(obj)
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
