import axios from 'axios'
import apiUrl from '../apiConfig'

export const gardenIndex = () => {
  return axios({
    url: 'https://data.cityofnewyork.us/resource/p78i-pat6.json',
    method: 'GET',
    data: {
      '$limit': 15
    }
  })
}

export const gardenCreate = (garden, user) => {
  return axios({
    url: apiUrl + '/gardens',
    method: 'POST',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    },
    // send the garden object as our data for creating a garden
    data: { garden }
  })
}
export const gardenShow = (id, user) => {
  return axios({
    url: apiUrl + '/gardens/' + id,
    method: 'GET'
    // Add an authorization header
  })
}
export const createdGardenIndex = () => {
  return axios({
    url: apiUrl + '/gardens/',
    method: 'GET'
  })
}
export const gardenUpdate = (id, user) => {
  return axios({
    url: apiUrl + '/gardens/' + id,
    method: 'PATCH',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}
