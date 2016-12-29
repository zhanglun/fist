import React, { Component } from 'react';
import * as Note from '../helper/db/note';
import EditorComponent from './Editor.js';

export default class NoteDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: props.note,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextprops) {
    let { note } = nextprops;
    this.setState({note,});
    let NoteRef = firebase.database().ref('user-notes/' + currentUser.uid + '/' + note.key);
    NoteRef.once('value', (snapshot) => {
      let note = Object.assign({}, snapshot.val(), { key: snapshot.ref.key });
      this.setState({ note, });
    });
  };

  handleTitleChange(title) {
    let { note } = this.state;
    note.title = title;
    this.setState({ note, });
  }

  save(data) {
    let {note} = this.props;
    note.title = data.title;
    note.content = data.content;
    this.setState({ note, });
    Note.save(window.currentUser.uid, note);
  }

  render() {
    let {note} = this.state;
    return (
      <div className="note-detail">
        <div className="note-detail-toolbar">

        </div>
        <EditorComponent 
            title={note.title}
            content={note.content}
            onSave={this.save.bind(this)}
            onTitleChange={this.handleTitleChange.bind(this)}
        />

      </div>
    )
  }
}