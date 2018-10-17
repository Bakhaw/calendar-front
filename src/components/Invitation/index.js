import React, { Component } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

class Invitation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      invitations: []
    }
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
      <div style={{ width: 400, margin: 'auto' }}>
        <List component='nav'>
          {this.state.invitations.map((d, i) => {
            console.log(d.dates)
            return (
              <ListItem key={i} button>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText inset primary={d.dates} />
                <p onClick={() => this.removeItem(d._id)}>Supprimer</p>
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
}

export default Invitation;
