import React from 'react';

/**
 * Renders a list of entries
 */
export default class extends React.Component {
  /**
   * Render the component
   * @return {JSX} The list
   */
  render() {
    return <div>
      <h2>{this.props.title}</h2>
      <ul className='entries'>
        {this.props.entries.map((entry, index) => {
          return (
            <li key={index} className="entry">
              <div className="entry__header">
                <span className="entry__header__title">{entry.title}</span>
                <span className="entry__header__author">
                  &nbsp;by {entry.user.username}
                </span>
              </div>
              <div className="entry__description">
                {entry.description}
              </div>
            </li>
          );
        })}
      </ul>
    </div>;
  }
}