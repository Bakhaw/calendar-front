import React, { Component } from 'react';
import CreateInvitation from './components/CreateInvitation';
import Invitation from './components/Invitation';

class App extends Component {
  render() {
    return (
      <div>
        <CreateInvitation />
        <Invitation />
      </div>
    );
  }
}

export default App;