import React, { Component } from 'react';
import axios from 'axios';

class landingPage extends Component {

  state = {news: []}

  componentWillMount() {
    axios.get("https://case-users.herokuapp.com/getNews").then(response => {
      this.setState({news: response.data});
    });
  }

  render() {
    console.log(this.state, 'state');
    return (
      <div className='main-container'>
        <section className='header'>
          <p>THE</p>
          <h1>Intergalactic Football League</h1>
        </section>
        <section className='latest-news'>
          <h3>Latest News</h3>
          <ul>
            {this.state.news.map(news => <li>{news}</li>)}
          </ul>
        </section>
      </div>
    )
  }
}

export default landingPage;