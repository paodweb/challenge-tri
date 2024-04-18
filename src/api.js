import { v4 as uuidv4 } from 'uuid'
import { keyiedRaceFields } from '@/helpers'

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

export const requestGetApiResult = (raceId) => {
  const rq = new RetrieveApiResult()
  return rq.get(raceId)
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
    return keyiedRaceFields(data)
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

class RetrieveRequestApi extends BaseRequestApi {
  get(raceId) {
    const url = `${this.getUrl()}?order_by=${this.order_by}&filter__${this.filter}__link_row_has=${raceId}`
    return super.request(url, undefined, 'GET')
  }
}

class UpdateRequestApi extends BaseRequestApi {
  patch(raceId, data) {
    const url = `${this.getUrl()}${raceId}/`
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
    }
  }

let BaseApiResultMixin = (Base) =>
  class extends Base {
    constructor() {
      super()
      this.table_id = import.meta.env.VITE_BRW_RESULTS_TABLE_ID
      this.order_by = import.meta.env.VITE_BRW_RESULTS_ORDER_BY
      this.filter = import.meta.env.VITE_BRW_RESULTS_FILTER
    }
  }

class CreateListApiRace extends BaseApiRaceMixin(CreateListRequestApi) {}

class UpdateApiRace extends BaseApiRaceMixin(UpdateRequestApi) {}

class RetrieveApiResult extends BaseApiResultMixin(RetrieveRequestApi) {}

/*

export function postApiResult(data) {
  const rq = new CreateListApiResult()
  rq.post(data)
}

export function putApiResult(id, data) {
  const rq = new UpdateApiResult()
  rq.put(id, data)
}

class UpdateApiResult extends BaseApiResultMixin(UpdateRequestApi) {}

*/
