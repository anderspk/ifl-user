import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

class Matches extends Component {

  state = {};

  componentWillMount() {
    axios.get("http://case-match.herokuapp.com/showMatches")
      .then(response => this.setState({ matches: response.data }));
    axios.get("http://case-team.herokuapp.com/showAllTeamData/")
      .then(response => this.setState({ teams: response.data }));
  }

  renderMatchesTable = () => {
    return (
      <table>
        <tbody>
        {this.state.matches.map(match => {
          return (
            <tr>
              <td className="match-time">{match.match_date}</td>
              <td>
                <img className="home-team crest" src="https://www.designevo.com/res/templates/thumb_small/soccer-ball-badge.png" />
              </td>
              <td className="table-teams">
                <div className="table-teams-container">
                  <div className="home-team">{this.state.teams.find(team => team.team_id === match.home_team_id).association_name}</div>
                    <div className="versus"><p>vs</p></div>
                  <div className="away-team">{this.state.teams.find(team => team.team_id === match.away_team_id).association_name}</div>
                </div>
              </td>
              <td>
                <img className="away-team crest" src="https://www.designevo.com/res/templates/thumb_small/soccer-ball-badge.png" />
              </td>
            </tr>);
        })}
        </tbody>
      </table>
    )
  }

  render() {
    if (!this.state.matches || !this.state.teams) return 'Loading...';
    
    return (
      <section className='header matches-table'>
        <h3>Matches</h3>
        {this.renderMatchesTable()}
      </section>
    )

  }
}

export default Matches;