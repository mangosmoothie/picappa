import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { INITIAL_STATE } from '../reducers/tags'
import * as cut from './tags'
import * as mocks from '../mocks/tags'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetch tags', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          'tags': [
            mocks.newTagJson,
            mocks.newTagJson2
          ]
        }
      })
    })

    const expectedActions = [
      { type: cut.REQUEST_TAGS },
      { type: cut.ADD_TAG, tag: mocks.newTagJson },
      { type: cut.ADD_TAG, tag: mocks.newTagJson2 }
    ]
    const store = mockStore({tags: INITIAL_STATE})

    expect.assertions(1)
    return store.dispatch(cut.fetchTags()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('fetch tags - empty', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          'tags': []
        }
      })
    })

    const expectedActions = [
      { type: cut.REQUEST_TAGS }
    ]
    const store = mockStore({tags: INITIAL_STATE})

    expect.assertions(1)
    return store.dispatch(cut.fetchTags()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})
