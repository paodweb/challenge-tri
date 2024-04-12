import { v4 as uuidv4 } from 'uuid'
import { keyiedRaceFields } from '@/helpers'

const MAX_ENTRIES_PER_PAGE = 200

export const fetchApiRacesIn1Go = () => {
  const rq = new RequestApiRace()
  return rq.get()
}

export const fetchApiResultsIn1Go = () => {
  const rq = new RequestApiResult()
  return rq.get()
}

export function postApiRace(data) {
  const rq = new PostRequestApi()
  rq.post(data)
}

export function putApiRace(id, data) {
  const rq = new PutRequestApi()
  rq.put(id, data)
}

class BaseRequestApi {
  constructor() {
    this.api_key = import.meta.env.VITE_QDB_API_KEY
    this.api_url = import.meta.env.VITE_QDB_API_URL
    this.app_id = import.meta.env.VITE_QDB_APP_ID
    this.entity_id = '--to-be-implemented--'
    this.per_page = MAX_ENTRIES_PER_PAGE  // maximum number of entries per page
  }
  get() {
    return `${this.api_url}/apps/${this.app_id}/dtypes/entity/${this.entity_id}.json?rest_api_key=${this.api_key}&per_page=${this.per_page}`
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

class RequestApiRace extends BaseRequestApi {
  constructor() {
    super()
    this.entity_id = import.meta.env.VITE_QDB_RACE_ID
  }
}

class RequestApiResult extends BaseRequestApi {
  constructor() {
    super()
    this.entity_id = import.meta.env.VITE_QDB_RESULT_ID
  }
}

class PostRequestApi extends RequestApiRace {
  getUrl() {
    return `${this.api_url}/apps/${this.app_id}/dtypes.json`
  }
  getBody(data) {
    const body = super.getBody()
    return { ...body, id: uuidv4(), values: super.getValues(data) }
  }
  post(data) {
    const url = this.getUrl()
    const body = this.getBody(data)
    super.request(url, body, 'POST')
  }
}

class PutRequestApi extends RequestApiRace {
  getUrl(id) {
    return `${this.api_url}/apps/${this.app_id}/dtypes/${id}.json`
  }
  getBody(data) {
    const body = super.getBody()
    return { ...body, values: super.getValues(data) }
  }
  put(id, data) {
    const url = this.getUrl(id)
    const body = this.getBody(data)
    super.request(url, body, 'PUT')
  }
}
