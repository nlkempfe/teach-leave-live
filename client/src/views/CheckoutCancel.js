import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const App = () => {
  const history = useHistory();
  useEffect(()  => {
    setTimeout(() => history.push('/account'), 3000);
  }, []);
  return (
<div style={{marginTop: 100}}>
        <div style={{textAlign: 'center'}}>
          There was an error processing your payment.
        </div>
        <div style={{textAlign: 'center'}}>
          Your account will remain at it's current status.
        </div>
        <div style={{textAlign: 'center'}}>
          You will be redirected to the home page.
        </div>
      </div>
  )
}

export default App;

