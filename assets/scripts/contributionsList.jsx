import React from 'react';

export default class ContributionsList extends React.Component {

  renderContribution(item, index) {
    return (
      <li key={index} className="contribution">
        <div className="contribution-title">
          <div className="title">{item.title}</div>
          <div className="author">
            &nbsp;by {item.username}</div>
        </div>
        <div className="description">{item.description}</div>
      </li>
    );
  }
  render() {
    const {contributions} = this.props;

    return (
      <ul className='contributions'>
        {contributions.map(this.renderContribution)}
      </ul>
    );
  }
}
