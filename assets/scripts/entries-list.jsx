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
    localStorage.setItem(key, true);
  }

  /**
   * Render the component
   * @return {JSX} The list
   */
  render() {
    return (
      <div className='entries'>
        <h2>{this.props.title}</h2>

        <ul>
          {this.props.entries.map((entry, index) => {
            const key = entry['.key'],
              isActive = this.props.currentEntryKey === key,
              classes = 'entry' + (isActive ? ' entry--active' : ''),
              votesObj = this.props.votes.find(vote => {
                return vote['.key'] === entry['.key'];
              }),
              votes = votesObj && votesObj['.value'] || 0,
              voted = votesObj && localStorage.getItem(votesObj['.key']);

            return <li key={index} className={classes}>
              <div className='entry__header'>
                <a href={`#${key}`}
                    title={entry.title}
                    className='entry__header__title'>
                  <h3>
                    {entry.title}
                    <small className='entry__header__author'>
                      by {entry.user.username}
                    </small>
                  </h3>
                </a>

                <span className='entry__header__votes'>
                  {voted ?
                    <button type='button'
                      className='entry__header__votes__button' disabled>
                        &#9733;
                    </button> :
                    <button type='button'
                      className='entry__header__votes__button'
                      onClick={() => this.handleVote(entry['.key'], votes)}>
                        &#9734;
                    </button>
                  }
                  {votes}
                </span>
              </div>
              <div className='entry__description'>
                {entry.description}
              </div>
            </li>;
          })}
        </ul>
      </div>
    );
  }
}
