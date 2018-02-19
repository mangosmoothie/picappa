import * as cut from './mediaitems'
import { stateWithSelections } from '../mocks/mediaitems'

it('get media types', () => {
  const types = cut.getMediaTypes(stateWithSelections)
  expect(Object.keys(types).length).toEqual(2)
})

it('get media statuses', () => {
  const statuses = cut.getMediaStatuses(stateWithSelections)
  expect(Object.keys(statuses).length).toEqual(2)
})
