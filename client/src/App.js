import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {auth, db} from './firebase/firebaseInit';

import history from './history';

/* Import controllers */
import {readUser} from './firebase/controllers.js';

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
import Socials from './views/Socials.js';
import CheckoutSuccess from './views/CheckoutSuccess.js';
import CheckoutCancel from './views/CheckoutCancel.js';
import Subscription from './views/Subscription'


function App() {

  const [currUser, setCurrUser] = useState(null);
  const [drawerWidth, setDrawerWidth] = useState(200);
  const [isAdmin, setIsAdmin] = useState(false);

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
                 setIsAdmin((snapshot.data().role === 'admin'));
             }
          });
      }
  });

  if(isAdmin) {
    return (
      <Router>
        <Route path = '/' render = {(props) => <NavigationBar currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/admin' render = {(props) => <AdminBar currUser={currUser} updateUser={setCurrUser} drawerWidth={drawerWidth}/>} />
        <Switch>
          <Route exact path = '/' render ={(props) => <Home currUser={currUser} updateUser={setCurrUser} />} />
          <Route path = '/admin/dashboard' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser} drawerWidth={drawerWidth}/>} />
          <Route path = '/admin/users' render ={(props) => <AdminUsers drawerWidth={drawerWidth}/>} />
          <Route path = '/admin/blog' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser} drawerWidth={drawerWidth}/>} />
          <Route path = '/admin/courses' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser} drawerWidth={drawerWidth}/>} />
          <Route path = '/admin/events' render ={(props) => <AdminEvent currUser={currUser} updateUser={setCurrUser} drawerWidth={drawerWidth}/>} />
          <Route path = '/blog' render ={(props) => <Blog currUser={currUser} updateUser={setCurrUser} />} />
          <Route path = '/user' render ={(props) => <Home currUser={currUser} updateUser={setCurrUser} />} />
          <Route path = '/courses' render ={(props) => <Courses currUser={currUser} updateUser={setCurrUser}/>} />
          <Route path = '/socials' render ={(props) => <Socials currUser={currUser} updateUser={setCurrUser}/>} />
          <Route path = '/account' render ={(props) => <Account currUser={currUser} updateUser={setCurrUser}/>} />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Route path = '/' render = {(props) => <NavigationBar currUser={currUser} updateUser={setCurrUser}/>} />
        <Switch>
          <Route exact path = '/' render ={(props) => <Home currUser={currUser} updateUser={setCurrUser} />} />
          <Route path = '/blog' render ={(props) => <Blog currUser={currUser} updateUser={setCurrUser} />} />
          <Route path = '/user' render ={(props) => <Home currUser={currUser} updateUser={setCurrUser} />} />
          <Route path = '/courses' render ={(props) => <Courses currUser={currUser} updateUser={setCurrUser}/>} />
          <Route path = '/socials' render ={(props) => <Socials currUser={currUser} updateUser={setCurrUser}/>} />
          <Route path = '/account' render ={(props) => <Account currUser={currUser} updateUser={setCurrUser}/>} />
          <Route path = '/checkout/success' render ={(props) => <CheckoutSuccess currUser={currUser} updateUser={setCurrUser}/>} />
          <Route path = '/checkout/cancel' render ={(props) => <CheckoutCancel currUser={currUser} updateUser={setCurrUser}/>} />
          <Route path = '/subscription' render ={(props) => <Subscription currUser={currUser} updateUser={setCurrUser}/>} />

        </Switch>
      </Router>
    );
  }
}

export default App;
