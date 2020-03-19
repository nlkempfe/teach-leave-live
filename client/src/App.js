import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {auth} from "./firebase/firebaseInit";

/* Import custom components */
import NavigationBar from './components/NavigationBar.js'
import AdminBar from './components/AdminBar.js'

/* Import views */
import Home from './views/Home.js';
import AdminDashboard from './views/AdminDashboard.js';
import Blog from './views/Blog.js';
import Courses from './views/Courses.js'
import AdminEvent from './views/AdminEvent.js';

function App() {

  const [currUser, setCurrUser] = useState(null);

  /* Add listener on authentication state changes, set user appropriately */
  auth().onAuthStateChanged(function (user) {
      if(user){
        setCurrUser(user);
      }
  });

  return (
    <Router>
      <Route path = '/' render = {(props) => <NavigationBar currUser={currUser} updateUser={setCurrUser}/>} />
      <Route path = '/admin' render = {(props) => <AdminBar currUser={currUser} updateUser={setCurrUser}/>} />
      <Switch>
        <Route exact path = '/' render ={(props) => <Home currUser={currUser} updateUser={setCurrUser} />} />
        <Route path = '/admin/dashboard' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/admin/users' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/admin/blog' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/admin/courses' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/admin/event' render ={(props) => <AdminEvent currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/blog' render ={(props) => <Blog currUser={currUser} updateUser={setCurrUser} />} />
        <Route path = '/user' render ={(props) => <Home currUser={currUser} updateUser={setCurrUser} />} />
        <Route path = '/courses' render ={(props) => <Courses currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/' render ={(props) => <Home currUser={currUser} updateUser={setCurrUser} />} />
      </Switch>
    </Router>
  );
}

export default App;
