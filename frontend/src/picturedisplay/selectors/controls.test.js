import { stateWithDefaults } from '../mocks/controls'
import * as cut from './controls'

it('get show search modal', () => {
  const s = cut.getShowMediaSearchPanel(stateWithDefaults)
  expect(s).toEqual(false)
})

it('get media viewer dialog url', () => {
  const s = cut.getMediaViewerDialogUrl(stateWithDefaults)
  expect(s).toEqual(false)
})

it('get media editor dialog item', () => {
  const s = cut.getMediaEditorDialogItem(stateWithDefaults)
  expect(s).toEqual(false)
})
