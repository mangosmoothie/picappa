import { stateWithDefaults } from '../mocks/controls'
import * as cut from './controls'

it('get show search modal', () => {
  const s = cut.getShowSearchModal(stateWithDefaults)
  expect(s).toEqual(false)
})
