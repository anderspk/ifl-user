import React, { Component } from 'react';
import axios from 'axios';

class Teams extends Component {

  state = {};

  componentDidMount() {
    axios.get('http://case-team.herokuapp.com/showTeams')
    .then(response => this.setState({ teams: response.data }));
  }

  render() {
    console.log(this.state, 'state');
    return (
      <section className='teams-table'>
        <h3>Current Teams:</h3>
        <ul>
        </ul>
      </section>
    )
  }

}

export default Teams;