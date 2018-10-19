import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

import CreateInvitation from '../CreateInvitation';
import Modal from '../Modal';

class Invitation extends Component {
  state = {
    invitations: [],
    showDialog: false
  }

  componentDidMount() {
    console.log('hihi')
    this.getInvitations();
  }

  getInvitations = async () => {
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
        {this.props.isAdmin &&
          <CreateInvitation getInvitations={this.getInvitations}/>
        }

        <List component='nav'>
          {this.state.invitations.map((d, i) => {
            return (
              <ListItem key={i} button>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText inset primary={d.dates} />
                <Modal item={d} getInvitations={this.getInvitations} />
                <Button onClick={() => this.removeItem(d._id)}
                  size='small'
                  color='secondary'>
                  Supprimer
                </Button>
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
}

export default Invitation;
