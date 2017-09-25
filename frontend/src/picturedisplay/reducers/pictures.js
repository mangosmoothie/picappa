import { Map, List } from 'immutable'
import {
  ADD_PIC
} from '../actions/pictures'

const defaultState = Map({startAt: 0, limit: 50, pictures: List()})

export default function(state = defaultState, action){
  switch (action.type) {
  case ADD_PIC:
    console.log('add pic', action.pic)
    return state.update('pictures', x => x.push(Map({...action.pic})))
  default:
    return state
  }
}
