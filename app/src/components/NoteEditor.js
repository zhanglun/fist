import React, { Component } from 'react';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
import * as Note from '../helper/db/note';


export default class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        title: '',
        content: '',
      },
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    let { note } = this.props;
    let dom = this.refs.editor;
    this.editor = new SimpleMDE({
      // element: dom,
      hideIcons: ["guide", "heading"],
      indentWithTabs: false,
      initialValue: '',
      toolbar: false,
      insertTexts: {
        horizontalRule: ["", "\n\n-----\n\n"],
        image: ["![](http://", ")"],
        link: ["[", "](http://)"],
        table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
      },
      placeholder: "Type here...",
      shortcuts: {
        drawTable: "Cmd-Alt-T"
      },
      showIcons: ["code", "table"],
      spellChecker: false,
      styleSelectedText: false,
      tabSize: 2,
      toolbarTips: false,
    });
  }

  componentWillReceiveProps(nextprops) {
    let { note } = nextprops;
    this.editor.value(note.content);
    let NoteRef = firebase.database().ref('user-notes/' + currentUser.uid + '/' + note.key);
    NoteRef.on('value', (snapshot) => {
      console.log(snapshot.val());
      let note = Object.assign({}, snapshot.val(), { key: snapshot.ref.key });
      this.setState({ note, });
    });
  };

  handleTitleChange(event) {
    let { note } = this.state;
    note.title = event.target.value;
    this.setState({ note, });
  }

  save() {
    let { note } = this.state;
    note.content = this.editor.value();
    this.setState({ note, });
    Note.save(window.currentUser.uid, note);
  }

  render() {
    return (
      <div className="note-detail">
        <div className="note-detail-toolbar">

        </div>
        <div className="note-editor">
          <input
            className="note-editor-input__title"
            type="text"
            value={this.state.note.title}
            onChange={this.handleTitleChange.bind(this)}/>
          <textarea />
          <button
            className="button button-action button-rounded button-small"
            onClick={this.save.bind(this)}>保存
          </button>
        </div>
      </div>
    )
  }
}