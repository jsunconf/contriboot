import React from 'react';
import marked from 'marked';
import toMarkdown from 'to-markdown';
import Editor from 'react-medium-editor';

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
    const submitText = 'Add ' +
      (this.state.type === 'contributions' ? 'Contribution' : 'Interest');

    return (
      <form className="submit-form"
        onSubmit={this.onSubmit.bind(this)}>

        <header className="submit-form__header">
          <h3>
            I want to submit a
          </h3>

          <fieldset className="submit-form__type-selection">
            <input type='radio'
              onChange={event => this.setState({type: event.target.value})}
              id='type--contributions'
              name='type'
              className=''
              checked={this.state.type === 'contributions'}
              value='contributions' />
            <label className='button button--small' htmlFor='type--contributions'>Contribution</label>

            <input type='radio'
              onChange={event => this.setState({type: event.target.value})}
              id='type--interests'
              name='type'
              className=''
              checked={this.state.type === 'interests'}
              value='interests' />
            <label className='button button--small' htmlFor='type--interests'>Interest</label>

          </fieldset>

        </header>

        <fieldset>
          <label htmlFor='title'>
            Title
          </label>
          <input type='text'
            onChange={event => this.setState({title: event.target.value})}
            id='title'
            name='title'
            value={this.state.title} />

          <label htmlFor='description'>
            Description
          </label>

          <Editor
            className="textarea"
            id='description'
            name='description'
            text={marked(this.state.description)}
            onChange={html => this.setState({description: toMarkdown(html)})}
            options={{
              paste: {
                cleanPastedHTML: true
              },
              toolbar: {
                buttons: []
              }}}/>
        </fieldset>

        <button
          type='submit'
          disabled={this.state.title === '' || this.state.description === ''}
          className='button button--small'>
            {submitText}
        </button>
      </form>
    );
  }
}
