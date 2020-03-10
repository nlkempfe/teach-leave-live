import React, { useState } from 'react';
import Home from './views/Home.js';
import {auth} from "./firebase/firebase";

/* Import custom components */
import Admin from './views/Admin.js';
import Blog from './views/Blog.js';

function App() {

    //Setting state vars
    const [user, setUser] = useState(null);

    //Add listener on authentication state changes, set user appropriately
    auth().onAuthStateChanged(function (user) {
        if(user){
            setUser(user);
        }
    });

  return (
    <div>
      <Router>
      <Switch>
        <Route exact path="/" component={() => <Home updateUser={setUser} user={user}/>} />
        <Route path="/admin" component={Admin} />
        <Route path="/blog" component={Blog} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>

    </div>
  );
}

export default App;
