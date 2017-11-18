import React from 'react'
import IconButton from 'material-ui/IconButton'
import ImageImage from 'material-ui/svg-icons/image/image'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Dialog from 'material-ui/Dialog'
import { white } from '../../colors'

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

export default class MediaViewerDialog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      url: props.url
    }
  }

  handleToggle = () => this.setState({open: !this.state.open})

  handleClose = () => this.setState({open: false})

  render() {
    return (
      <div>
        <IconButton onClick={this.handleToggle}>
          <ImageImage color={white} />
        </IconButton>

        <Dialog
          modal={false}
          open={this.state.open}
          repositionOnUpdate={false}
          autoDetectWindowHeight={false}
          bodyStyle={{padding: 10}}
          style={{paddingTop: 10, height: '100vh'}}
          contentStyle={styles.dialog}
          onRequestClose={this.handleClose} >

          <div style={styles.container}>
            <Picture url={this.state.url} onClick={this.handleClose} />
          </div>
        </Dialog>
      </div>
    );
  }
}
