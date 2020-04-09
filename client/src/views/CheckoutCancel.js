import React from "react";

export default class App extends React.Component {
  componenetDidMount(){
    setTimeout(this.props.history.push('/'), 5000)
  }

  render() {
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
}
