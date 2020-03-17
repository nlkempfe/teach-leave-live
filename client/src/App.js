import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

/* Import custom components */
import Home from './views/Home.js';
import AdminDashboard from './views/AdminDashboard.js';
import Blog from './views/Blog.js';
import NavigationBar from './components/NavigationBar.js'
import AdminBar from './components/AdminBar.js'

function App() {
  return (
    <Router>
      <Route path = '/' render = {(props) => <NavigationBar/>} />
      <Route path = '/admin' render = {(props) => <AdminBar/>} />
      <Switch>
        <Route exact path = '/' render ={(props) => <Home/>} />
        <Route path = '/admin/dashboard' render ={(props) => <AdminDashboard/>} />
        <Route path = '/admin/users' render ={(props) => <AdminDashboard/>} />
        <Route path = '/admin/blog' render ={(props) => <AdminDashboard/>} />
        <Route path = '/admin/courses' render ={(props) => <AdminDashboard/>} />
        <Route path = '/blog' render ={(props) => <Blog/>} />
        <Route path = '/user' render ={(props) => <Home/>} />
        <Route path = '/' render ={(props) => <Home/>} />
      </Switch>
    </Router>
  );
}

export default App;
