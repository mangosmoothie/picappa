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
        <nav className="d-block p-3 navbar-fixed-top topNav">
          <div className="d-flex justify-content-start">
                <Link to="/" className="p-2">Home</Link>
                <Link to="/mediaitem" className="ml-auto">
                  <div className="fa fa-2x fa-child" style={{color: 'black'}} />
                </Link>
                <div className="" />
          </div>
        </nav>
        <div className="d-block p-1 topNavAccent" />
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
