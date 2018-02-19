import controls, * as cut from './controls'
import {
  toggleShowMediaSearchPanel,
  setMediaViewerDialogUrl,
  closeMediaViewerDialog,
  setMediaEditorDialogItem,
  closeMediaEditorDialog,
  updateStartAt,
  updateLimit
} from '../actions/controls'

it('initial state', () => {
  const showSearchPanel = cut.INITIAL_STATE.showMediaSearchPanel
  expect(showSearchPanel).toEqual(false)

  const mediaViewerDialogUrl = cut.INITIAL_STATE.mediaViewerDialogUrl
  expect(mediaViewerDialogUrl).toEqual(false)

  expect(cut.INITIAL_STATE_STARTAT).toBeGreaterThanOrEqual(0)
  expect(cut.INITIAL_STATE_LIMIT).toBeGreaterThan(0)
})

it('toggle show search modal', () => {
  const initialState = {'showMediaSearchPanel': false}
  const testStateTrue = controls(initialState, toggleShowMediaSearchPanel())
  const testStateFalse = controls(testStateTrue, toggleShowMediaSearchPanel())

  expect(testStateTrue.showMediaSearchPanel).toEqual(true)
  expect(testStateFalse.showMediaSearchPanel).toEqual(false)
})

it('toggle media viewer dialog', () => {
  const initialState = {'mediaViewerDialogUrl': false}
  const testStateSome = controls(initialState, setMediaViewerDialogUrl('Some'))
  const testStateFalse = controls(testStateSome, setMediaViewerDialogUrl(false))
  const testStateClose = controls(testStateSome, closeMediaViewerDialog())

  expect(testStateSome.mediaViewerDialogUrl).toEqual('Some')
  expect(testStateFalse.mediaViewerDialogUrl).toEqual(false)
  expect(testStateClose.mediaViewerDialogUrl).toEqual(false)
})

it('toggle media editor dialog', () => {
  const initialState = {'mediaEditorDialogItem': false}
  const anItem = {name: 'aname'}
  const testStateSome = controls(initialState, setMediaEditorDialogItem(anItem))
  const testStateFalse = controls(testStateSome, setMediaEditorDialogItem(false))
  const testStateClose = controls(testStateSome, closeMediaEditorDialog())

  expect(testStateSome.mediaEditorDialogItem).toEqual(anItem)
  expect(testStateFalse.mediaEditorDialogItem).toEqual(false)
  expect(testStateClose.mediaEditorDialogItem).toEqual(false)
})

it('update startAt', () => {
  const val = 100
  const newState = controls(cut.INITIAL_STATE_STARTAT, updateStartAt(val))
  expect(newState.startAt).toEqual(val)
})

it('update limit', () => {
  const val = 100
  const newState = controls(cut.INITIAL_STATE_LIMIT, updateLimit(val))
  expect(newState.limit).toEqual(val)
})
