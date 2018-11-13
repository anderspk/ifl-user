import React, { Component } from 'react';
import axios from 'axios';
import PlayerCard from './PlayerCard';

class MatchPage extends Component {

  state = {};

  componentDidMount() {
    console.log(this.props)
    axios.get(`https://case-match.herokuapp.com/showOneMatch/${this.props.match.params.id}`)
      .then(response => {
        const match = response.data;
        const homeTeam = axios.get(`https://case-team.herokuapp.com/showAllTeamData/${match.home_team_id}`);
        const awayTeam = axios.get(`https://case-team.herokuapp.com/showAllTeamData/${match.away_team_id}`);
        const homeTeamPlayers = axios.get(`https://case-person.herokuapp.com/showPlayersInTeam/${match.home_team_id}`);
        const awayTeamPlayers = axios.get(`https://case-person.herokuapp.com/showPlayersInTeam/${match.away_team_id}`);
        const matchResult = axios.get(`https://case-results.herokuapp.com/showOneResult/${this.props.match.params.id}`);

        Promise.all([homeTeam, awayTeam, homeTeamPlayers, awayTeamPlayers, matchResult]).then(values => {
          const homeTeamData = values[0].data;
          const awayTeamData = values[1].data;

          const homeTeamPlayersData = values[2].data;
          const awayTeamPlayersData = values[3].data;
          console.log(homeTeamPlayersData, 'hometeam')
          console.log(awayTeamPlayersData, 'awayteam')
          const matchResultData = values[4].data;

          this.setState({
            homeTeam: homeTeamData,
            awayTeam: awayTeamData,
            homeTeamPlayers: homeTeamPlayersData,
            awayTeamPlayers: awayTeamPlayersData,
            matchResult: matchResultData
          });
        })
      })
  }

  renderMatchPageHeader = () => {
    const { homeTeam, awayTeam, homeTeamPlayers, awayTeamPlayers, matchResult } = this.state;
    const homeTeamResult = matchResult.find(result => result.team_id === homeTeam.team_id);
    const awayTeamResult = matchResult.find(result => result.team_id === awayTeam.team_id);

    return( 
      <div className="match-page-header">
        <div className={`match-home-team ${homeTeamResult && homeTeamResult.result}`}>
          <img src={homeTeam.team_image ? homeTeam.team_image : "https://i.ytimg.com/vi/ghMKmANLr4E/maxresdefault.jpg"} />
          <h4>{homeTeam.association_name}</h4>
          <h4 className='score'>{homeTeamResult ? homeTeamResult.score : '0'}</h4>
          <ul>
            {homeTeamPlayers.map(player => <PlayerCard player={player} />)}
          </ul>
        </div>
        <div className="match-vs"><h3>VS</h3></div>
        <div className={`match-away-team ${homeTeamResult && awayTeamResult.result}`}>
          <img src={awayTeam.team_image ? awayTeam.team_image : "https://i.ytimg.com/vi/ghMKmANLr4E/maxresdefault.jpg"} />
          <h4>{awayTeam.association_name}</h4>
          <h4 className='score'>{awayTeamResult ? awayTeamResult.score : '0'}</h4>
          <ul>
            {awayTeamPlayers.map(player => <PlayerCard player={player} />)}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.homeTeam) return <div></div>
    return (
      <section className='match-page'>
        {this.renderMatchPageHeader()}
      </section>
    );
  }
}

export default MatchPage;