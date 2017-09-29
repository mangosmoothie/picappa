import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import MediaItem from './mediaitem/MediaItem';
import Gallery from './picturedisplay/containers/Gallery';

const Home = () => {
  return (
    <Gallery url="/api/pictures" />
  );
}

const App = () => {
  return (
    <Router>
      <div>
        <div className="topNavContainer">
          <nav className="p-3 topNav">
            <div className="d-flex">
              <Link to="/" className="p-1">Home</Link>
              <Link to="/mediaitem" className="ml-auto">
                <div className="fa fa-2x fa-child" style={{color: 'black'}} />
              </Link>
            </div>
          </nav>
          <div className="p-1 topNavAccent" />
        </div>
        <div className="App" >
          <div className="flex-column">
            <div className="flex-row">
            </div>
            <div className="flex-row">
              <Route exact path="/" component={Home}/>
            </div>
            <div className="flex-row">
              <Route path="/mediaitem" component={MediaItem}/>
            </div>
          </div>
        </div>
      </div>
    </Router>

  );
}

export default App;
