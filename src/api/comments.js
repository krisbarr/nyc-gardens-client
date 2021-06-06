import apiUrl from '../apiConfig'

import axios from 'axios'

export const commentCreate = (comment, user) => {
  return axios({
    url: apiUrl + '/comments',
    method: 'POST',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    },
    // send the comment object as our data for creating a movie
    data: { comment }
  })
}

export const commentShow = (commentId, gardenId, user) => {
  return axios({
    url: apiUrl + '/comments/' + commentId + '/' + gardenId,
    method: 'GET',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const commentDelete = (commentId, gardenId, user) => {
  return axios({
    url: apiUrl + '/comments/' + commentId + '/' + gardenId,
    method: 'DELETE',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}
