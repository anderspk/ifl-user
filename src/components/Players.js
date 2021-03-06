import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Players extends Component {

  state = { players: [] };

  componentWillMount() {
    axios.get('https://crudpi.io/7b4b03/players').then(response => this.setState({ players: response.data }));
    axios.get('https://crudpi.io/7b4b03/teams').then(response => this.setState({ teams: response.data }));
  }

  renderPlayersList = () => {
    return this.state.players.map((player, i) => {
      return (
      <tr key={i} className='table-row'>
          <td className='player-name'>
            <Link to={`/players/${player.id}`}>{`${player.first_name} ${player.last_name}`}</Link>
          </td>

          <td className={player.normal_position.toLowerCase()}>{player.normal_position}</td>
          <td className='team-name'>{this.state.teams.find(team => team.id === player.team_id).association_name}</td>
      </tr>)
    });
  }

  render() {
    if (!this.state.players || !this.state.teams) return <div></div>;
    return (
      <section className='header players-table'>
       <h3>Players</h3>
      <table>
        <thead>
          <tr className='table-header'>
            <th>
              Name
            </th>
            <th>
              Position
            </th>
            <th>
              Team
            </th>
          </tr>
        </thead>
        <tbody>
          {this.renderPlayersList()}
        </tbody>
      </table>
    </section>
    )
  }
}

export default Players;
