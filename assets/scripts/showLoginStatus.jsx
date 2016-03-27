import React from 'react';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

import {contributionFirebase} from './firebaseConnection';

export default class ShowLoginStatusWithGithub extends React.Component {
  render() {
    return (
      <div className="loggedIn">
        You are logged in as {contributionFirebase.reference.getAuth().github.username}
      </div>
    );
  }
}
