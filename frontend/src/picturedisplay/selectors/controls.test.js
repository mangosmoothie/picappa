import { stateWithDefaults } from '../mocks/controls'
import * as cut from './controls'

it('get show search modal', () => {
  const s = cut.getShowMediaSearchPanel(stateWithDefaults)
  expect(s).toEqual(false)
})

it('get show media viewer dialog', () => {
  const s = cut.getMediaViewerDialogUrl(stateWithDefaults)
  expect(s).toEqual(false)
})
