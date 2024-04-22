// execute one promise
export const goPromise = (promise, action, fcn) => {
  promise
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      fcn(data)
    })
    .catch((error) => {
      console.error(`could not ${action}: ${error}`)
    })
}

// execute a promise with empty response
export const noResponsePromise = (promise, action, fcn) => {
  promise
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      fcn()
    })
    .catch((error) => {
      console.error(`could not ${action}: ${error}`)
    })
}

// import { v4 as uuidv4 } from 'uuid'
import { keyiedRaceFields, keyiedResultFields } from '@/helpers'

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 100

// races

export const requestGetApiRace = () => {
  const rq = new CreateListApiRace()
  return rq.get()
}

export const requestPostApiRace = (data) => {
  const rq = new CreateListApiRace()
  return rq.post(data)
}

export const requestPatchApiRace = (raceId, data) => {
  const rq = new UpdateApiRace()
  return rq.patch(raceId, data)
}

// results

export const requestGetApiRaceResults = (raceId) => {
  const rq = new RetrieveApiRaceResults()
  return rq.get(raceId)
}

export const requestGetApiResult = (resultId) => {
  const rq = new RetrieveApiResult()
  return rq.get(resultId)
}

export const requestPostApiResult = (data) => {
  const rq = new CreateApiResult()
  return rq.post(data)
}

export const requestPatchApiResult = (resultId, data) => {
  const rq = new UpdateDestroyApiResult()
  return rq.patch(resultId, data)
}

export const requestDeleteApiResult = (resultId) => {
  const rq = new UpdateDestroyApiResult()
  return rq.delete(resultId)
}

// licensees

export const requestGetApiLicensees = () => {
  const rq = new ListApiLicensees()
  return rq.get()
}

// points

/*
export const requestPostApiPoints = (data) => {
  const rq = new BaseRequestApi()
  const url = `https://8jgv385jg8.execute-api.eu-west-3.amazonaws.com/default/signature`
  const body = {
    jobName: 'challenge-calculate',
    jobQueue: 'default',
    jobDefinition: 'hello-world',
    race: {
      race_level: 1.0,
      race_coefficient: 1.0,
      is_championship: false,
      is_triathlon: false,
      is_britain_form: 0,
      is_triathlon_form: 0,
      format_triathlon_form: 'm',
      classified_men_number: 974,
      classified_women_number: 201,
      man_running_time: '00:55:08',
      woman_running_time: '01:06:05'
    },
    licensee: {
      runner_ranking: 514,
      classified_in_category: 228,
      ranking_in_category: 151,
      runner_running_time: '01:27:52',
      ptn_bonus_referee: 0,
      ptn_bonus_photo: 0,
      ptn_bonus_video: 0,
      ptn_bonus: 0
    }
  }
  return rq.request(url, body, 'POST')
}
*/

// base api

class BaseRequestApi {
  constructor() {
    this.token = import.meta.env.VITE_BRW_TOKEN
    this.api_url = import.meta.env.VITE_BRW_BASE_URL
    this.page = DEFAULT_PAGE
    this.per_page = DEFAULT_SIZE // maximum number of entries per page
  }
  getUrl() {
    return `${this.api_url}/database/rows/table/${this.table_id}/`
  }
  getValues(data) {
    // convert fields named in fields in uuid
    return this.keyiedFcn(data)
  }
  request(url, body, method) {
    return new Request(url, {
      method: method,
      headers: {
        Authorization: `Token ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }
}

class CreateListRequestApi extends BaseRequestApi {
  get() {
    const url = `${this.getUrl()}?order_by=${this.order_by}`
    return super.request(url, undefined, 'GET')
  }
  post(data) {
    const body = super.getValues(data)
    return super.request(this.getUrl(), body, 'POST')
  }
}

class ListRequestApi extends BaseRequestApi {
  get(id) {
    const url = `${this.getUrl()}?order_by=${this.order_by}&filter__${this.filter}__link_row_has=${id}`
    return super.request(url, undefined, 'GET')
  }
}

class RetrieveUpdateDestroyRequestApi extends BaseRequestApi {
  delete(id) {
    const url = `${this.getUrl()}${id}/`
    return super.request(url, undefined, 'DELETE')
  }
  get(id) {
    const url = `${this.getUrl()}${id}/`
    return super.request(url, undefined, 'GET')
  }
  patch(id, data) {
    const url = `${this.getUrl()}${id}/`
    const body = super.getValues(data)
    return super.request(url, body, 'PATCH')
  }
}

let BaseApiRaceMixin = (Base) =>
  class extends Base {
    constructor() {
      super()
      this.table_id = import.meta.env.VITE_BRW_RACES_TABLE_ID
      this.order_by = import.meta.env.VITE_BRW_RACES_ORDER_BY
      this.keyiedFcn = keyiedRaceFields
    }
  }

let BaseApiResultMixin = (Base) =>
  class extends Base {
    constructor() {
      super()
      this.table_id = import.meta.env.VITE_BRW_RESULTS_TABLE_ID
      this.order_by = import.meta.env.VITE_BRW_RESULTS_ORDER_BY
      this.filter = import.meta.env.VITE_BRW_RESULTS_FILTER
      this.keyiedFcn = keyiedResultFields
    }
  }

let BaseApiLicenseeMixin = (Base) =>
  class extends Base {
    constructor() {
      super()
      this.table_id = import.meta.env.VITE_BRW_LICENSEES_TABLE_ID
      this.order_by = import.meta.env.VITE_BRW_LICENSEES_ORDER_BY
    }
  }

class CreateListApiRace extends BaseApiRaceMixin(CreateListRequestApi) {}

class UpdateApiRace extends BaseApiRaceMixin(RetrieveUpdateDestroyRequestApi) {}

class RetrieveApiRaceResults extends BaseApiResultMixin(ListRequestApi) {}

class RetrieveApiResult extends BaseApiResultMixin(RetrieveUpdateDestroyRequestApi) {}

class ListApiLicensees extends BaseApiLicenseeMixin(CreateListRequestApi) {}

class CreateApiResult extends BaseApiResultMixin(CreateListRequestApi) {}

class UpdateDestroyApiResult extends BaseApiResultMixin(RetrieveUpdateDestroyRequestApi) {}
