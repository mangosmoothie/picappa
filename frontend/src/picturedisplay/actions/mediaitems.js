import axios from 'axios'

export const REQUEST_MEDIA_SELECTIONS = 'REQUEST_MEDIA_SELECTIONS'

function requestMediaSelections(){
  return {
    type: REQUEST_MEDIA_SELECTIONS
  }
}

export const ADD_MEDIA_STATUS_OPTION = 'ADD_MEDIA_STATUS_OPTION'

export function addMediaStatusOption(status){
  return { type: ADD_MEDIA_STATUS_OPTION, data: status}
}

export const ADD_MEDIA_TYPE_OPTION = 'ADD_MEDIA_TYPE_OPTION'

export function addMediaTypeOption(type){
  return { type: ADD_MEDIA_TYPE_OPTION, data: type}
}

export function fetchMediaSelections(){
  return dispatch => {
    dispatch(requestMediaSelections())
    return axios.get('/api/mediaitem-selections')
      .then( ({data}) => {
        data['statuses'].map(s => dispatch(addMediaStatusOption(s)))

        data['media_types'].map(m => dispatch(addMediaTypeOption(m)))
      }, (err) => console.error(err))
  }
}
