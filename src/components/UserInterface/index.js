import React, { Component } from 'react'
import axios from 'axios';

import Invitations from '../Invitations';

class UserInterface extends Component {

    state = {
        invitations: []
    }

    componentDidMount() {
        this.getInvitations();
    }

    getInvitations = async () => {
        const request = await axios.get('http://localhost:8090/invitations');
        const invitations = await request.data;

        this.setState({ invitations })
    }   

    removeItem = async (id) => {

    }

    render() {
        return (
            <div className='user-container'>
                <h1>User interface</h1>
                <Invitations />
            </div>
        )
    }
}

export default UserInterface;