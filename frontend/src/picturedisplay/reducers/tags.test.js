import tags, { INITIAL_STATE } from './tags'
import {
  addTag,
  toggleTagField
} from '../actions/tags'
import {
  newTagJson,
  newTagJson2,
  tagAddedState
} from '../mocks/tags'

it('initial state', () => expect(INITIAL_STATE).toEqual({}))

it('no action', () => expect(tags(INITIAL_STATE, {type: null})).toEqual(INITIAL_STATE))

it('add tag action', () => {
  expect(Object.keys(tagAddedState).length).toEqual(1)
  expect(tagAddedState[newTagJson.id].id).toEqual(newTagJson.id)
  expect(tagAddedState[newTagJson.id].name).toEqual(newTagJson.name)

  const newState = tags(tagAddedState, addTag(newTagJson2))
  expect(Object.keys(newState).length).toEqual(2)
  expect(newState[newTagJson.id].id).toEqual(newTagJson.id)
  expect(newState[newTagJson.id].name).toEqual(newTagJson.name)

  expect(newState[newTagJson2.id].id).toEqual(newTagJson2.id)
  expect(newState[newTagJson2.id].name).toEqual(newTagJson2.name)
  expect(newState[newTagJson2.id].selected).toEqual(newTagJson2.selected)
})

it('add dupe tag action', () => {
  expect(Object.keys(tagAddedState).length).toEqual(1)

  const newState = tags(tagAddedState, addTag(newTagJson))
  expect(Object.keys(newState).length).toEqual(1)
})

it('toggle tag action', () => {
  expect(tagAddedState[1].selected).toEqual(false)
  expect(tagAddedState[1].id).toEqual(1)

  const newState = tags(tagAddedState, toggleTagField(1, 'selected'))
  expect(newState[1].selected).toEqual(true)
  expect(newState[1].id).toEqual(1)

  const newState2 = tags(newState, toggleTagField(1, 'selected'))
  expect(newState2[1].selected).toEqual(false)
  expect(newState2[1].id).toEqual(1)
})
