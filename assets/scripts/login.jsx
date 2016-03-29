import React from 'react';
import Firebase from 'firebase';

import {FIREBASE_URL} from './config';

export default class extends React.Component {
  /**
   * Authenticate with Github
   */
  loginWithGithub() {
    const ref = new Firebase(FIREBASE_URL);
    ref.authWithOAuthRedirect('github', function(error) {
      if (error) {
        console.log('Login Failed!', error);
      }
    }, {
      remember: 'sessionOnly',
      scope: 'user'
    });
  }

  /**
   * Render the login part
   */
  render() {
    return (
      <button
        type='button'
        className='button button--small button--login'
        onClick={this.loginWithGithub}>
        Login with github
      </button>
    );
  }
}
