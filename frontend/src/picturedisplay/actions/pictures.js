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
  return state.tags
    .filter( t => t.get('selected') )
    .map( t => t.get('id') )
}

function getLimit(state){
  return state.pictures.get('limit')
}

function getStartAt(state){
  return state.pictures.get('startAt')
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
