import React from 'react';

import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

var ContributionsForm = React.createClass({

  mixins: [ReactFireMixin],

  /**
   * Returns the initial state.
   * @return {Object}
   */
  getInitialState: function() {
    return {
      contributions: [],
      text: ""
    };
  },

  /**
   * Initialises the firebase setup.
   */
  componentWillMount: function() {
    const firebaseContributions = new Firebase('https://contriboot-2016.firebaseio.com/contributions'),
      firebaseInterests = new Firebase('https://contriboot-2016.firebaseio.com/interests');

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
    this.setState({
      [name]: value
    });
  },

  /**
   * Updates firebase with the new state after the submit button was clicked.
   * @param  {Event} event The submit event.
   */
  onSubmit: function(event) {
    event.preventDefault();

    if (this.state.title !== '') {
      this.firebaseRefs['contributions'].push({
        title: this.state.title,
        description: this.state.description
      });

      const contributions = [...this.state.contributions, {
          title: this.state.title,
          description: this.state.description
        }];

      this.setState({
        contributions: contributions,
        text: ""
      });

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
          <input
            onChange={event => this.onChange(event.target)}
            name="title"
            value={this.state.title} />

          <textarea
            onChange={event => this.onChange(event.target)}
            name="description"
            value={this.state.description} />

          <button>Add contribution</button>
        </form>

      </div>
    )
  }
});

export default ContributionsForm;
