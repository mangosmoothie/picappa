import axios from 'axios'

export const REQUEST_PICS = 'REQUEST_PICS'

function requestPics(){
  return {
    type: REQUEST_PICS
  }
}

export const ADD_PIC = 'ADD_PIC'

export function addPic(pic){
  return {
    type: ADD_PIC,
    pic: pic
  }
}

function getSelectedTags(state){
  return state.get('tags')
    .filter( t => t.get('selected') )
    .map( t => t.get('id') )
}

function getLimit(state){
  return state.get('limit')
}

function getStartAt(state){
  return state.get('startAt')
}

export function fetchPics(){
  return (dispatch, getState) => {
    dispatch(requestPics())
    const startAt = getStartAt(getState())
    const limit = getLimit(getState())
    const params = '?startAt=' + startAt + '&perPage=' + limit
    const tags = getSelectedTags(getState())
    const tagsFilt = tags ? '&tags=' + tags.join(',') : ''
    return axios.get('/api/pictures' + params + tagsFilt)
      .then( ({ data }) => data['pictures']
             .map( p => dispatch(addPic(p)) ),
             (err) => console.error(err) )
  }
}

export const UPDATE_STARTAT = 'UPDATE_STARTAT'

export function updateStartAt(startAt){
  return {
    type: UPDATE_STARTAT,
    startAt: startAt
  }
}

export const UPDATE_LIMIT = 'UPDATE_LIMIT'

export function updateLimit(limit){
  return {
    type: UPDATE_LIMIT,
    limit: limit
  }
}
