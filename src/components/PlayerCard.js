import React from 'react';

const playerCard = ({player}) => {

  return (
    <li className='player-card'>
      <img src={player.player_image ? player.player_image : 'https://i.imgur.com/jRKxOYK.png'} />
      <table>
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{`${player.first_name} ${player.last_name}`}</td>
          </tr>
          <tr>
            <th>Position:</th>
            <td>{player.normal_position}</td>
          </tr>
          <tr>
            <th>Jersey Number:</th>
            <td>{player.number}</td>
          </tr>
        </tbody>
      </table>
    </li>
  )
}

export default playerCard;