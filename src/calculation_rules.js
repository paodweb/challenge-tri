export const getCalculationPoints = (data) => {
  const body = JSON.parse(data)
  let total = 0

  // create new instance
  const obj = new ChallengeCalculation(body.licensee, body.race)

  if (obj.isReferee) {
    // being a referee!
    total += obj.getRefereeBonusPoints
  } else {
    // not being a referee!

    total += obj.calculate_time
    total += obj.calculate_ranking
    total += obj.calculate_classification

    // get points if been first on scratch or category
    total += obj.getFirstScratchOrCategoryBonusPoints

    // get points from triathlon format
    total += obj.getTriathlonSizeBonusPoints

    // get bonus points on photo
    total += obj.getPhotoBonusPoints

    // get bonus points on video
    total += obj.getVideoBonusPoints

    // get addditional bonus points
    total += obj.getExtraBonusPoints
    total = Math.round(total)

    // check for a minimum total of points
    total = obj.getMinBonusPoints(total)
  }

  return total
}

// points for victory
const SCRATCH_FIRST_BONUS_POINTS = 400
const CATEGORY_FIRST_BONUS_POINTS = 100

// points compared to the size of the triathlon
const XS_TRIATHLON_BONUS_POINTS = 0
const S_TRIATHLON_BONUS_POINTS = 50
const M_TRIATHLON_BONUS_POINTS = 100
const L_TRIATHLON_BONUS_POINTS = 150
const XL_TRIATHLON_BONUS_POINTS = 300

// bonus
const PHOTO_BONUS_POINTS = 200
const REFEREE_BONUS_POINTS = 500
const VIDEO_BONUS_POINTS = 200

// minimum points
const MINIMUM_BONUS_POINTS = 80

class ChallengeCalculation {
  /*
   * Calculate points for one runner with one race.
   */
  constructor(licensee, race) {
    this.licensee = licensee
    this.race = race
  }

  // points for victory
  static get scratch1stBonusPoints() {
    return SCRATCH_FIRST_BONUS_POINTS
  }
  static get category1stBonusPoints() {
    return CATEGORY_FIRST_BONUS_POINTS
  }
  // points compared to the size of the triathlon
  static get xsTriathlonBonusPoints() {
    return XS_TRIATHLON_BONUS_POINTS
  }
  static get smTriathlonBonusPoints() {
    return S_TRIATHLON_BONUS_POINTS
  }
  static get mdTriathlonBonusPoints() {
    return M_TRIATHLON_BONUS_POINTS
  }
  static get lgTriathlonBonusPoints() {
    return L_TRIATHLON_BONUS_POINTS
  }
  static get xlTriathlonBonusPoints() {
    return XL_TRIATHLON_BONUS_POINTS
  }
  // bonus
  static get photoBonusPoints() {
    return PHOTO_BONUS_POINTS
  }
  static get refereeBonusPoints() {
    return REFEREE_BONUS_POINTS
  }
  static get videoBonusPoints() {
    return VIDEO_BONUS_POINTS
  }
  // minimum points
  static get minBonusPoints() {
    return MINIMUM_BONUS_POINTS
  }

  // get miscellaneous points
  static bonusPoints() {
    return ChallengeCalculation.refereeBonusPoints
  }

  // convert time from string to full seconds
  convert_time(data) {
    const h_in_s = 3600 * parseInt(data.substr(0, 2))
    const m_in_s = 60 * parseInt(data.substr(3, 2))
    const s = parseInt(data.substr(6, 2))
    return h_in_s + m_in_s + s
  }

  // get minimum bonus points
  getMinBonusPoints(total) {
    if (total < ChallengeCalculation.minBonusPoints) {
      return ChallengeCalculation.minBonusPoints
    }
    return total
  }

  // calculate time
  get calculate_time() {
    const t1 = this.convert_time(this.race.man_running_time)
    const t2 = this.convert_time(this.licensee.runner_running_time)
    return 100 * (t1 / t2)
  }

  // calculate ranking
  get calculate_ranking() {
    // if ($occcatclasses == 1)
    // $occtotal = $occtotal + 100
    const ranking = parseInt(this.licensee.ranking_in_category)
    const sub = parseInt(this.licensee.classified_in_category) - ranking
    return (100 / (ranking - 1 + sub)) * sub
  }

  get calculate_classification() {
    const classification = parseInt(this.licensee.runner_ranking)
    const sub = parseInt(this.race.classified_men_number) - classification
    let points = (100 / (classification - 1 + sub)) * sub
    points = points * parseFloat(this.race.race_level)
    return points * parseFloat(this.race.race_coefficient)
  }

  // check it is a referee
  get isReferee() {
    return 0 < this.licensee.ptn_bonus_referee
  }

  // get points from been referee
  get getRefereeBonusPoints() {
    if (0 < this.licensee.ptn_bonus_referee) {
      return ChallengeCalculation.refereeBonusPoints
    }
    return 0
  }

  // check if first on scratch or category
  get getFirstScratchOrCategoryBonusPoints() {
    // check if first on scratch
    if (1 == this.licensee.runner_ranking) {
      return ChallengeCalculation.scratch1stBonusPoints
    } else if (1 == this.licensee.ranking_in_category) {
      // check if first on category
      return ChallengeCalculation.category1stBonusPoints
    }
    return 0
  }

  // check if triathlon and what is the format!
  get getTriathlonSizeBonusPoints() {
    if (this.race.is_triathlon) {
      switch (this.race.format_triathlon_form) {
        case 'xs':
          return ChallengeCalculation.xsTriathlonBonusPoints
        case 's':
          return ChallengeCalculation.smTriathlonBonusPoints
        case 'm':
          return ChallengeCalculation.mdTriathlonBonusPoints
        case 'l':
          return ChallengeCalculation.lgTriathlonBonusPoints
        case 'xl':
          return ChallengeCalculation.xlTriathlonBonusPoints
      }
    }
    return 0
  }

  // get bonus points on photo
  get getPhotoBonusPoints() {
    if (0 < this.licensee.ptn_bonus_photo) {
      return ChallengeCalculation.photoBonusPoints
    }
    return 0
  }

  // get bonus points on video
  get getVideoBonusPoints() {
    if (0 < this.licensee.ptn_bonus_video) {
      return ChallengeCalculation.videoBonusPoints
    }
    return 0
  }

  // get extra bonus points
  get getExtraBonusPoints() {
    return parseInt(this.licensee.ptn_bonus)
  }
}
