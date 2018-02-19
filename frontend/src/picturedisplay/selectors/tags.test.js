import * as cut from './tags'
import { stateWithTags } from '../mocks/tags'

it('get tags', () => {
  const tags = cut.getTags(stateWithTags)
  expect(Object.keys(tags).length).toEqual(2)
})

it('get filtered tags', () => {
  const getFilteredTags = cut.makeGetFilteredTags()
  const tags = getFilteredTags(stateWithTags, {predicate: x => !x.selected})
  expect(Object.keys(tags).length).toEqual(1)

  const otherTags = getFilteredTags(stateWithTags, {predicate: x => x.selected})
  expect(Object.keys(otherTags).length).toEqual(1)
})

