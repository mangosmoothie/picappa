import { Map } from 'immutable'
import * as cut from './tags'
import { stateWithTags } from '../mocks/tags'

it('get tags', () => {
  const tags = cut.getTags(stateWithTags)
  expect(tags.size).toEqual(2)
})

it('get filtered tags', () => {
  const getFilteredTags = cut.makeGetFilteredTags()
  const tags = getFilteredTags(stateWithTags, {predicate: x => !x.get('selected')})
  expect(tags.size).toEqual(1)

  const otherTags = getFilteredTags(stateWithTags, {predicate: x => x.get('selected')})
  expect(otherTags.size).toEqual(1)
})

