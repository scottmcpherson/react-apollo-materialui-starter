const HOST_NAME = window.location.host

export const request = (verb, endPoint, data) => {
  const token = localStorage.getItem('token')
  const headers = {
    Authorization: 'JWT ' + token,
    'Content-Type': 'application/json'
  }

  if (data !== null && data !== undefined) data.origin = HOST_NAME
  return fetch(endPoint, {
    headers: headers,
    method: verb,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    body: JSON.stringify(data)
  }).then(getJSON)
}

export const getRequest = (endPoint, data) => {
  if (data === undefined || data === null) {
    data = {}
  }

  return request('GET', endPoint)
}

export const postRequest = (endPoint, data) => {
  if (data === undefined || data === null) {
    data = {}
  }
  return request('POST', endPoint, data)
}

export const putRequest = (endPoint, data) => {
  return request('PUT', endPoint, data)
}

export const deleteRequest = (endPoint, data) => {
  return request('DELETE', endPoint, data)
}

function getJSON(response) {
  return response.json().then(function(json) {
    if (
      response.status === 401 &&
      !window.location.pathname.includes('login')
    ) {
      window.location.href = '/login'
    }

    if (response.status === 422 || !response.ok) {
      if (json.message) {
        throw Error(json.message)
      } else {
        throw Error(response.statusText)
      }
    }

    return json
  })
}
