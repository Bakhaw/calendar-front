import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

import Modal from '../Modal';

class Invitation extends Component {
  state = {
    showDialog: false
  }

  render() {
    return (
      <div>
        <List component='nav'>
          {this.props.invitations.map((d, i) => {
            return (
              <ListItem key={i} button>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText inset primary={d.dates} />
                <Modal item={d} getInvitations={this.props.getInvitations} />
                <Button onClick={() => this.props.removeItem(d._id)}
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
