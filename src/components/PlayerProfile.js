import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../auth/Auth';

class PlayerProfile extends Component {

  state = {}

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
    const auth = new Auth();
    const username = auth.getProfile().name;
    console.log(username, 'username');

    const user_id = axios.get(`https://case-users.herokuapp.com/userID/${username}`);
    const player = axios.get(`https://case-person.herokuapp.com/showOnePlayer/${this.props.match.params.id}`);
    const playerNews = axios.get(`https://case-users.herokuapp.com/getPlayerNews/${this.props.match.params.id}`);

    Promise.all([user_id, player, playerNews]).then(values => {
      const user_id_data = values[0].data.user_id;
      const player_data = values[1].data;
      const team = axios.get(`https://case-team.herokuapp.com/showAllTeamData/${values[1].data.team_id}`);
      const playerNews_data = values[2].data;
      const watchlist = axios.get(`https://case-users.herokuapp.com/getPlayerWatchlist/${user_id_data}`);
      Promise.all([team, watchlist]).then(values2 => {
        console.log(values2[1].data);
        const following = values2[1].data.includes(Number(this.props.match.params.id));
        this.setState({ user_id: user_id_data, player: player_data, team: values2[0].data, playerNews: playerNews_data, following: following });
      })
    })
  }

  handleFollowPlayer() {
    axios.post('https://case-users.herokuapp.com/createUserWatchPlayer', { watch_id: this.props.match.params.id, user_id: this.state.user_id });
    this.setState({ following: !this.state.following });
  }

  renderNews() {
    return (
      <div className='profile-news'>
        <div className='profile-news-header'>
          <h5>Latest News</h5>
          {!this.state.following ? 
          <a onClick={e => this.handleFollowPlayer()}>Follow</a> : 
          <a className='following' onClick={e => this.handleFollowPlayer()}>Following</a>
          }
        </div>
        <ul>
          {this.state.playerNews.map(news => <li>{news}</li>)}
        </ul>
      </div>
    )
  }

  render() {
    console.log(this.state, 'state');
    const { player } = this.state;
    if (!player) return <div></div>;
    return (
    <section className="header profile-page">
        <img src={player.player_image ? player.player_image : 'https://i.imgur.com/jRKxOYK.png'} />
      <div className="profile-name">
        <h4>{`${player.first_name} ${player.last_name}`}</h4>
      </div>
      {this.renderTable()}
      {this.state.playerNews && this.renderNews()}
    </section>
    );
  }
}

export default PlayerProfile;