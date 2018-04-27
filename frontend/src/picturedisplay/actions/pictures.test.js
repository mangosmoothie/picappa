import configureMockStore from 'redux-mock-store'
import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import moxios from 'moxios'
import { INITIAL_STATE } from '../reducers/pictures'
import { INITIAL_STATE as CONTROLS_INITIAL_STATE } from '../reducers/controls'
import * as cut from './pictures'
import * as mocks from '../mocks/pictures'
import { default as sagas } from '../sagas/pictures'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

function* watchRequestPics() {
  yield sagas[0]
}

describe('async actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetch pics', (done) => {

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
    const store = mockStore({tags: [], pictures: INITIAL_STATE,
                             controls: CONTROLS_INITIAL_STATE})
    sagaMiddleware.run(watchRequestPics)

    expect.assertions(1)
    store.subscribe(() => {
      const actions = store.getActions()
      if (actions.length >= expectedActions.length){
        expect(actions).toEqual(expectedActions)
        done()
      }
    })
    store.dispatch(cut.requestPics())
  })

  it('fetch pics - empty', (done) => {

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
    const store = mockStore({tags: [], pictures: INITIAL_STATE,
                             controls: CONTROLS_INITIAL_STATE})
    sagaMiddleware.run(watchRequestPics)

    expect.assertions(1)
    store.subscribe(() => {
      const actions = store.getActions()
      if (actions.length >= expectedActions.length){
        expect(actions).toEqual(expectedActions)
        done()
      }
    })
    store.dispatch(cut.requestPics())
  })

})
