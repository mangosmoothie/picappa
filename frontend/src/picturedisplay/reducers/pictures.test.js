import * as cut from './pictures'
import {
  addPic
} from '../actions/pictures'
import {
  newPicJson,
  picAddedState,
  picsAddedState
} from '../mocks/pictures'

it('initial state', () => {
  expect(cut.INITIAL_STATE).toEqual({})
})

it('add pic', () => {
  expect(Object.keys(picAddedState).length).toEqual(1)
  expect(picsAddedState[newPicJson.id].id).toEqual(newPicJson.id)

  expect(Object.keys(picsAddedState).length).toEqual(3)
})
