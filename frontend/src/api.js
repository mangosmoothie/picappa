import axios from 'axios'

export function getTags(){
  return axios.get('/api/all-tags')
    .then( ({data}) => data['tags'],
           (err) => {throw err})
}
