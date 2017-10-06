import React from 'react'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  container: {
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 0,
    marginTop: 1,
    width: '32%',
    minWidth: 150
  },
  pic: {
    width: '100%'
  }
}

const Picture = ( {url} ) => {
  return (
    <a href="#" >
      <img src={url} style={styles.pic} />
    </a>
  )
}

export default ( {pictures} ) => {
  return (
      <div style={styles.root}>
        {pictures.map( (p) => {
           return (
             <div style={styles.container}>
               <Picture key={p.get('id')} url={p.get('thumb_url')} />
             </div>
           )
        })}
      </div>
  )
}
