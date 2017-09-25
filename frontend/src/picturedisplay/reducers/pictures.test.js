import { Map, List } from 'immutable'
import pictures, { INITIAL_STATE } from '../reducers/pictures'
import { addPic } from '../actions/pictures'
import {
  newPicJson,
  picAddedState,
  picsAddedState
} from '../mocks/pictures'

it('initial state', () => {
  expect(INITIAL_STATE.has('pictures')).toBeTruthy()
  expect(INITIAL_STATE.get('pictures')).toEqual(List())
  expect(INITIAL_STATE.has('startAt')).toBeTruthy()
  expect(INITIAL_STATE.has('limit')).toBeTruthy()
})

it('add pic', () => {
  expect(picAddedState.get('pictures').size).toEqual(1)
  expect(picsAddedState.get('pictures').first().get('id')).toEqual(newPicJson.id)

  expect(picsAddedState.get('pictures').size).toEqual(3)

  expect(picAddedState.get('startAt')).toEqual(INITIAL_STATE.get('startAt'))
  expect(picAddedState.get('limit')).toEqual(INITIAL_STATE.get('limit'))
})
