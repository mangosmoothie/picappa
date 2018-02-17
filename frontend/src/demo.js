import moxios from 'moxios'
import * as tagMocks from './picturedisplay/mocks/tags'
import * as picMocks from './picturedisplay/mocks/pictures'
import * as miMocks from './picturedisplay/mocks/mediaitems'

export default () => {
  moxios.install()

  moxios.stubRequest('/api/all-tags', {
    status: 200,
    response: {
      'tags': [
        tagMocks.ancient,
        tagMocks.ren,
        tagMocks.modern,
        tagMocks.newTag
      ]
    }
  })

  moxios.stubRequest(/\/api\/pictures/, {
    status: 200,
    response: {
      'pictures': [
        picMocks.painted,
        picMocks.pyramid,
        picMocks.square,
        picMocks.church,
        picMocks.hole
      ]
    }
  })

  moxios.stubRequest('/api/mediaitem-selections', {
    status: 200,
    response: {
      'statuses': [miMocks.newStatusOption1, miMocks.newStatusOption2],
      'media_types': [miMocks.newTypeOption1, miMocks.newTypeOption2]
    }
  })
}
