import pictures, { INITIAL_STATE } from '../reducers/pictures'
import { addPic } from '../actions/pictures'

export const newPicJson = {id: 1, tags: []}
export const newPicJson2 = {id: 2, tags: [1, 2]}
export const newPicJson3 = {id: 3, tags: [1]}

export const picAddedState = pictures(INITIAL_STATE, addPic(newPicJson))
const picAddedState2 = pictures(picAddedState, addPic(newPicJson2))
export const picsAddedState = pictures(picAddedState2, addPic(newPicJson3))

export const painted =
  {id: 1, tags: [5],
   name: 'Painted Building',
   description: 'Cool paint job in Rome',
   media_type_cd: 100,
   status_cd: 100,
   thumb_url: '/picappa/demo/thumbs/1.jpeg',
   url: '/picappa/demo/1.jpg'}

export const pyramid =
  {id: 3, tags: [3, 6],
   name: 'Pyramid',
   description: 'Pyramid in Rome',
   media_type_cd: 100,
   status_cd: 100,
   thumb_url: '/picappa/demo/thumbs/3.jpeg',
   url: '/picappa/demo/3.jpg'}

export const square =
  {id: 5, tags: [4, 6],
   name: 'Square',
   description: 'Plaza in Rome',
   media_type_cd: 100,
   status_cd: 100,
   thumb_url: '/picappa/demo/thumbs/5.jpeg',
   url: '/picappa/demo/5.jpg'}

export const church =
  {id: 7, tags: [4],
   name: "St. John's Cathedral",
   description: 'First church in Rome',
   media_type_cd: 100,
   status_cd: 100,
   thumb_url: '/picappa/demo/thumbs/7.jpeg',
   url: '/picappa/demo/7.jpg'}

export const hole =
  {id: 9, tags: [3],
   name: 'Pantheon',
   description: 'Ancient Roman temple (in Rome)',
   media_type_cd: 100,
   status_cd: 100,
   thumb_url: '/picappa/demo/thumbs/9.jpeg',
   url: '/picappa/demo/9.jpg'}
