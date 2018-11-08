import React, { Component } from 'react';
import axios from 'axios';

class PlayerProfile extends Component {

  state = {};

  renderTable = () => {
    const { player, team } = this.state;
    return (
      <table>
        <tbody>
          <tr>
            <th>Date of birth:</th>
            <td>{player.date_of_birth}</td>
          </tr>
          <tr>
            <th>Position:</th>
            <td>{player.normal_position}</td>
          </tr>
          <tr>
            <th>Jersey Number:</th>
            <td>{player.number}</td>
          </tr>
          <tr>
            <th>Team:</th>
            <td>{team.association_name}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  componentWillMount() {
    axios.get(`http://case-person.herokuapp.com/showOnePlayer/${this.props.match.params.id}`)
      .then(player => axios.get(`http://case-team.herokuapp.com/showAllTeamData/${player.data.team_id}`).then(team => this.setState({ player: player.data, team: team.data})));
  }

  renderNews() {
    return (
      <div className='profile-news'>
        <div className='profile-news-header'>
          <h5>Latest News</h5>
          <a>Follow</a>
        </div>
      </div>
    )
  }

  render() {
    const { player } = this.state;
    if (!player) return 'Loading...';
    return (
    <section className="header profile-page">
      <img src={player.player_image ? player.player_image : 'https://i.pinimg.com/236x/c2/73/1d/c2731dea4191b182ecd8f18498562a84--glass-art.jpg'} />
      <div className="profile-name">
        <h4>{`${player.first_name} ${player.last_name}`}</h4>
      </div>
      {this.renderTable()}
      {this.renderNews()}
    </section>
    );
  }
}

export default PlayerProfile;