import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionHome from 'material-ui/svg-icons/action/home'
import { NavLink } from 'react-router-dom'
import { white, primary, secondary } from '../../colors'
import MediaSearch from './MediaSearch'

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
    iconElementRight={<MediaSearch />}
  />
);

export default MainAppBar;
