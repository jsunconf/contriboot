import React from 'react';

import {FIREBASE_URL} from './config';

/**
 * Renders a list of entries
 */
export default class extends React.Component {
  /**
   * Handle a vote
   * @param  {String} type The type (contributions or interests)
   * @param  {String} key  The entry key
   */
  handleVote(key, votes) {
    const ref = new Firebase(`${FIREBASE_URL}/votes/${key}`);
    ref.set(votes + 1);
  }

  /**
   * Render the component
   * @return {JSX} The list
   */
  render() {
    console.log(this.props.votes);

    return <div>
      <h2>{this.props.title}</h2>

      <ul className='entries'>
        {this.props.entries.map((entry, index) => {
          const votesObj = this.props.votes.find(vote => {
              return vote['.key'] === entry['.key'];
            }),
            votes = votesObj && votesObj['.value'];

          return <li key={index} className="entry">
            <div className="entry__header">
              <span className="entry__header__title">{entry.title}</span>
              <span className="entry__header__author">
                &nbsp;by {entry.user.username}
              </span>
              <span className="entry__header__votes">
                &nbsp;with {votes} votes
              </span>
              <button type='button'
                onClick={() => this.handleVote(entry['.key'], votes)}>
                  Vote
              </button>
            </div>
            <div className="entry__description">
              {entry.description}
            </div>
          </li>;
        })}
      </ul>
    </div>;
  }
}
