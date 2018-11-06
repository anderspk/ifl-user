import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Teams from './components/Teams';
import TeamPlayers from './components/TeamPlayers';
import Background from './components/Background';
import Players from './components/Players';
import PlayerProfile from './components/PlayerProfile';

class App extends Component {

  renderHeader = () => {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/teams'>Teams</Link></li>
            <li><Link to='/players'>Players</Link></li>
            <li><Link to='/'>Matches</Link></li>
          </ul>
          <ul className='account-nav'>
            <li><Link to='/'>My Account</Link></li>
          </ul>
        </nav>
      </header>
    )
  }

  render() {
    return <div className="App">
        <Background />
        {this.renderHeader()}
        <Switch>
          <Route path="/players/:id" component={PlayerProfile} />
          <Route path="/players" component={Players} />
          <Route path="/teams/:id" component={TeamPlayers} />
          <Route path="/teams" component={Teams} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>;
  }
}

export default App;
