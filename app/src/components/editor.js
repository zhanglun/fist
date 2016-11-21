import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Note from '../db/note';

export default class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  componentWillMount() {
    let { value } = this.props;
    this.setState({ value, });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleInputChange(event) {
    this.setState({ content: event.target.value });
  }


  save() {
    console.log(Note);
    Note.add(window.currentUser.uid, window.currentUser, {
      title: this.state.title,
      content: this.state.content
    });
  }

  render() {
    return (
      <div className="editor">
        <div>
          <input type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
        </div>
        <div>
        <textarea name="" id="" cols="30" rows="10" value={this.state.content}
                  ref="editorInput" onChange={this.handleInputChange.bind(this)}></textarea>
        </div>
        <button onClick={this.save.bind(this)}>保存</button>
      </div>
    )
  }
}