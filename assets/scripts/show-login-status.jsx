import React from 'react';
import Firebase from 'firebase';

import {FIREBASE_URL} from './config';

/**
 * Shows the login status and a logout button
 */
export default class extends React.Component {
  /**
   * Logout a user
   */
  logout() {
    const ref = new Firebase(FIREBASE_URL);
    ref.unauth();
  }

  /**
   * Render the component
   * @return {JSX} The content
   */
  render() {
    return (
      <div className='user'>
        <div>
          You are logged in as {this.props.user.username} from Github
        </div>
        <button
            className='button button--small'
            type='button'
            onClick={() => {this.logout()}}>
          Logout
        </button>
      </div>
    );
  }
}
