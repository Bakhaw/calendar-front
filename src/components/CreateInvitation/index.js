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

  handleSubmit(event) {
    console.log('submit !', this.state.inputValue)
    event.preventDefault();

    const bodyFormData = new FormData();

    bodyFormData.set('name', 'TestZer')
    bodyFormData.set('dates', [this.state.inputValue]);

    axios({
      method: 'post',
      url: 'http://localhost:8090/invitations/add',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h1>Créer une invitation</h1>

        <form action='http://localhost:8090/invitations/add' method='post'>
          <TextField
            id='outlined-name'
            label='Dates'
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