import React, { Component } from 'react';
import RMEditor from './Editor';
import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/beagle.min.css';
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
    this.editorOptions = {
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'orderedlist', 'unorderedlist', 'h2', 'h3', 'h4']
      },
      placeholder: false,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextprops) {
    let { note } = nextprops;
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

  handleInputChange(text, meduim) {
    let { note } = this.state;
    note.content = text;
    this.setState({ note, });
  }


  save() {
    let { note } = this.state;
    // note.content = this.editor.getContent();
    // this.setState({ note, });
    Note.save(window.currentUser.uid, note);
    console.log('saved');

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
          <RMEditor
            text={this.state.note.content}
            onChange={this.handleInputChange.bind(this)}
            options={this.editorOptions}
          />
        </div>
        <button className="button button-action button-rounded button-small"
                onClick={this.save.bind(this)}>保存
        </button>
      </div>
    )
  }
}