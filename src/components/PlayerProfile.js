import React, { Component } from 'react';

class PlayerProfile extends Component {

  renderTable = () => {
    return (
      <table>
        <tbody>
          <tr>
            <th>Date of birth:</th>
            <td>25.07.1989</td>
          </tr>
          <tr>
            <th>Position:</th>
            <td>Attack</td>
          </tr>
          <tr>
            <th>Jersey Number:</th>
            <td>7</td>
          </tr>
          <tr>
            <th>Team:</th>
            <td>Futurama</td>
          </tr>
        </tbody>
      </table>
    )
  }
  render() {
    return (
    <section className="header profile-page">
      <img src="https://i.pinimg.com/236x/c2/73/1d/c2731dea4191b182ecd8f18498562a84--glass-art.jpg" />
      <div className="profile-name">
        <h4>Philip J. Fry</h4>
      </div>
      {this.renderTable()}
    </section>
    );
  }
}

export default PlayerProfile;