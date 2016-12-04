import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import SimpleMDE from 'simplemde';
// import 'simplemde/dist/simplemde.min.css';
import * as Note from '../db/note';


export default class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        title: '',
        content: '',
      },
    };
    this.editor = null;
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.editor = this.refs.noteTextarea;
    // this.editor = new SimpleMDE({ element: textarea });
  }

  componentWillReceiveProps(nextprops) {
    let { note } = nextprops;
    let editor = this.editor;
    let NoteRef = firebase.database().ref('user-notes/' + currentUser.uid + '/' + note.key);
    NoteRef.on('value', (snapshot) => {
      console.log(snapshot.val());
      let note = Object.assign({}, snapshot.val(), { key: snapshot.ref.key });
      let content = note.content;
      this.setState({ note, });
      editor.value = content;
    });
  };

  handleTitleChange(event) {
    let { note } = this.state;
    note.title = event.target.value;
    this.setState({ note, });
  }

  handleInputChange(event) {
    console.log('changed....');
    let { note } = this.state;
    note.content = event.target.value;
    this.setState({ note, });
  }


  save() {
    let editor = this.editor;
    let content = editor.value;
    let { note } = this.state;
    note.content = content;
    this.setState({ note, });
    Note.save(window.currentUser.uid, note);

  }

  render() {
    return (
      <div className="editor">
        <div>
          <input
            className="editor-input__title"
            type="text"
            value={this.state.note.title}
            onChange={this.handleTitleChange.bind(this)}/>
          <textarea
            className="editor-input__content"
            value={this.state.note.content}
            onChange={this.handleInputChange.bind(this)}
            ref="noteTextarea"
          />
        </div>
        <button className="button button-action button-rounded button-small"
                onClick={this.save.bind(this)}>保存
        </button>
      </div>
    )
  }
}