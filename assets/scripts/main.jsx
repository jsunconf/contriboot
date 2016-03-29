import React from 'react';
import {render} from 'react-dom';
import ReactFireMixin from 'reactfire';

import {FIREBASE_URL} from './config';

import Login from './login.jsx'
import ShowLoginStatus from './show-login-status.jsx'
import EntriesList from './entries-list.jsx'
import AddEntriesForm from './add-entries-form.jsx'

const App = React.createClass({
  /**
   * Connect mixins
   * @type {Array}
   */
  mixins: [ReactFireMixin],

  /**
   * Returns the initial state.
   * @return {Object}
   */
  getInitialState: function() {
    return {
      contributions: [],
      interests: [],
      votes: [],
      user: null
    };
  },

  /**
   * Initialises the firebase setup.
   */
  componentWillMount: function() {
    const contribRef = new Firebase(`${FIREBASE_URL}/contributions`),
      interestsRef = new Firebase(`${FIREBASE_URL}/interests`),
      votesRef = new Firebase(`${FIREBASE_URL}/votes`),
      authRef = new Firebase(FIREBASE_URL);

    authRef.onAuth(rawUser => this.setState({user: this.getUserData(rawUser)}));

    this.bindAsArray(contribRef, 'contributions');
    this.bindAsArray(interestsRef, 'interests');
    this.bindAsArray(votesRef, 'votes');
  },

  /**
   * Get the current user data
   * @param {Object} user The raw user data
   * @return {Object} The users data
   */
  getUserData: function(user) {
    if (!user) {
      return null;
    }

    return {
      id: user.github.id,
      username: user.github.username,
      displayName: user.github.displayName,
      profileImageURL: user.github.profileImageURL
    };
  },

  /**
   * Add a new entry to the contributions
   * @param  {Object} newEntry The new entry
   */
  handleEntryAdd: function(newEntry) {
    const typeRef = this.firebaseRefs[newEntry.type],
      votesRef = this.firebaseRefs.votes,
      newEntryRef = typeRef.push({
        title: newEntry.title,
        description: newEntry.description,
        user: this.state.user
      });

    votesRef.child(newEntryRef.key()).set(1)
  },

  /**
   * Returns the component.
   * @return {React.Element}
   */
  render: function() {
    const isLoggedin = this.state.user !== null;

    return <div className="contriboot">
      <EntriesList
        title='Contributions'
        type='contributions'
        entries={this.state.contributions}
        votes={this.state.votes} />
      <EntriesList
        title='Interests'
        type='interests'
        entries={this.state.interests}
        votes={this.state.votes} />

      {isLoggedin ?
        <ShowLoginStatus
          user={this.state.user} /> :
        <Login />
      }
      {isLoggedin ?
        <AddEntriesForm
          onEntryAdd={this.handleEntryAdd} /> :
        null
      }
    </div>;
  }
});

render(<App/>, document.querySelector('.mount'))
