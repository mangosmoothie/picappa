import * as cut from './pictures'
import * as mocks from '../mocks/pictures'

it('get pics', () => {
  const pics = cut.getPictures({pictures: mocks.picsAddedState})

  expect(Object.keys(pics).length).toEqual(3)
  expect(pics[1].id).toEqual(1)
  expect(pics[2].id).toEqual(2)
  expect(pics[3].id).toEqual(3)
})
