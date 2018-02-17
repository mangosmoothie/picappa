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

const HomeLink = props => (
  <NavLink to="/picappa" style={styles.navLink}>
    { props.children }
  </NavLink>
)

const LeftElement = (
  <HomeLink>
    <IconButton >
      <ActionHome color={white} />
    </IconButton>
  </HomeLink>
)


const MainAppBar = () => (
  <AppBar
    className="topNavContainer"
    style={styles.title}
    title={<HomeLink><span style={styles.title}>Picappa</span></HomeLink>}
    iconElementLeft={LeftElement}
    iconElementRight={<MediaSearchPanel />}
  />
);

export default MainAppBar;
