import React, { Component } from 'react';
import axios from 'axios';

class landingPage extends Component {

  state = {news: []}

  componentWillMount() {
    axios.get("http://case-users.herokuapp.com/getNews").then(response => {
      this.setState({news: response.data});
    });
  }

  render() {
    console.log(this.state, 'state');
    return (
      <div>
        <section className='header'>
          <p>THE</p>
          <h1>Intergalactic Football League</h1>
        </section>
        <section className='latest-news'>
          <h3>Latest News</h3>
          <ul>
            {this.state.news.map(news => <li>{news}</li>)}
            <li>Killer Robots score a goal against Team Humans.</li>
            <li>Gabriel#9 joins The Gabriels</li>
            <li>Tune Squad defeats Monstars 6-5</li>
          </ul>
        </section>
      </div>
    )
  }
}

export default landingPage;