import { v4 as uuidv4 } from 'uuid'

const getQuintadbApiKeys = () => {
  const api_key = import.meta.env.VITE_QDB_API_KEY
  const api_url = import.meta.env.VITE_QDB_API_URL
  const app_id = import.meta.env.VITE_QDB_APP_ID
  return [api_key, api_url, app_id]
}

const MAX_NUMBER_OF_ENTRIES_PER_PAGE = 200

// fetchRacesPerPage

export const fetchApiRacesIn1Go = () => {
  const entity_id = import.meta.env.VITE_QDB_RACE_ID
  let api_key, api_url, app_id
  ;[api_key, api_url, app_id] = getQuintadbApiKeys()
  return `${api_url}/apps/${app_id}/dtypes/entity/${entity_id}.json?rest_api_key=${api_key}`
}

export const fetchApiResultsIn1Go = (race_id) => {
  const entity_id = import.meta.env.VITE_QDB_RESULT_ID
  let api_key, api_url, app_id
  ;[api_key, api_url, app_id] = getQuintadbApiKeys()
  return `${api_url}/apps/${app_id}/dtypes/entity/${entity_id}.json?rest_api_key=${api_key}`
}

export async function postApiRace(data) {
  const entity_id = import.meta.env.VITE_QDB_RACE_ID
  let api_key, api_url, app_id
  ;[api_key, api_url, app_id] = getQuintadbApiKeys()
  const url = `${api_url}/apps/${app_id}/dtypes.json`
  const body = { rest_api_key: api_key, id: uuidv4(), entity_id: entity_id, ...data }
  try {
    const response = await fetch(url, {
      method: 'POST', // or 'PUT'
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const result = await response.json()
    console.log('Success:', result)
  } catch (error) {
    console.error('Error:', error)
  }
}
