import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Players extends Component {

  state = { players: [] };

  componentWillMount() {
    // axios.get(`http://case-person.herokuapp.com/showPlayers`).then(players => this.setState({ players: players.data }));
    axios.get(`http://case-person.herokuapp.com/showPlayers`).then(({data}) => {
      data.forEach((player, i) => {
        axios.get(`http://case-team.herokuapp.com/showAllTeamData/${player.team_id}`).then(team => {
          team = team.data.association_name;
          let playersWithTeamName = this.state.players;
          playersWithTeamName[i] = {...player, association_name: team };
          this.setState({ players: playersWithTeamName });
        });
      })
    });
  }

  renderPlayersList = () => {
    return this.state.players.map((player, i) => {
      return (
      <tr key={i} className='table-row'>
          {/* <td className='player-name'>{`${player.first_name} ${player.last_name}`}</td> */}
          <td className='player-name'>
            <Link to={`/players/${player.person_id}`}>{`${player.first_name} ${player.last_name}`}</Link>
          </td>

          <td className={player.normal_position.toLowerCase()}>{player.normal_position}</td>
          <td className='team-name'>{player.association_name}</td>
      </tr>)
    });
  }

  render() {
    if (!this.state.players) return <div></div>;
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