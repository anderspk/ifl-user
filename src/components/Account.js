import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../auth/Auth';

class Account extends Component {

  state = {
    news: []
  }

  componentWillMount() {
    const auth = new Auth();
    const username = auth.getProfile().name;
    axios.get(`https://case-users3.herokuapp.com/userID/${username}`).then(response => {
      axios.get(`https://case-users.herokuapp.com/getUserNews/${response.data.user_id}`).then(news => this.setState({ news: news.data }))
    });
    
  }

  render() {
    console.log(this.state, 'news');
    return <section className="account-header">
        <div className="newsfeed profile-news">
          <div className="profile-news-header">
            <h5>Your News Feed</h5>
          </div>
        </div>
      <ul>
        {this.state.news.map(news => <li>{news}</li>)}
      </ul>
      </section>;
  }
}

export default Account;