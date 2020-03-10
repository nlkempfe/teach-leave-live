import React from 'react'
import ReactDOM from 'react-dom'

import Home from './client/views/Home.js';
import Admin from './client/views/Admin.js';
import Blog from './client/views/Blog.js';

const routing = (
  <Router>
    <div>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/blog" component={Blog} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
