import React from 'react';

const initialState = {
  type: 'contributions',
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
      type: this.state.type,
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
        <label>
          Type
        </label>
        <input type='radio'
          onChange={event => this.setState({type: event.target.value})}
          id='type--contributions'
          name='type'
          className=''
          checked={this.state.type === 'contributions'}
          value='contributions' />
        <label htmlFor='type--contributions'>Contributions</label>
        <input type='radio'
          onChange={event => this.setState({type: event.target.value})}
          id='type--interests'
          name='type'
          className=''
          checked={this.state.type === 'interests'}
          value='interests' />
        <label htmlFor='type--interests'>Interests</label>

        <label htmlFor='title'>
          Title
        </label>
        <input type='text'
          onChange={event => this.setState({title: event.target.value})}
          id='title'
          name='title'
          className=''
          value={this.state.title} />

        <label htmlFor='description'>
          Description
        </label>
        <textarea
          onChange={event => this.setState({description: event.target.value})}
          id='description'
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
