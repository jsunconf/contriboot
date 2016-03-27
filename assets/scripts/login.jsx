import React from 'react';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

import {contributionFirebase, FIREBASE_INTERESTS} from './firebaseConnection';

export default class LoginWithGithub extends React.Component {
  loginWithGithub(event) {
    contributionFirebase.reference.authWithOAuthRedirect("github", function(error) {
      if (error) {
        console.log("Login Failed!", error);
      }
    }, {
      remember: "sessionOnly",
      scope: "user"
    });
  }
  render() {
    return (
      <button className='btn login' onClick={this.loginWithGithub}>
        Login with github
      </button>
    );
  }
}
