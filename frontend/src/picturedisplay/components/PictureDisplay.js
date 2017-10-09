import React from 'react'
import IconButton from 'material-ui/IconButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import ImageImage from 'material-ui/svg-icons/image/image'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import { white } from '../../colors'
import './PictureDisplay.css'

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
    backgroundImage: "url('" + url + "')"
  }

  return (
    <a href="#" >
      <div className="picture" style={style} />
    </a>
  )
}

export default ( {pictures} ) => {
  return (
      <div className="grid" >
        {pictures.map( (p) => {
           return (
             <div key={p.get('id')}  className="container" >
               <Picture url={p.get('thumb_url')} />
               <div className="overlay">
                 <IconButton>
                   <ImageEdit color={white} />
                 </IconButton>
                 <IconButton>
                   <ImageImage color={white} />
                 </IconButton>
                 <IconButton>
                   <FileDownload color={white} />
                 </IconButton>
               </div>
             </div>
           )
        })}
      </div>
  )
}
