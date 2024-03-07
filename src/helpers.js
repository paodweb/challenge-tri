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
  if (key == import.meta.env.VITE_RACE_TITLE) {
    return { title: value }
  } else if (key == import.meta.env.VITE_RACE_DATE) {
    return { date: value }
  } else if (key == import.meta.env.VITE_RACE_LEVEL) {
    return { level: mapLevel(value) }
  } else if (key == import.meta.env.VITE_RACE_COEFFICIENT) {
    return { coefficient: mapCoefficient(value) }
  } else if (key == import.meta.env.VITE_RACE_FORMAT) {
    return { format: value }
  } else if (key == import.meta.env.VITE_RACE_NUMBER_CLASSIFIED_WOMEN_RUNNERS) {
    return { number_classified_women_runners: value }
  } else if (key == import.meta.env.VITE_RACE_NUMBER_CLASSIFIED_MEN_RUNNERS) {
    return { number_classified_men_runners: value }
  } else if (key == import.meta.env.VITE_RACE_TIME_FIRST_WOMAN) {
    return { time_first_woman: value }
  } else if (key == import.meta.env.VITE_RACE_TIME_FIRST_MAN) {
    return { time_first_man: value }
  } else if (key == import.meta.env.VITE_RACE_RESULTS_URL) {
    return { link: value }
  } else if (key == import.meta.env.VITE_RACE_COMMENT) {
    return { comment: value }
  } else {
    return {}
  }
}
