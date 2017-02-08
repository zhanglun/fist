import React, { Component } from 'react';
import * as Note from '../helper/db/note';
import NoteToolbarComponent from './NoteToolbar';
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

  handleTagsChange() {
    // TODO:
    console.log(arguments);
    console.log('TODO: 保存 tags');
  }

  render() {
    let { note, isOpen } = this.state;
    let buttonStyle= {
      position: 'absolute',
      right: 10,
      top: -40,
    };
    return (
      <div>
        {isOpen && <div className="newnote-layer">
          <div className="newnote-container">
            <div className="newnote-toolbar">
              <NoteToolbarComponent
                tags={[123, 'CSS', '学习笔记']}
                maxTags={8}
                onChange={this.handleTagsChange.bind(this)}/>
            </div>
            <EditorComponent
              title={note.title}
              className="newnote-editor"
              content={note.content}
              onSave={this.save.bind(this)}
              showButton={true}
              buttonStyles={buttonStyle}
              type={'new'}
              onClose={this.handleClose.bind(this)}
              onTitleChange={this.handleTitleChange.bind(this)}/>
          </div>
        </div>}
      </div>
    )
  }

}