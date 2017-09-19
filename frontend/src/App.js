import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import MediaItem from './MediaItem';
import PictureDisplay from './PictureDisplay';

const Home = () => {
  return (
    <PictureDisplay/>
  );
}

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/mediaitem">Media Item</Link></li>
        </ul>

        <hr/>

        <Route exact path="/" component={Home}/>
        <Route path="/mediaitem" component={MediaItem}/>
      </div>
    </Router>

  );
}

export default App;
