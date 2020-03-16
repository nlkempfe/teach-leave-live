import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

/* Import custom components */
import Home from './views/Home.js';
import Admin from './views/Admin.js';
import Blog from './views/Blog.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/blog" component={Blog} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
