import React from 'react';

import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

import {FIREBASE_CONTRIBUTIONS, FIREBASE_INTERESTS, contributionFirebase} from './firebaseConnection';

var ContributionsForm = React.createClass({

  mixins: [ReactFireMixin],

  /**
   * Returns the initial state.
   * @return {Object}
   */
  getInitialState: function() {
    return {contributions: [], text: ""};
  },

  /**
   * Initialises the firebase setup.
   */
  componentWillMount: function() {
    const firebaseContributions = contributionFirebase.reference,
      firebaseInterests = new Firebase(FIREBASE_INTERESTS);

    firebaseContributions.on('value', function(dataSnapshot) {
      this.props.onContributionsUpdate(this.state.contributions);
    }.bind(this));

    this.bindAsArray(firebaseContributions, 'contributions');
    this.bindAsArray(firebaseInterests, 'interests');

  },

  /**
   * Sets the new state after a change event.
   * @param  {Evemt} event The change event
   */
  onChange: function({name, value}) {
    this.setState({[name]: value});
  },

  /**
   * Updates firebase with the new state after the submit button was clicked.
   * @param  {Event} event The submit event.
   */
  onSubmit: function(event) {
    event.preventDefault();
    const authData = contributionFirebase.reference.getAuth();
    if (authData === null) {
      // only show form if logged in with github -> prevent this in main.jsx
      return;
    }
    if (this.state.title !== '') {

        this.firebaseRefs['contributions'].push({title: this.state.title, description: this.state.description, uid: authData.auth.uid, username: authData.github.username});

        const contributions = [
          ...this.state.contributions, {
            title: this.state.title,
            description: this.state.description,
            uid: authData.auth.uid,
            username: authData.github.username
          }
        ];

        this.setState({contributions: contributions, text: ""});

        this.props.onContributionsUpdate(contributions);
      }
  },
  /**
   * Returns the component.
   * @return {React.Element}
   */
  render: function() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <label for="title">Title</label>
            <input onChange={event => this.onChange(event.target)} name="title" className="form-control" value={this.state.title}/>
          </fieldset>
          <fieldset>
            <label for="description">Description</label>
            <textarea onChange={event => this.onChange(event.target)} name="description" className="form-control" value={this.state.description}/>
          </fieldset>
          <button className="btn btn-primary">Add contribution</button>
        </form>

      </div>
    )
  }
});

export default ContributionsForm;
