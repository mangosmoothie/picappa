import React from 'react'
import IconButton from 'material-ui/IconButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import ImageImage from 'material-ui/svg-icons/image/image'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import MediaViewerDialog from '../containers/MediaViewerDialog'
import MediaEditorDialog from '../containers/MediaEditorDialog'
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

export default ( { pictures,
                   setMediaViewerDialogUrl,
                   setMediaEditorDialogItem } ) => {
  return (
      <div className="grid" >
        <MediaViewerDialog />
        <MediaEditorDialog />
        {pictures.map( (p) => {
           const onClickPic = () => setMediaViewerDialogUrl(p.get('url'))
           const onClickEdit = () => setMediaEditorDialogItem(p)
           return (
             <div key={p.get('id')}  className="container" >
               <Picture url={p.get('thumb_url')} onClick={onClickPic} />
               <div className="overlay">
                 <IconButton onClick={onClickEdit}>
                   <ImageEdit color={white} />
                 </IconButton>
                 <IconButton onClick={onClickPic}>
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
