import React from 'react';

const initialState = {
  title: '',
  description: ''
}

export default class extends React.Component {
  /**
   * The constructor. Calls the super constructor.
   * @param  {Object} props The properties object.
   */
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  /**
   * Updates firebase with the new state after the submit button was clicked.
   * @param  {Event} event The submit event.
   */
  onSubmit(event) {
    event.preventDefault();

    this.props.onEntryAdd({
      title: this.state.title,
      description: this.state.description
    });

    this.setState(initialState);
  }

  /**
   * Returns the component.
   * @return {React.Element}
   */
  render() {
    return <form onSubmit={this.onSubmit.bind(this)}>
      <fieldset>
        <label htmlFor='title'>
          Title
        </label>
        <input
          onChange={event => this.setState({title: event.target.value})}
          name='title'
          className=''
          value={this.state.title} />

        <label htmlFor='description'>
          Description
        </label>
        <textarea
          onChange={event => this.setState({description: event.target.value})}
          name='description'
          className='form-control'
          value={this.state.description} />
      </fieldset>

      <button
        type='submit'
        className='button'>
          Add contribution
      </button>
    </form>;
  }
}
