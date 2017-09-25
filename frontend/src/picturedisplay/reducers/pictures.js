import { Map, List } from 'immutable'
import {
  ADD_PIC
} from '../actions/pictures'

export const INITIAL_STATE = Map({startAt: 0, limit: 50, pictures: List()})

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case ADD_PIC:
    return state.update('pictures', x => x.push(Map({...action.pic})))
  default:
    return state
  }
}
