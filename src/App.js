import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { Switch, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Teams from './components/Teams';
import TeamPlayers from './components/TeamPlayers';
import Background from './components/Background';
import Players from './components/Players';

const particlesOptions = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#ffffff'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 4,
        size_min: 0.3,
        sync: false
      }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 600
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'bubble'
      },
      onclick: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 250,
        size: 0,
        duration: 2,
        opacity: 0,
        speed: 3
      },
      repulse: {
        distance: 400,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
}

class App extends Component {

  renderHeader = () => {
    return (
      <header>
        <div className='blur'></div>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/teams'>Teams</Link></li>
            <li><Link to='/players'>Players</Link></li>
            <li><a href='#' >MATCHES</a></li>
          </ul>
          <ul className='account-nav'>
            <li><a href='#'>My Account</a></li>
          </ul>
        </nav>
      </header>
    )
  }

  render() {
    return (
      <div className="App">
        <Background />
        {this.renderHeader()}
        <Switch>
          <Route path='/players' component={Players} />
          <Route path='/teams/:id' component={TeamPlayers} />
          <Route path='/teams' component={Teams} />
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
