export const TOGGLE_TAG = 'TOGGLE_TAG'

export function toggleTagField(tagId, field){
  return {
    type: TOGGLE_TAG,
    id: tagId,
    field: field
  }
}

export const ADD_TAG = 'ADD_TAG'

export function addTag(tag){
  return { type: ADD_TAG, tag: tag }
}
