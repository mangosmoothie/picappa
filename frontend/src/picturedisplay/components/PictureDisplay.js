import React from 'react'
import IconButton from 'material-ui/IconButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import ImageImage from 'material-ui/svg-icons/image/image'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import MediaViewerDialog from '../containers/MediaViewerDialog'
import { white } from '../../colors'
import './PictureDisplay.css'

const Picture = ( { url, onClick } ) => {
  const style = {
    backgroundImage: "url('" + url + "')"
  }

  return (
    <a href="#" onClick={onClick} >
      <div className="picture" style={style} />
    </a>
  )
}

export default ( { pictures, setMediaViewerDialogUrl } ) => {
  return (
      <div className="grid" >
        <MediaViewerDialog />
        {pictures.map( (p) => {
           const onClick = () => setMediaViewerDialogUrl(p.get('url'))
           return (
             <div key={p.get('id')}  className="container" >
               <Picture url={p.get('thumb_url')} onClick={onClick} />
               <div className="overlay">
                 <IconButton>
                   <ImageEdit color={white} />
                 </IconButton>
                 <IconButton onClick={onClick}>
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
