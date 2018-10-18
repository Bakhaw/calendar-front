import React, { Component } from 'react';
import axios from 'axios';

import CreateInvitation from '../CreateInvitation';
import Invitations from '../Invitations';

class Admin extends Component {

  state = {
    invitations: []
  }

  componentDidMount() {
    this.getInvitations();
  }

  getInvitations = async () => {
    console.log('getting invitations ..');
    const request = await axios.get('http://localhost:8090/invitations');
    const invitations = await request.data;

    this.setState({ invitations })
  }

  removeItem = async (id) => {
    await axios.get(`http://localhost:8090/invitations/delete/${id}`);
    this.getInvitations();
  }

  render() { 
    return (
      <div>
        <h1>Bienvenue Mme. Poublan</h1>

        <CreateInvitation getInvitations={this.getInvitations}/>
        <Invitations invitations={this.state.invitations}
                    getInvitations={this.getInvitations}
                    removeItem={this.removeItem} />
      </div>
    );
  }
}
 
export default Admin;