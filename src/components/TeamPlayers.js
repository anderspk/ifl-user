import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class TeamPlayers extends Component {

  state = { players: [] };

  componentWillMount() {
    const { id } = this.props.match.params;
    axios.get(`http://case-person.herokuapp.com/showPlayersInTeam/${id}`).then(players => this.setState({ players: players.data }));
    axios.get(`http://case-team.herokuapp.com/showAllTeamData/${id}`).then(team => this.setState({ teamName: team.data.association_name }));
  }

  renderPlayersList = () => {
    return this.state.players.map(player => {
      return (
      <tr key={player.aperson_id} className='table-row'>
          <td className='team-number'>{player.number}</td>
          <td className='player-name'>
            <Link to={`/players/${player.player_id}`}>{`${player.first_name} ${player.last_name}`}</Link>
          </td>
          <td className={player.normal_position.toLowerCase()}>{player.normal_position}</td>
      </tr>)
    });
  }

  render() {
    if (!this.state.teamName) return <div></div>;
    return (
      <section className='header players-table'>
        <h3>{this.state.teamName}</h3>
        <table>
          <thead>
            <tr className='table-header'>
              <th>
                #
            </th>
              <th>
                Name
            </th>
              <th>
                Position
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

export default TeamPlayers;