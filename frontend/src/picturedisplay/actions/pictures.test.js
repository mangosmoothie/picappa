import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { INITIAL_STATE } from '../reducers/pictures'
import * as cut from './pictures'
import * as mocks from '../mocks/pictures'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetch pics', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          'pictures': [
            mocks.newPicJson,
            mocks.newPicJson2,
            mocks.newPicJson3
          ]
        }
      })
    })

    const expectedActions = [
      { type: cut.REQUEST_PICS },
      { type: cut.ADD_PIC, pic: mocks.newPicJson },
      { type: cut.ADD_PIC, pic: mocks.newPicJson2 },
      { type: cut.ADD_PIC, pic: mocks.newPicJson3 }
    ]
    const store = mockStore({tags: [], pictures: INITIAL_STATE})

    expect.assertions(1)
    return store.dispatch(cut.fetchPics()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('fetch pics - empty', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          'pictures': []
        }
      })
    })

    const expectedActions = [
      { type: cut.REQUEST_PICS }
    ]
    const store = mockStore({tags: [], pictures: INITIAL_STATE})

    expect.assertions(1)
    return store.dispatch(cut.fetchPics()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})
