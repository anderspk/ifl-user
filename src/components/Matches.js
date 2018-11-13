import React, { Component } from 'react';
import axios from 'axios';

class Matches extends Component {

  state = {
    upcomingMatches: [],
    completedMatches: []
  };

  componentWillMount() {
    axios.get("https://case-match.herokuapp.com/showUpcommingMatches")
      .then(response => this.setState({ upcomingMatches: response.data }));
    axios.get("https://case-match.herokuapp.com/showCompletedMatches")
      .then(response => this.setState({ completedMatches: response.data }));
    axios.get("https://case-team.herokuapp.com/showAllTeamData/")
      .then(response => this.setState({ teams: response.data }));
  }

  renderMatchesTable = (matches) => {
    return (
      <table>
        <tbody>
        {matches.map(match => {
          return (
            <tr onClick={e => this.props.history.push(`/matches/${match.match_id}`)}>
              <td className="match-time">{match.match_date}</td>
              <td className='td-crest'>
                <img className="home-team crest" src={this.state.teams.find(team => team.team_id === match.home_team_id).team_image} />
              </td>
              <td className="table-teams">
                <div className="table-teams-container">
                  <div className="home-team">{this.state.teams.find(team => team.team_id === match.home_team_id).association_name}</div>
                    <div className="versus"><p>vs</p></div>
                  <div className="away-team">{this.state.teams.find(team => team.team_id === match.away_team_id).association_name}</div>
                </div>
              </td>
              <td className='td-crest'>
                <img className="away-team crest" src={this.state.teams.find(team => team.team_id === match.away_team_id).team_image} />
              </td>
            </tr>);
        })}
        </tbody>
      </table>
    )
  }

  render() {
    if (!this.state.teams) return <div></div>;
    
    return (
      <section className='header matches-table'>
        <h3>Upcoming Matches</h3>
        {this.renderMatchesTable(this.state.upcomingMatches)}
        <h3>Completed Matches</h3>
        {this.renderMatchesTable(this.state.completedMatches)}
      </section>
    )

  }
}

export default Matches;