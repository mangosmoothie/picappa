import * as cut from './pictures'
import * as mocks from '../mocks/pictures'

it('get pics', () => {
  const pics = cut.getPictures({pictures: mocks.picsAddedState})

  expect(pics.size).toEqual(3)
  expect(pics.get(1).get('id')).toEqual(1)
  expect(pics.get(2).get('id')).toEqual(2)
  expect(pics.get(3).get('id')).toEqual(3)
})
