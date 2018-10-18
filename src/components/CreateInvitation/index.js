import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class CreateInvitation extends Component {

  state = {
    inputValue: ''
  }

  handleChange = event => {
    this.setState({
      inputValue: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.append('dates', this.state.inputValue);

    try {
      await axios({
        method: 'post',
        url: 'http://localhost:8090/invitations/add',
        data: params,
      });
    } catch (err) {
      console.log(err)
    }

    this.props.getInvitations();
  }

  render() {
    return (
      <div className='create-invitation'>
        <h1>Créer des invitations</h1>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <TextField
            id='outlined-name'
            label='Ajouter des dates'
            name='dates'
            value={this.state.inputValue}
            onChange={this.handleChange}
            margin='normal'
            variant='outlined'
          />

          <Button type='submit' variant='outlined' color='primary'>
            Valider
          </Button>
        </form>

        <p>{this.state.inputValue}</p>
      </div>
    );
  }
}

export default CreateInvitation;