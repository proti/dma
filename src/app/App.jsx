import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import { HOME } from '../common/Routes';

const App = () => (
  <Router>
    <Route path={HOME} component={Home} />
  </Router>
);

export default App;
