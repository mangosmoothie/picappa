import { Map, List } from 'immutable'
import {
  ADD_PIC,
  UPDATE_STARTAT,
  UPDATE_LIMIT
} from '../actions/pictures'

export const INITIAL_STATE = Map()

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case ADD_PIC:
    return state.set(action.pic.id, Map({...action.pic}))
  default:
    return state
  }
}

export const INITIAL_STATE_STARTAT = 0
export const INITIAL_STATE_LIMIT = 25

export function startAt(state = 0, action){
  switch (action.type) {
  case UPDATE_STARTAT:
    return action.startAt
  default:
    return state
  }
}

export function limit(state = 25, action){
  switch (action.type) {
  case UPDATE_LIMIT:
    return action.limit
  default:
    return state
  }
}
