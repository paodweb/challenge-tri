import { v4 as uuidv4 } from 'uuid'
import { keyiedRaceFields } from '@/helpers'

const MAX_ENTRIES_PER_PAGE = 200

export const fetchApiRacesIn1Go = () => {
  const rq = new CreateListApiRace()
  return rq.get()
}

export const fetchApiResultsIn1Go = () => {
  const rq = new CreateListApiResult()
  return rq.get()
}

export function postApiRace(data) {
  const rq = new CreateListApiRace()
  rq.post(data)
}

export function putApiRace(id, data) {
  const rq = new UpdateApiRace()
  rq.put(id, data)
}

export function postApiResult(data) {
  const rq = new CreateListApiResult()
  rq.post(data)
}

export function putApiResult(id, data) {
  const rq = new UpdateApiResult()
  rq.put(id, data)
}

class BaseRequestApi {

  constructor() {
    this.api_key = import.meta.env.VITE_QDB_API_KEY
    this.api_url = import.meta.env.VITE_QDB_API_URL
    this.app_id = import.meta.env.VITE_QDB_APP_ID
    this.entity_id = '--to-be-implemented--'
    this.per_page = MAX_ENTRIES_PER_PAGE // maximum number of entries per page
  }
  getBody() {
    return { rest_api_key: this.api_key, entity_id: this.entity_id }
  }
  getValues(data) {
    // convert fields named in fields in uuid
    return keyiedRaceFields(data)
  }
  async request(url, body, method) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const result = await response.json()
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

class CreateListRequestApi extends BaseRequestApi {
  
  getBody(data) {
    const body = super.getBody()
    return { ...body, id: uuidv4(), values: super.getValues(data) }
  }
  get() {
    return `${this.api_url}/apps/${this.app_id}/dtypes/entity/${this.entity_id}.json?rest_api_key=${this.api_key}&per_page=${this.per_page}`
  }
  post(data) {
    const url = `${this.api_url}/apps/${this.app_id}/dtypes.json`
    const body = this.getBody(data)
    super.request(url, body, 'POST')
  }
}

class UpdateRequestApi extends BaseRequestApi {

  getBody(data) {
    const body = super.getBody()
    return { ...body, values: super.getValues(data) }
  }
  put(id, data) {
    const url = `${this.api_url}/apps/${this.app_id}/dtypes/${id}.json`
    const body = this.getBody(data)
    super.request(url, body, 'PUT')
  }
}

let BaseApiRaceMixin = (Base) =>
  class extends Base {
    constructor() {
      super()
      this.entity_id = import.meta.env.VITE_QDB_RACE_ID
    }
  }

let BaseApiResultMixin = (Base) =>
  class extends Base {
    constructor() {
      super()
      this.entity_id = import.meta.env.VITE_QDB_RESULT_ID
    }
  }

class CreateListApiRace extends BaseApiRaceMixin(CreateListRequestApi) {}

class UpdateApiRace extends BaseApiRaceMixin(UpdateRequestApi) {}

class CreateListApiResult extends BaseApiResultMixin(CreateListRequestApi) {}

class UpdateApiResult extends BaseApiResultMixin(UpdateRequestApi) {}
