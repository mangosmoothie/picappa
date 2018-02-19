import {
  ADD_MEDIA_STATUS_OPTION,
  ADD_MEDIA_TYPE_OPTION
} from '../actions/mediaitems'

export const INITIAL_STATE = {
  mediaTypes: {},
  mediaStatuses: {}
}

function mediaStatusReducer(state, action){
  switch (action.type){
  case ADD_MEDIA_STATUS_OPTION:
    let statusCd = action.data.status_cd
    return {...state, [statusCd]: {...action.data, statusCd: statusCd}}
  default:
    return state
  }
}

function mediaTypeReducer(state, action){
  switch (action.type) {
  case ADD_MEDIA_TYPE_OPTION:
    let typeCd = action.data.media_type_cd
    return {...state, [typeCd]: {...action.data, mediaTypeCd: typeCd}}
  default:
    return state
  }
}

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case ADD_MEDIA_STATUS_OPTION:
    action.data.statusCd = action.data.status_cd.toString()
    return {...state, mediaStatuses: mediaStatusReducer(state.mediaStatuses, action)}
  case ADD_MEDIA_TYPE_OPTION:
    return {...state, mediaTypes: mediaTypeReducer(state.mediaTypes, action)}
  default:
    return state
  }
}
