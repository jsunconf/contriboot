import React from 'react';
import {render} from 'react-dom';

import ContributionsList from './contributionsList.jsx'
import ContributionsForm from './contributionsForm.jsx'
import LoginWithGithub from './login.jsx'
import ShowLoginStatusWithGithub from './showLoginStatus.jsx'

import {contributionFirebase} from './firebaseConnection';

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
    const isLoggedin = contributionFirebase.hasAuthentication;

    return (
      <div>
        {isLoggedin ? <ShowLoginStatusWithGithub /> : <LoginWithGithub/>}

        <ContributionsList
          contributions={this.state.contributions} />

        {isLoggedin ?
          <ContributionsForm
            onContributionsUpdate={this.handleContributions} /> :
          null
        }
      </div>
    )
  }
};

App.InitialState = {
  contributions: []
};

render(<App/>, document.querySelector('.mount'))
