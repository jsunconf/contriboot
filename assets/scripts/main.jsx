import React from 'react';
import {render} from 'react-dom';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

var Contributions = React.createClass({
  render: function() {
    var createItem = function(item, index) {
      return (
        <li key={ index }>
          { item.title }
          { item.desciption }
        </li>
      );
    };

    return (
      <ul>
        { this.props.contributions.map(createItem) }
      </ul>
    );
  }
});

var App = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {contributions: [], text: ""};
  },
  /**
   * When the component gets mounted
   */
  componentWillMount: function() {
    const firebaseContributions = new Firebase('https://contriboot-2016.firebaseio.com/contributions'),
      firebaseInterests = new Firebase('https://contriboot-2016.firebaseio.com/interests');

    this.bindAsArray(firebaseContributions, 'contributions');
    this.bindAsArray(firebaseInterests, 'interests');
  },
  onChange: function(e) {
    this.setState({[e.target.name]: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.title !== '') {
      this.firebaseRefs['contributions'].push({
        title: this.state.title,
        desciption: this.state.desciption
      });

      var nextItems = this.state.contributions.concat([
        {
          text: this.state.title
        }
      ]);
      this.setState({contributions: nextItems, text: ""});
    }
  },
  /**
   * Render!
   * @return {React.Element} Something rendered
   */
  render: function() {
    return (
      <div>
        <Contributions contributions={this.state.contributions}/>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} name="title" value={this.state.title}/>
          <textarea onChange={this.onChange} name="desciption" value={this.state.desciption}/>
          <button>{"Add #"}</button>
        </form>
      </div>
    )
  }
});

render(
  <App/>, document.querySelector('.mount'))
