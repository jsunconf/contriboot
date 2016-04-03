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
   * Logout a user
   */
  logout() {
    const ref = new Firebase(FIREBASE_URL);
    ref.unauth();
  }

  renderLogin() {
    return (
      <div className='user'>
        <div className="user__message">
          Log in to contribute
        </div>
        <button
          type='button'
          className='button button--small button--login user__button-login'
          onClick={this.loginWithGithub}>
          Login
        </button>
      </div>
    );
  }

  renderLogOut() {
    return (
      <div className='user'>
        <div className="user__message">
          Logged in as {this.props.user.username}
        </div>
        <button
            className='button button--small user__button-logout'
            type='button'
            onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }

  /**
   * Render the login part
   */
  render() {
    return this.props.user ? this.renderLogOut() : this.renderLogin();
  }
}
