import React from 'react'

const Picture = ( {url} ) => {
  return (
    <a href="#" >
      <img src={url} className="img-fluid" />
    </a>
  )
}

export default ( {pictures} ) => {
  return (
      <div className="d-flex flex-wrap justify-content-center">
        {pictures.map( (p) => {
           return (
             <div className="d-inline-flex pic-in-display">
               <Picture key={p.get('id')} url={p.get('thumb_url')} />
             </div>
           )
        })}
      </div>
  )
}
