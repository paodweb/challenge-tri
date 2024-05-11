// import { v4 as uuidv4 } from 'uuid'
import { keyiedRaceFields, keyiedResultFields, namedLicenseeFields } from '@/helpers'

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 100

// execute one promise
export const goPromise = (promise, action, fcn) => {
  promise
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      if (response.status != 204) {
        return response.json()
      } else {
        // delete call: no content
        return null
      }
    })
    .then((data) => {
      fcn(data)
    })
    .catch((error) => {
      console.error(`could not ${action}: ${error}`)
    })
}

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

export async function getLicensees(callsNumber) {
  // Get licensees with multiple calls to api
  const rq = new ListApiLicensees()
  const requests = Array.from({ length: callsNumber }, (v, i) =>
    rq.request(`${rq.getUrl()}?order_by=${rq.order_by}&page=${1 + i}`, undefined, 'GET')
  )
  const promises = requests.map((promise) =>
    fetch(promise)
      .then((res) => res.json())
      .then((data) => data.results)
      .catch((error) => {
        console.error(`could not get licensees: ${error}`)
      })
  )
  const rawdata = (await Promise.all(promises)).flat()
  // convert fields id with fields name
  return namedLicenseeFields(rawdata)
}

export const requestGetApiPublicLicensees = () => {
  const rq = new ListApiPublicLicensees()
  return rq.get()
}

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
  get(id = 0) {
    const url = `${this.getUrl()}?order_by=${this.order_by}&filter__${this.filter_field}__${this.filter}=${id}`
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
      this.filter_field = import.meta.env.VITE_BRW_RESULTS_FILTER_FIELD
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

let BaseApiPublicLicenseeMixin = (Base) =>
  class extends Base {
    constructor() {
      super()
      this.table_id = import.meta.env.VITE_BRW_LICENSEES_TABLE_ID
      this.order_by = import.meta.env.VITE_BRW_PUBLIC_LICENSEES_ORDER_BY
      this.filter_field = import.meta.env.VITE_BRW_PUBLIC_LICENSEES_FILTER_FIELD
      this.filter = import.meta.env.VITE_BRW_PUBLIC_LICENSEES_FILTER
    }
  }

class CreateListApiRace extends BaseApiRaceMixin(CreateListRequestApi) {}

class UpdateApiRace extends BaseApiRaceMixin(RetrieveUpdateDestroyRequestApi) {}

class RetrieveApiRaceResults extends BaseApiResultMixin(ListRequestApi) {}

class RetrieveApiResult extends BaseApiResultMixin(RetrieveUpdateDestroyRequestApi) {}

class ListApiLicensees extends BaseApiLicenseeMixin(CreateListRequestApi) {}

class CreateApiResult extends BaseApiResultMixin(CreateListRequestApi) {}

class UpdateDestroyApiResult extends BaseApiResultMixin(RetrieveUpdateDestroyRequestApi) {}

class ListApiPublicLicensees extends BaseApiPublicLicenseeMixin(ListRequestApi) {}
