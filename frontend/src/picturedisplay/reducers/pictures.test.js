import { Map, List } from 'immutable'
import * as cut from '../reducers/pictures'
import {
  addPic,
  updateStartAt,
  updateLimit
} from '../actions/pictures'
import {
  newPicJson,
  picAddedState,
  picsAddedState
} from '../mocks/pictures'

it('initial state', () => {
  expect(cut.INITIAL_STATE).toEqual(Map())
  expect(cut.INITIAL_STATE_STARTAT).toBeGreaterThanOrEqual(0)
  expect(cut.INITIAL_STATE_LIMIT).toBeGreaterThan(0)
})

it('add pic', () => {
  expect(picAddedState.size).toEqual(1)
  expect(picsAddedState.first().get('id')).toEqual(newPicJson.id)

  expect(picsAddedState.size).toEqual(3)
})

it('update startAt', () => {
  const val = 100
  const newState = cut.startAt(cut.INITIAL_STATE_STARTAT, updateStartAt(val))
  expect(newState).toEqual(val)
})

it('update limit', () => {
  const val = 100
  const newState = cut.limit(cut.INITIAL_STATE_LIMIT, updateLimit(val))
  expect(newState).toEqual(val)
})
