import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { INITIAL_STATE } from '../reducers/mediaitems'
import * as cut from './mediaitems'
import * as mocks from '../mocks/mediaitems'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetch media selections', () => {

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

    expect.assertions(1)
    return store.dispatch(cut.fetchMediaSelections()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('fetch selections - empty', () => {

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

    expect.assertions(1)
    return store.dispatch(cut.fetchMediaSelections()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})
