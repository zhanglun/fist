import React, {Component} from 'react';
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

  componentWillMount() {}

  componentDidMount() {}
  
  handleTitleChange(title) {
    let {note} = this.state;
    note.title = title;
    this.setState({note});
  }

  save(data) {
    let {note} = this.state;
    note.title = data.title;
    note.content = data.content;
    this.setState({note});
    Note.save(window.currentUser.uid, note);
    this.setState({
      isOpen: false,
    });
  }

  render() {
    let {note, isOpen} = this.state;
    return (
      <div>
        {isOpen && <EditorComponent
          title={note.title}
          content={note.content}
          onSave={this.save.bind(this)}
          onTitleChange={this.handleTitleChange.bind(this)}/>}
      </div>
    )
  }

}