import React, { useState } from 'react';
import Home from './views/Home.js';
import {auth} from "./firebase";

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
      <Home updateUser={setUser} user={user}/>
    </div>
  );
}

export default App;
