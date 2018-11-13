/* eslint no-restricted-globals: 0 */

import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';

const LOGIN_SUCCESS_PAGE = '/';
const LOGIN_FAILURE_PAGE = '/';
const LOGOUT_PAGE = '/';

export default class Auth {

  constructor() {
    this.login = this.login.bind(this);
  }

  userProfile;


  auth0 = new auth0.WebAuth({
    domain: 'case-login.eu.auth0.com',
    clientID: 'obcpKGK8DYmH8y1X4NwCaDjMtPswC6Xz',
    // redirectUri: 'https://ifl-user.herokuapp.com/callback',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
  })

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        location.hash = '';
        location.pathname = LOGIN_SUCCESS_PAGE;
      } else if (err) {
        location.pathname = LOGIN_FAILURE_PAGE;
        console.log(err);
      }
    })
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    location.pathname = LOGOUT_PAGE;
  }

  getProfile() {
    if (localStorage.getItem("id_token")) {
      return jwtDecode(localStorage.getItem("id_token"));
    } else {
      return {};
    }
  }

}