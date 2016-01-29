import React from 'react';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

var App = React.createClass({
  mixins: [ReactFireMixin],

  /**
   * When the component gets mounted
   */
  componentWillMount: function() {
    const firebaseContributions = new Firebase(
        'https://contriboot-2016.firebaseio.com/contributions'),
      firebaseInterests = new Firebase(
        'https://contriboot-2016.firebaseio.com/interests');

    this.bindAsArray(firebaseContributions, 'contributions');
    this.bindAsArray(firebaseInterests, 'interests');
  },

  /**
   * Render!
   * @return {React.Element} Something rendered
   */
  render: function() {
    return false;
  }
});
