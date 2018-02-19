import mediaitems, { INITIAL_STATE } from './mediaitems'
import {
  addMediaTypeOption,
  addMediaStatusOption
} from '../actions/mediaitems'
import {
  newTypeOption1,
  newTypeOption2,
  newStatusOption1,
  newStatusOption2
} from '../mocks/mediaitems'

it('initial state', () => expect(INITIAL_STATE).toEqual({
  mediaTypes: {},
  mediaStatuses: {}
}))

it('no action', () => expect(mediaitems(INITIAL_STATE, {type: null}))
   .toEqual(INITIAL_STATE))

it('add type option action', () => {
  const newState = mediaitems(INITIAL_STATE, addMediaTypeOption(newTypeOption1))
  expect(Object.keys(newState.mediaTypes).length).toEqual(1)
  expect(newState.mediaTypes[newTypeOption1.media_type_cd].mediaTypeCd)
    .toEqual(newTypeOption1.media_type_cd)

  const newState2 = mediaitems(newState, addMediaTypeOption(newTypeOption2))
  expect(Object.keys(newState2.mediaTypes).length).toEqual(2)
  expect(newState2.mediaTypes[newTypeOption2.media_type_cd].mediaTypeCd)
    .toEqual(newTypeOption2.media_type_cd)
})

it('add status option action', () => {
  const newState = mediaitems(INITIAL_STATE, addMediaStatusOption(newStatusOption1))
  expect(Object.keys(newState.mediaStatuses).length).toEqual(1)
  expect(newState.mediaStatuses[newStatusOption1.status_cd].statusCd)
    .toEqual(newStatusOption1.status_cd)

  const newState2 = mediaitems(newState, addMediaStatusOption(newStatusOption2))
  expect(Object.keys(newState2.mediaStatuses).length).toEqual(2)
  expect(newState2.mediaStatuses[newStatusOption2.status_cd].statusCd)
    .toEqual(newStatusOption2.status_cd)
})

it('add dupe type option action', () => {
  const newState = mediaitems(INITIAL_STATE, addMediaTypeOption(newTypeOption1))
  expect(Object.keys(newState.mediaTypes).length).toEqual(1)
  const newState2 = mediaitems(INITIAL_STATE, addMediaTypeOption(newTypeOption1))
  expect(Object.keys(newState2.mediaTypes).length).toEqual(1)
})

it('add dupe status option', () => {
  const newState = mediaitems(INITIAL_STATE, addMediaStatusOption(newStatusOption1))
  expect(Object.keys(newState.mediaStatuses).length).toEqual(1)
  const newState2 = mediaitems(INITIAL_STATE, addMediaStatusOption(newStatusOption1))
  expect(Object.keys(newState2.mediaStatuses).length).toEqual(1)
})
