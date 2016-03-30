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
      <div>
        <h2>{this.props.title}</h2>

        <ul className='entries'>
          {this.props.entries.map((entry, index) => {
            const key = entry['.key'],
              isActive = this.props.currentEntryKey === key,
              descriptionClasses = 'entry__description' +
                (isActive ? '' : ' entry__description--hidden'),
              votesObj = this.props.votes.find(vote => {
                return vote['.key'] === entry['.key'];
              }),
              votes = votesObj && votesObj['.value'],
              voted = votesObj && localStorage.getItem(votesObj['.key']);

            return <li key={index} className='entry'>
              <a href={`#${key}`}
                  title={entry.title}
                  className='entry__header'>
                <span className='entry__header__title'>
                  {entry.title}
                </span>

                <span className='entry__header__votes'>
                  {votes} &#9733;
                  {voted ?
                    <span>Voted</span> :
                    <button type='button'
                      className='entry__header__votes__button'
                      onClick={() => this.handleVote(entry['.key'], votes)}>
                        Vote
                    </button>
                  }

                </span>

                <span className='entry__header__author'>
                  by {entry.user.username}
                </span>
              </a>
              <div className={descriptionClasses}>
                {entry.description}
              </div>
            </li>;
          })}
        </ul>
      </div>
    );
  }
}
