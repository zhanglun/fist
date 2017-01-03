import React, { Component } from 'react';
import * as Note from '../helper/db/note';
import EditorComponent from './Editor.js';

export default class NewNoteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      note: {
        title: '',
        content: ''
      }
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(newprops) {
    let { isOpen } = newprops;
    if (isOpen !== this.state.isOpen) {
      this.setState({
        isOpen,
      })
    }
  }

  handleClose() {
    let { onClose } = this.props;
    onClose();
  }

  handleTitleChange(title) {
    let { note } = this.state;
    note.title = title;
    this.setState({ note });
  }

  save(data) {
    let { note } = this.state;
    let { onClose } = this.props;
    note.title = data.title;
    note.content = data.content;
    this.setState({ note });
    Note.save(window.currentUser.uid, note);
    onClose();
  }

  render() {
    let { note, isOpen } = this.state;
    return (
      <div>
        {isOpen && <div className="newnote-container">
          <EditorComponent
            title={note.title}
            content={note.content}
            onSave={this.save.bind(this)}
            showButton={true}
            type={'new'}
            onClose={this.handleClose.bind(this)}
            onTitleChange={this.handleTitleChange.bind(this)}/>
        </div>}
      </div>
    )
  }

}