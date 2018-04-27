import configureMockStore from 'redux-mock-store'
import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import moxios from 'moxios'
import { INITIAL_STATE } from '../reducers/mediaitems'
import * as cut from './mediaitems'
import * as mocks from '../mocks/mediaitems'
import { default as sagas } from '../sagas/mediaitems'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

function* watchRequestSelections() {
  yield sagas[0];
}

describe('async actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetch media selections', (done) => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          'statuses': [mocks.newStatusOption1, mocks.newStatusOption2],
          'media_types': [mocks.newTypeOption1, mocks.newTypeOption2]
        }
      })
    })

    const expectedActions = [
      { type: cut.REQUEST_MEDIA_SELECTIONS },
      { type: cut.ADD_MEDIA_STATUS_OPTION, data: mocks.newStatusOption1 },
      { type: cut.ADD_MEDIA_STATUS_OPTION, data: mocks.newStatusOption2 },
      { type: cut.ADD_MEDIA_TYPE_OPTION, data: mocks.newTypeOption1},
      { type: cut.ADD_MEDIA_TYPE_OPTION, data: mocks.newTypeOption2}
    ]
    const store = mockStore({mediaitems: INITIAL_STATE})
    sagaMiddleware.run(watchRequestSelections)

    expect.assertions(1)
    store.subscribe(() => {
      const actions = store.getActions()
      if (actions.length >= expectedActions.length){
        expect(actions).toEqual(expectedActions)
        done()
      }
    })
    store.dispatch(cut.requestMediaSelections())
  })

  it('fetch selections - empty', (done) => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          'media_types': [],
          'statuses': []
        }
      })
    })

    const expectedActions = [
      { type: cut.REQUEST_MEDIA_SELECTIONS }
    ]
    const store = mockStore({mediaitems: INITIAL_STATE})
    sagaMiddleware.run(watchRequestSelections)

    expect.assertions(1)
    store.subscribe(() => {
      const actions = store.getActions()
      if (actions.length >= expectedActions.length){
        expect(actions).toEqual(expectedActions)
        done()
      }
    })
    store.dispatch(cut.requestMediaSelections())
  })

})
