import axios from 'axios'

export const REQUEST_PICS = 'REQUEST_PICS'

export function requestPics(){
  return {
    type: REQUEST_PICS
  }
}

export const ADD_PIC = 'ADD_PIC'

export function addPic(pic){
  return {
    type: ADD_PIC,
    pic: pic
  }
}
