import React from 'react'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  container: {
    margin: 4,
    width: '20vw',
    height: '20vw',
    minWidth: 180,
    minHeight: 180,
    maxWidth: 225,
    maxHeight: 225
  }
}

const Picture = ( {url} ) => {
  const style = {
    width: 'auto',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: "url('" + url + "')"
  }

  return (
    <a href="#" >
      <div style={style} />
    </a>
  )
}

export default ( {pictures} ) => {
  return (
      <div style={styles.root}>
        {pictures.map( (p) => {
           return (
             <div key={p.get('id')}  style={styles.container}>
               <Picture url={p.get('thumb_url')} />
             </div>
           )
        })}
      </div>
  )
}
