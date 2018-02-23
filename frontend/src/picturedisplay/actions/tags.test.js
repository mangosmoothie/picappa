import configureMockStore from 'redux-mock-store'
import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import moxios from 'moxios'
import { INITIAL_STATE } from '../reducers/tags'
import * as cut from './tags'
import * as mocks from '../mocks/tags'
import { watchRequestTags } from '../sagas/tags'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

describe('async actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('request tags', (done) => {

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
    sagaMiddleware.run(watchRequestTags)

    expect.assertions(1)
    store.subscribe(() => {
      const actions = store.getActions()
      if (actions.length >= expectedActions.length){
        expect(actions).toEqual(expectedActions)
        done()
      }
    })
    store.dispatch(cut.requestTags())
  })

  it('request tags - empty', (done) => {

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
    sagaMiddleware.run(watchRequestTags)

    expect.assertions(1)
    store.subscribe(() => {
      const actions = store.getActions();
      if (actions.length >= expectedActions.length){
        expect(actions).toEqual(expectedActions);
        done();
      }
    });
    store.dispatch(cut.requestTags())
  })

})
