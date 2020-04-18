import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {auth, db} from './firebase/firebaseInit';

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
import Socials from './views/Socials.js'


function App() {
  const [drawerWidth, setDrawerWidth] = useState(200);

  let savedUser = readUser()
  const [currUser, setCurrUser] = useState(savedUser);
  const [isAdmin, setIsAdmin] = useState(savedUser && savedUser.role === 'admin');
  const [premium, setPremium] = useState(savedUser && savedUser.premium);
  const [blogPermission, setBlogPermission] = useState(savedUser && savedUser.blogPermission);
  const [commentPermission, setCommentPermission] = useState(savedUser && savedUser.commentPermission);

  /* Add listener on authentication state changes, set user appropriately */
  auth().onAuthStateChanged(authToken => {
      if(authToken && (currUser === null || currUser.uid != authToken.uid)){
          //User just signed in -> store user in browser storage to avoid flicker
          let userDocReference = db.collection('users').doc(authToken.uid);
          userDocReference.get().then(snapshot => {
             if(snapshot.exists){
                 //User document found
                 let newUser = snapshot.data();
                 localStorage.setItem('currentUser', JSON.stringify(newUser));
                 setCurrUser(newUser);
                 setIsAdmin(newUser.role === 'admin');
                 setPremium(newUser.premium);
                 setBlogPermission(newUser.blogPermission);
                 setCommentPermission(newUser.commentPermission);
             }
          });
      }
  });

  return(
    <Router>
      <Route path = '/' render = {(props) => <NavigationBar currUser={currUser} updateUser={setCurrUser}/>} />
      {isAdmin ? <Route path = '/admin' render = {(props) => <AdminBar currUser={currUser} updateUser={setCurrUser} drawerWidth={drawerWidth}/>} /> : null}
      <Switch>
        <Route exact path = '/' render ={(props) => <Home currUser={currUser} />} />
        <Route path = '/blog' render ={(props) => <Blog currUser={currUser} blogPermission={blogPermission} />} />
        <Route path = '/user' render ={(props) => <Home currUser={currUser} updateUser={setCurrUser} />} />
        <Route path = '/courses' render ={(props) => <Courses premium={premium} updateUser={setCurrUser}/>} />
        <Route path = '/socials' render ={(props) => <Socials currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/account' render ={(props) => <Account currUser={currUser} updateUser={setCurrUser}/>} />
        <Route path = '/home' render ={(props) => <Home currUser={currUser} updateUser={setCurrUser}/>} />
      </Switch>
      {isAdmin ?
        <Switch>
          <Route path = '/admin/dashboard' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser} drawerWidth={drawerWidth}/>} />
          <Route path = '/admin/users' render ={(props) => <AdminUsers drawerWidth={drawerWidth}/>} />
          <Route path = '/admin/blog' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser} drawerWidth={drawerWidth}/>} />
          <Route path = '/admin/courses' render ={(props) => <AdminDashboard currUser={currUser} updateUser={setCurrUser} drawerWidth={drawerWidth}/>} />
          <Route path = '/admin/events' render ={(props) => <AdminEvent currUser={currUser} updateUser={setCurrUser} drawerWidth={drawerWidth}/>} />
        </Switch>
        : null
      }
    </Router>
  );
}

export default App;
