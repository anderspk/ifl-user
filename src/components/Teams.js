import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Teams extends Component {

  state = {teams: []};

  componentDidMount() {
    axios.get('http://case-team.herokuapp.com/showAllTeamData')
    .then(response => this.setState({ teams: response.data }));
  }
  renderTeamList = () => {
    return this.state.teams.map(team => {
      return (
      <li key={team.association_name}>
        <Link to={`/teams/${team.team_id}`}>
          {team.association_name}
        </Link>
      </li>)
    })
  }

  render() {
    return (
      <section className='header teams-table'>
        <h3>Current Teams</h3>
        <ul>
          {this.renderTeamList()}
        </ul>
      </section>
    )
  }

}

export default Teams;