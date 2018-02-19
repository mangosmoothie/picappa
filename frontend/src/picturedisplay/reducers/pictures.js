import {
  ADD_PIC
} from '../actions/pictures'

export const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case ADD_PIC:
    return {...state, [action.pic.id]: {...action.pic}}
  default:
    return state
  }
}
