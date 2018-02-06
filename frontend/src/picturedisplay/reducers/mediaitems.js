import { Map } from 'immutable'
import {
  ADD_MEDIA_STATUS_OPTION,
  ADD_MEDIA_TYPE_OPTION
} from '../actions/mediaitems'

export const INITIAL_STATE = Map({
  'media-types': Map(),
  'media-statuses': Map()
})

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case ADD_MEDIA_STATUS_OPTION:
    action.data.status_cd = action.data.status_cd.toString()
    return state.setIn( ['media-statuses', action.data.status_cd],
      Map({...action.data})
    )
  case ADD_MEDIA_TYPE_OPTION:
    return state.setIn( ['media-types', action.data.media_type_cd],
      Map({...action.data})
    )
  default:
    return state
  }
}
