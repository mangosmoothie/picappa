import React from 'react'

const Picture = ( {url} ) => {
  const style = {
    height: 'auto',
    width: '100%',
    align: 'center',
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundImage: `url(${url})`
  }
  return (
    <div className="img-responsive" style={style} />
  )
}

export default ( {pictures} ) => {
  const style = {
    display: 'inline-block',
    width: '25%',
    paddingLeft: '5px',
    paddingRight: '5px',
    paddingTop: '2.5px',
    paddingBottom: '2.5px'
  }
  return (
    <div className="container">
      {pictures.map( (p) => {
         return (
           <div style={style}>
             <Picture key={p.get('id')} url={p.get('url')} />
           </div>
         )
      })}
    </div>
  )
}
