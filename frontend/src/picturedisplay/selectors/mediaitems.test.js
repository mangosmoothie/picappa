import { Map } from 'immutable'
import * as cut from './mediaitems'
import { stateWithSelections } from '../mocks/mediaitems'

it('get media types', () => {
  const types = cut.getMediaTypes(stateWithSelections)
  expect(types.size).toEqual(2)
})

it('get media statuses', () => {
  const statuses = cut.getMediaStatuses(stateWithSelections)
  expect(statuses.size).toEqual(2)
})
