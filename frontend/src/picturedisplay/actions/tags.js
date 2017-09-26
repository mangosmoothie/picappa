import axios from 'axios'

export const TOGGLE_TAG = 'TOGGLE_TAG'

export function toggleTagField(tagId, field){
  return {
    type: TOGGLE_TAG,
    id: tagId,
    field: field
  }
}

export const ADD_TAG = 'ADD_TAG'

export function addTag(tag){
  return { type: ADD_TAG, tag: tag }
}

export const REQUEST_TAGS = 'REQUEST_TAGS'

function requestTags(){
  return {
    type: REQUEST_TAGS
  }
}

export function fetchTags(){
  return dispatch => {
    dispatch(requestTags())
    return axios.get('/api/all-tags')
      .then( ({data}) => data['tags'].map(t => dispatch(addTag(t))),
             (err) => console.error(err) )
  }
}
