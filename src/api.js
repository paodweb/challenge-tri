const getQuintadbApiKeys = () => {
  const api_key = import.meta.env.VITE_QUINTADB_API_KEY
  const api_url = import.meta.env.VITE_QUINTADB_API_URL
  const app_id = import.meta.env.VITE_QUINTADB_APP_ID
  const entity_id = import.meta.env.VITE_QUINTADB_ENTITY_ID
  return [api_key, api_url, app_id, entity_id]
}

export const fetchRacesUrl = () => {
  let api_key, api_url, app_id, entity_id
  [api_key, api_url, app_id, entity_id] = getQuintadbApiKeys()
  return `${api_url}/apps/${app_id}/dtypes/entity/${entity_id}.json?rest_api_key=${api_key}`
}
