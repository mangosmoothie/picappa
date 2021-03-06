import React from 'react'
import Dialog from 'material-ui/Dialog'

const styles = {
  container: {
    display: 'flex',
    displayDirection: 'column'
  },
  img: {
    visibility: 'hidden',
    width: '100%'
  },
  dialog: {
    width: '100%'
  }
}

const Picture = ( { url, onClick } ) => {
  const style = {
    backgroundImage: "url('" + url + "')"
  }

  return (
    <a href="#" onClick={onClick} >
      <div className="picture" style={style} >
        <img src={url} style={styles.img} />
      </div>
    </a>
  )
}

export default ({ closeDialog, url }) => {

  return (
    <div>
      <Dialog
        modal={false}
        open={url ? true : false}
        repositionOnUpdate={false}
        autoDetectWindowHeight={false}
        bodyStyle={{padding: 10}}
        style={{paddingTop: 10, height: '100vh'}}
        contentStyle={styles.dialog}
        onRequestClose={closeDialog} >

        <div style={styles.container}>
          <Picture url={url} onClick={closeDialog} />
        </div>
      </Dialog>
    </div>
  )
}
