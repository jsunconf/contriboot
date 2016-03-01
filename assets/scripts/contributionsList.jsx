import React from 'react';

export default class ContributionsList extends React.Component {

  renderContribution(item, index) {
    return (
      <li key={index}>
        {item.title}
        {item.desciption}
      </li>
    );
  }
  render() {
    const {contributions} = this.props;

    return (
      <ul>
        {contributions.map(this.renderContribution)}
      </ul>
    );
  }
}
