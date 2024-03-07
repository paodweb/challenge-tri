const getQuintadbApiKeys = () => {
  const api_key = import.meta.env.VITE_QDB_API_KEY
  const api_url = import.meta.env.VITE_QDB_API_URL
  const app_id = import.meta.env.VITE_QDB_APP_ID
  return [api_key, api_url, app_id]
}

export const fetchRacesUrl = () => {
  const race_id = import.meta.env.VITE_QDB_RACE_ID
  let api_key, api_url, app_id
  ;[api_key, api_url, app_id] = getQuintadbApiKeys()
  return `${api_url}/apps/${app_id}/dtypes/entity/${race_id}.json?rest_api_key=${api_key}`
}

export const fetchResultsUrl = () => {
  const result_id = import.meta.env.VITE_QDB_RESULT_ID
  let api_key, api_url, app_id
  ;[api_key, api_url, app_id] = getQuintadbApiKeys()
  return `${api_url}/apps/${app_id}/dtypes/entity/${result_id}.json?rest_api_key=${api_key}`
}
