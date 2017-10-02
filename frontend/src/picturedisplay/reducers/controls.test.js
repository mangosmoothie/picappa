import { Map } from 'immutable'
import controls, * as cut from './controls'
import {
  toggleShowSearchModal
} from '../actions/controls'

it('initial state', () => {
  const showSearchModal = cut.INITIAL_STATE.get('show-search-modal')
  expect(showSearchModal).toEqual(false)
})

it('toggle show search modal', () => {
  const initialState = Map({ 'show-search-modal': false})
  const testStateTrue = controls(initialState, toggleShowSearchModal())
  const testStateFalse = controls(testStateTrue, toggleShowSearchModal())

  expect(testStateTrue.get('show-search-modal')).toEqual(true)
  expect(testStateFalse.get('show-search-modal')).toEqual(false)
})
