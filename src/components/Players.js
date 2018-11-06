import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Players extends Component {

  state = { players: [] };

  componentWillMount() {
    const { id } = this.props.match.params;
    axios.get(`http://case-person.herokuapp.com/showPlayers`).then(players => this.setState({ players: players.data }));
  }

  renderPlayersList = () => {
    return this.state.players.map(player => {
      return (
      <tr key={player.aperson_id} className='table-row'>
          <td className='player-number'>{`${player.first_name} ${player.last_name}`}</td>
          <td className={player.normal_position.toLowerCase()}>{player.normal_position}</td>
          <td className='team-name'>{player.number}</td>
      </tr>)
    });
  }

  render() {
    console.log(this.state, 'state');
    if (!this.state.players) return <div></div>;
    return (
      <section className='header players-table'>
       <h3>Players</h3>
      <table>
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
        {this.renderPlayersList()}
      </table>
    </section>
    )
  }
}

export default Players;