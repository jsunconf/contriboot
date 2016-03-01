import React from 'react';
import {render} from 'react-dom';

import ContributionsList from './contributionsList.jsx'
import ContributionsForm from './contributionsForm.jsx'

class App extends React.Component {

  /**
   * The constructor.
   * @param  {Object} props The properties.
   */
  constructor(props) {
    super(props);
    this.state = {contributions: []};
    this.handleContributions = this.handleContributions.bind(this);
  }

  /**
   * Updates firebas with teh new state after the submit button was clicked.
   * @param  {Event} event The submit event.
   */
  handleContributions(contributions) {
    this.setState({contributions: contributions});
  }

  /**
   * Returns the component.
   * @return {React.Element}
   */
  render() {
    return (
      <div>
        <ContributionsList
          contributions={this.state.contributions} />

        <ContributionsForm
          onContributionsUpdate={this.handleContributions} />

      </div>
    )
  }
};

App.InitialState = {
  contributions: []
};

render(<App/>, document.querySelector('.mount'))
