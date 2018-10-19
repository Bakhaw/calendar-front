import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Redirect } from 'react-router-dom'

import CreateInvitation from '../CreateInvitation';
import Modal from '../Modal';

class Invitation extends Component {
  state = {
    invitations: [],
    selectedDatesIds: [],
    selectedDates: [],
    showDialog: false
  }

  componentDidMount() {
    this.getInvitations();
  }

  handleSubmit = (e) => {
    const { name, lastname } = this.props;
    e.preventDefault();
    const params = new URLSearchParams();
    params.append('title', `${lastname.value} ${name.value}`);
    params.append('start', moment('03/10/2018').format('DD/MM/YYYY'));
    params.append('end', new Date())
    // params.append('invitationId')

    axios({
      method: 'post',
      url: 'http://localhost:8090/calendar/add',
      data: params
    })
      .then(res => {
        console.log(res);
        this.props.history.push('/calendar')
      })
      .catch(err => console.log(err))
  }

  getInvitations = async () => {
    const request = await axios.get('http://localhost:8090/invitations');
    const invitations = await request.data;

    this.setState({ invitations })
  }

  selectDate = async (item) => {
    await this.setState(prevState => {
      let newState = Object.assign({}, prevState);
      let i = prevState.selectedDates.find(n => n._id === item._id);
      if (i) {
        newState.selectedDates = newState.selectedDates.filter(n => n._id !== i._id);
        newState.selectedDatesIds = newState.selectedDatesIds.filter(n => n !== i._id);
      } else {
        newState.selectedDates.push(item);
        newState.selectedDatesIds.push(item._id);
      }
      return newState;
    });
  }

  removeItem = async (id) => {
    await axios.get(`http://localhost:8090/invitations/delete/${id}`);
    this.getInvitations();
  }

  render() {
    return (
      <div>
        {this.props.isAdmin &&
          <CreateInvitation getInvitations={this.getInvitations} />
        }

        <List component='nav'>
          {this.state.invitations.map((d, i) => {
            return (
              <ListItem button
                key={i}
                onClick={() => this.selectDate(d)}
                selected={this.state.selectedDatesIds.includes(d._id)}>
                <ListItemIcon>
                  <CalendarIcon />
                </ListItemIcon>
                <ListItemText inset primary={d.dates} />

                {this.props.isAdmin &&
                  <div className='admin-action-buttons'>
                    <Modal item={d} getInvitations={this.getInvitations} />
                    <Button onClick={() => this.removeItem(d._id)}
                      size='small'
                      color='secondary'>
                      Supprimer
                    </Button>
                  </div>
                }

              </ListItem>
            )
          })}
        </List>
        {!this.props.isAdmin &&
          <Button className='submit-button' type='submit' size='large' variant='contained' color='primary' onClick={this.handleSubmit}>
            Valider
          </Button>
        }
      </div>
    )
  }
}

export default Invitation;
