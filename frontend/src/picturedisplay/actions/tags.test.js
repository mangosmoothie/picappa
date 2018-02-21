import configureMockStore from 'redux-mock-store'
import { applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import moxios from 'moxios'
import { INITIAL_STATE } from '../reducers/tags'
import * as cut from './tags'
import * as mocks from '../mocks/tags'
import { watchRequestTags } from '../sagas/tags'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore(compose(applyMiddleware(sagaMiddleware)))

describe('async actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('request tags', () => {

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
    store.dispatch(cut.requestTags())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('request tags - empty', () => {

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
    return store.dispatch(cut.requestTags()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})
