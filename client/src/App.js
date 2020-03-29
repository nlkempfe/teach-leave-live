import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {auth, db} from './firebase/firebaseInit';

/* Import custom components */
import NavigationBar from './components/NavigationBar.js'
import AdminBar from './components/AdminBar.js'

/* Import views */
import Home from './views/Home.js';
import AdminDashboard from './views/AdminDashboard.js';
import AdminEvent from './views/AdminEvent.js';
import AdminUsers from './views/AdminUsers.js';
import Blog from './views/Blog.js';
import Courses from './views/Courses.js'
import Account from './views/Account.js';


function App() {

  const [currUser, setCurrUser] = useState(null);
  const [drawerWidth, setDrawerWidth] = useState(200);

  /* Add listener on authentication state changes, set user appropriately */
  auth().onAuthStateChanged(user => {
      if(user){
          //User just signed in -> store user in browser storage to avoid flicker
          let userDocReference = db.collection('users').doc(user.uid);
          let getUserDoc = userDocReference.get().then(snapshot => {
             if(snapshot.exists){
                 //User document found
                 localStorage.setItem('currentUser', JSON.stringify(snapshot.data()));
                 setCurrUser(JSON.stringify(snapshot.data()));
             }
          });
      }
  });

  return (
    <Router>
      <Route path = '/' render = {(props) => <NavigationBar currUser={currUser} updateUser={setCurrUser}/>} />
      <Route path = '/admin' render = {(props) => <AdminBar currUser={currUser} updateUser={setCurrUser} drawerWidth={drawerWidth}/>} />
      <Switch>
        <Route exact path = '/' render ={(props) => <Home currUser={currUser} updateUser={setCurrUser} />} />
        <Route path = '/admin/dashboard' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser} drawerWidth={drawerWidth}/>} />
        <Route path = '/admin/users' render ={(props) => <AdminUsers/>} />
        <Route path = '/admin/blog' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/admin/courses' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/admin/events' render ={(props) => <AdminEvent currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/blog' render ={(props) => <Blog currUser={currUser} updateUser={setCurrUser} />} />
        <Route path = '/user' render ={(props) => <Home currUser={currUser} updateUser={setCurrUser} />} />
        <Route path = '/courses' render ={(props) => <Courses currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/account' render ={(props) => <Account currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/' render ={(props) => <Home currUser={currUser} updateUser={setCurrUser} />} />
      </Switch>
    </Router>
  );
}

export default App;
