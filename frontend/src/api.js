import axios from 'axios'

export function getTags(){
  return axios.get('/api/all-tags')
    .then( ({data}) => data['tags'],
           (err) => {throw err})
}

export function getMediaSelections(){
  return axios.get('/api/mediaitem-selections')
    .then( ({data}) => data,
           (err) => {throw err})
}

export function getPics(startAt = 0, limit = 25, tags = null){
  const params = '?startAt=' + startAt + '&perPage=' + limit
  const tagsFilt = tags ? '&tags=' + tags.join(',') : ''
  return axios.get('/api/pictures' + params + tagsFilt)
    .then( ({ data }) => data['pictures'],
           (err) => {throw err})
}
