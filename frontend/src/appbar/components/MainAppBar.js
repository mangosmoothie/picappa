import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import { NavLink } from 'react-router-dom'
import { white, primary } from '../../colors'
import MediaSearchPanel from '../../picturedisplay/containers/MediaSearchPanel'

const styles = {
  title: {
    position: "fixed",
    color: white,
    backgroundColor: primary
  }

};

const homeLink = (
  <NavLink to="/gallery" style={styles.navLink}>
    <IconButton >
      <ActionHome color={white} />
    </IconButton>
  </NavLink>
)

const MainAppBar = () => (
  <AppBar
    className="topNavContainer"
    style={styles.title}
    title={<span style={styles.title}>Title</span>}
    iconElementLeft={homeLink}
    iconElementRight={<MediaSearchPanel />}
  />
);

export default MainAppBar;
