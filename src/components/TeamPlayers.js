import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class TeamPlayers extends Component {

  state = { players: [] };

  componentWillMount() {
    const { id } = this.props.match.params;
    axios.get(`http://case-person.herokuapp.com/showPlayersInTeam/${id}`).then(players => this.setState({ players: players.data })).then(console.log('done'))
  }

  renderPlayersList = () => {
    console.log(this.state.players, 'players');
    return this.state.players.map(player => {
      return (
      <tr key={player.aperson_id} className='table-row'>
          <td className='team-number'>{player.number}</td>
          <td className='player-name'>{`${player.first_name} ${player.last_name}`}</td>
          <td className={player.normal_position.toLowerCase()}>{player.normal_position}</td>
      </tr>)
    });
  }

  render() {
    return (
      <section className='header players-table'>
       <h3>Team Name</h3>
      <table>
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
        {this.renderPlayersList()}
        {this.renderPlayersList()}
      </table>
    </section>
    )
  }
}

export default TeamPlayers;